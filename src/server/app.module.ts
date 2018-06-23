// Library
import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as proxy from 'express-http-proxy';

// Internal Modules
import { CatsModule, CatModel } from '@server/cats/cats.module';
import { AuthModule } from '@server/auth/auth.module';
import { SubscriptionsModule, SubscriptionsService } from '@server/subscriptions';

// External Services
import { TvMazeService } from './services/tvmaze.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "postgres",
    "host": process.env.API_DB_HOST,
    "port": parseInt(process.env.API_DB_PORT),
    "username": process.env.API_DB_USERNAME,
    "password": process.env.API_DB_PASSWORD,
    "database": process.env.API_DB_NAME,
    "entities": [CatModel],
    "synchronize": true
  }), SubscriptionsModule.forRoot(), AuthModule, CatsModule, GraphQLModule],
})
export class ApplicationModule implements NestModule {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly graphQLFactory: GraphQLFactory,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const schema = this.createSchema();
    this.subscriptionsService.createSubscriptionServer(schema);

    consumer
      .apply(
        graphiqlExpress({
          endpointURL: '/api/graphql',
          subscriptionsEndpoint: `ws://localhost:3001/api/subscriptions`,
        }),
      )
      .forRoutes('/graphiql')
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/graphql')
      .apply(proxy('api.tvmaze.com', {
        proxyReqPathResolver: function(req) {
            return (req.url === '/' || !req.url || req.url === '')
                    ? require('url').parse(req.url).path + 'welcome-page'
                    : require('url').parse(req.url).path;
        },
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
            return (proxyRes.req.path === '/welcome-page') ? {
                'data' : 'TvMaze API proxy service'
            } : TvMazeService.transformProxyData(proxyResData);
        }
      }))
      .forRoutes('/proxy');
  }

  createSchema() {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    return this.graphQLFactory.createSchema({ typeDefs });
  }
}
