import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule, ChatModel } from './modules/chat/chat.module';
import { AuthModule } from './modules/auth/auth.module';
import { TvMazeService } from './services/tvmaze.service';
import { ProfileModule, ProfileModel } from './modules/profile/profile.module';
import { GroupModule, GroupModel } from './modules/group/group.module';
import { GroupMemberModule } from './modules/group-member/group-member.module';
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
// Library

// Internal Modules 
// External Services

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
			entities: [ChatModel, ProfileModel, GroupModel],
			synchronize: true
		}),
		AuthModule,
		ChatModule,
		GraphQLModule.forRoot({
			typePaths: ['./**/*.graphql'],
			context: ({ req, connection }) =>
				connection ? { req: connection.context } : { req },
			installSubscriptionHandlers: true,
			debug: process.env.NODE_ENV === 'development',
			playground: process.env.NODE_ENV === 'development',
			cors: process.env.NODE_ENV === 'development' ? {
				origin: 'http://localhost:8500',
				credentials: true // <-- REQUIRED backend setting
			} : {},
		}),
		ProfileModule,
		GroupModule,
		GroupMemberModule,
	],
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
