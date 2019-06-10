// Library
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Rest
import { CatsController } from './rest/cats.controller';

// Graphql
import { CatsResolvers } from './graphql/cats.resolvers';

// Shared
import { CatsService } from './shared/cats.service';
import { CatModel } from './shared/cat.model';

@Module({
  imports: [TypeOrmModule.forFeature([CatModel])],
  controllers: [CatsController],
  providers: [CatsService, CatsResolvers],
})
export class CatsModule {}

// Extra exports
export * from './shared/cat.model';
export * from './shared/cats.service';
