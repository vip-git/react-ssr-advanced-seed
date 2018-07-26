declare module 'node-advanced-api/src/server/modules/cats/shared/cat.model' {
	export interface ICat {
	    readonly id: number;
	    readonly name: string;
	    readonly age: number;
	    readonly breed: string;
	}
	export class CatModel implements ICat {
	    id: number;
	    name: string;
	    age: number;
	    breed: string;
	}

}
declare module 'node-advanced-api/src/server/modules/cats/shared/cats.service' {
	import { Repository } from 'typeorm';
	import { CatModel } from 'node-advanced-api/src/server/modules/cats/shared/cat.model';
	export class CatsService {
	    private readonly catRepository;
	    private readonly cats;
	    constructor(catRepository: Repository<CatModel>);
	    create(catPayload: CatModel): Promise<CatModel>;
	    findOne(id: number): CatModel;
	    findAll(): Promise<CatModel[]>;
	    findOneById(id: number): Promise<CatModel>;
	}

}
declare module 'node-advanced-api/src/server/modules/cats/rest/cats.controller' {
	import { CatModel, CatsService } from '@server/cats';
	export class CatsController {
	    private readonly catsService;
	    constructor(catsService: CatsService);
	    create(CatModel: CatModel): Promise<void>;
	    findAll(): Promise<CatModel[]>;
	    findOne(id: string): Promise<CatModel>;
	}

}
declare module 'node-advanced-api/src/server/modules/cats/graphql/cats.guard' {
	import { CanActivate, ExecutionContext } from '@nestjs/common';
	export class CatsGuard implements CanActivate {
	    canActivate(context: ExecutionContext): boolean;
	}

}
declare module 'node-advanced-api/src/server/modules/cats/graphql/cats.resolvers' {
	import { ICat } from 'node-advanced-api/src/server/modules/cats/shared/cat.model';
	import { CatsService } from 'node-advanced-api/src/server/modules/cats/shared/cats.service';
	export class CatsResolvers {
	    private readonly catsService;
	    constructor(catsService: CatsService);
	    getCats(): Promise<import("../../../../../../../../../Users/vipinessent/htdocs/react-ssr-advanced-seed/src/server/modules/cats/shared/cat.model").CatModel[]>;
	    findOneById(obj: any, args: any, context: any, info: any): Promise<ICat>;
	    create(obj: any, args: ICat, context: any, info: any): Promise<ICat>;
	    catCreated(): {
	        subscribe: () => AsyncIterator<{}>;
	    };
	}

}
declare module 'node-advanced-api/src/server/modules/auth/interfaces/jwt-payload.interface' {
	export interface JwtPayload {
	    email: string;
	}

}
declare module 'node-advanced-api/src/server/modules/auth/auth.service' {
	import { JwtPayload } from 'node-advanced-api/src/server/modules/auth/interfaces/jwt-payload.interface';
	export class AuthService {
	    createToken(): Promise<{
	        expiresIn: number;
	        accessToken: any;
	    }>;
	    validateUser(payload: JwtPayload): Promise<any>;
	}

}
declare module 'node-advanced-api/src/server/modules/auth/jwt.strategy' {
	import { AuthService } from 'node-advanced-api/src/server/modules/auth/auth.service';
	import { JwtPayload } from 'node-advanced-api/src/server/modules/auth/interfaces/jwt-payload.interface'; const JwtStrategy_base: new (...args: any[]) => any;
	export class JwtStrategy extends JwtStrategy_base {
	    private readonly authService;
	    constructor(authService: AuthService);
	    validate(payload: JwtPayload, done: Function): Promise<any>;
	}
	export {};

}
declare module 'node-advanced-api/src/server/modules/auth/auth.controller' {
	import { AuthService } from 'node-advanced-api/src/server/modules/auth/auth.service';
	export class AuthController {
	    private readonly authService;
	    constructor(authService: AuthService);
	    createToken(): Promise<any>;
	    findAll(): void;
	}

}
declare module 'node-advanced-api/src/server/modules/subscriptions/subscription.constants' {
	export const SUBSCRIPTION_SERVER = "SUBSCRIPTION_SERVER";

}
declare module 'node-advanced-api/src/server/modules/subscriptions/subscription.providers' {
	export const createSubscriptionProviders: (port?: number) => {
	    provide: string;
	    useFactory: () => Promise<{}>;
	}[];

}
declare module 'node-advanced-api/src/server/modules/subscriptions/subscriptions.service' {
	import * as WebSocket from 'ws';
	import { OnModuleDestroy } from '@nestjs/common';
	import { ServerOptions } from 'subscriptions-transport-ws';
	export class SubscriptionsService implements OnModuleDestroy {
	    private readonly ws;
	    private subscriptionServer;
	    constructor(ws: any);
	    createSubscriptionServer(schema: any, options?: ServerOptions, socketOptions?: WebSocket.ServerOptions): void;
	    onModuleDestroy(): void;
	}

}
declare module 'node-advanced-api/src/server/modules/subscriptions/subscriptions.module' {
	import { DynamicModule } from '@nestjs/common';
	export class SubscriptionsModule {
	    static forRoot(port?: number): DynamicModule;
	}

}
declare module 'node-advanced-api/src/server/services/tvmaze.service' {
	export class TvMazeService {
	    static transformProxyData(proxyResData: any): string;
	}

}
declare module 'node-advanced-api/src/server/app.module' {
	import { MiddlewareConsumer, NestModule } from '@nestjs/common';
	import { GraphQLFactory } from '@nestjs/graphql';
	import { SubscriptionsService } from '@server/subscriptions';
	export class ApplicationModule implements NestModule {
	    private readonly subscriptionsService;
	    private readonly graphQLFactory;
	    constructor(subscriptionsService: SubscriptionsService, graphQLFactory: GraphQLFactory);
	    configure(consumer: MiddlewareConsumer): void;
	    createSchema(): any;
	}

}
declare module 'node-advanced-api/src/main' {
	export {};

}
