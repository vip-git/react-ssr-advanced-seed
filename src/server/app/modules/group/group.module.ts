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
import { GroupMemberModel } from '../group-member/shared/group-member.model';
import { ProfileModel } from '../profile/shared/profile.model'
import { ProfileService } from '../profile/shared/profile.service';

@Module({
    imports: [TypeOrmModule.forFeature([GroupModel, GroupMemberModel, ProfileModel])],
    controllers: [GroupController],
    providers: [GroupService, GroupResolver, ProfileService]
})
export class GroupModule {}

// Extra exports
export * from './shared/group.model';
export * from './shared/group.service';
