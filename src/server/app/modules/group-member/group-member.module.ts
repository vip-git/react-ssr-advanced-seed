// Library
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Rest
import { GroupMemberController } from './rest/group-member.controller';

// Graphql
import { GroupMemberResolver } from './graphql/group-member.resolver';

// Shared
import { GroupMemberService } from './shared/group-member.service';
import { GroupMemberModel } from './shared/group-member.model';

@Module({
    imports: [TypeOrmModule.forFeature([GroupMemberModel])],
    controllers: [GroupMemberController],
    providers: [GroupMemberService, GroupMemberResolver]
})
export class GroupMemberModule {}

// Extra exports
export * from './shared/group-member.model';
export * from './shared/group-member.service';