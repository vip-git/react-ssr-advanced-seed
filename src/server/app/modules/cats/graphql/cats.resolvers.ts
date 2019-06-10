// Library
import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  Query,
  Mutation,
  Resolver,
  DelegateProperty,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

// Internal
import { ICat } from '../shared/cat.model';
import { CatsService } from '../shared/cats.service';
import { CatsGuard } from './cats.guard';

const pubSub = new PubSub();

@UseGuards(AuthGuard('jwt'))
@Resolver('Cat')
export class CatsResolvers {
  constructor(private readonly catsService: CatsService) {}

  @Query()
  @UseGuards(CatsGuard)
  async getCats() {
    return await this.catsService.findAll();
  }

  @Query('cat')
  async findOneById(obj, args, context, info): Promise<ICat> {
    const { id } = args;
    return await this.catsService.findOneById(+id);
  }

  @Mutation('createCat')
  async create(obj, args: ICat, context, info): Promise<ICat> {
    const createdCat = await this.catsService.create(args);
    pubSub.publish('catCreated', { catCreated: createdCat });
    return createdCat;
  }

  @Subscription('catCreated')
  catCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('catCreated'),
    };
  }
}
