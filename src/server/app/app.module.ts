// Library
import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
const proxy = require('express-http-proxy');

// Internal Modules
import { CatsModule, CatModel } from './modules/cats/cats.module';
import { AuthModule } from './modules/auth/auth.module';

// External Services
import { TvMazeService } from './services/tvmaze.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.API_DB_HOST,
    port: parseInt(process.env.API_DB_PORT, 4),
    username: process.env.API_DB_USERNAME || 'postgres',
    password: process.env.API_DB_PASSWORD,
    database: process.env.API_DB_NAME || 'postgres',
    entities: [CatModel],
    synchronize: true,
  }), AuthModule, CatsModule, GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    installSubscriptionHandlers: true,
  })],
})
export class ApplicationModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(proxy('api.tvmaze.com', {
        proxyReqPathResolver(req) {
            return (req.url === '/' || !req.url || req.url === '')
                    ? require('url').parse(req.url).path + 'welcome-page'
                    : require('url').parse(req.url).path;
        },
        userResDecorator(proxyRes, proxyResData, userReq, userRes) {
            return (proxyRes.req.path === '/welcome-page') ? {
                data : 'TvMaze API proxy service',
            } : TvMazeService.transformProxyData(proxyResData);
        },
      }))
      .forRoutes('/proxy');
  }
}
