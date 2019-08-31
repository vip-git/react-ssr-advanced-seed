// Library
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Rest
import { GroupController } from './rest/group.controller';

// Graphql
import { GroupResolver } from './graphql/group.resolver';

// Shared
import { GroupService } from './shared/group.service';
import { GroupModel } from './shared/group.model';

@Module({
    imports: [TypeOrmModule.forFeature([GroupModel])],
    controllers: [GroupController],
    providers: [GroupService, GroupResolver]
})
export class GroupModule {}

// Extra exports
export * from './shared/group.model';
export * from './shared/group.service';
