/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
// Library
import {
	Module,
	MiddlewareConsumer,
	NestModule,
	RequestMethod
} from '@nestjs/common';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal Modules
import { CatsModule, CatModel } from './modules/cats/cats.module';
import { AuthModule } from './modules/auth/auth.module';

// External Services
import { TvMazeService } from './services/tvmaze.service';

const proxy = require('express-http-proxy');
const url = require('url');

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.API_DB_HOST,
			port: parseInt(process.env.API_DB_PORT, 4),
			username: process.env.API_DB_USERNAME || 'postgres',
			password: process.env.API_DB_PASSWORD,
			database: process.env.API_DB_NAME || 'postgres',
			entities: [CatModel],
			synchronize: true
		}),
		AuthModule,
		CatsModule,
		GraphQLModule.forRoot({
			typePaths: ['./**/*.graphql'],
			context: ({ req }) => ({ req }),
			installSubscriptionHandlers: true,
			debug: process.env.NODE_ENV === 'development',
			playground: process.env.NODE_ENV === 'development'
		})
	]
})
export class ApplicationModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				proxy('api.tvmaze.com', {
					proxyReqPathResolver(req) {
						return req.url === '/' || !req.url || req.url === ''
							? `${url.parse(req.url).path}welcome-page`
							: url.parse(req.url).path;
					},
					userResDecorator(proxyRes, proxyResData, userReq, userRes) {
						return proxyRes.req.path === '/welcome-page'
							? {
									data: 'TvMaze API proxy service'
							  }
							: TvMazeService.transformProxyData(proxyResData);
					}
				})
			)
			.forRoutes('/proxy');
	}
}
