// Library
import { UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

// Internal
import { GroupMember, GroupMemberModel } from '../shared/group-member.model';
import { GroupMemberService } from '../shared/group-member.service';
import { GroupMemberGuard } from './group-member.guard';

const pubSub = new PubSub();

// @UseGuards(GroupMemberGuard)
@Resolver('GroupMember')
export class GroupMemberResolver {
constructor(private readonly GroupMemberService: GroupMemberService) {}

@Query()
async getGroupMember() {
    return await this.GroupMemberService.findAll();
}

@Query('GroupMember')
async findOneById(obj, args, context, info): Promise<GroupMember> {
    const { id } = args;
        return await this.GroupMemberService.findOneById(+id);
    }

    @Mutation('createGroupMember')
    async create(obj, args: GroupMember, context, info): Promise<GroupMember> {
        const createdGroupMember = await this.GroupMemberService.create(args);
        pubSub.publish('GroupMemberRecieved', { GroupMemberRecieved: createdGroupMember });
        return createdGroupMember;
    }

    @Mutation('updateGroupMember')
    async update(obj, args: GroupMemberModel, context, info): Promise<GroupMember> {
        const { id } = args;
        const updatedGroupMember = await this.GroupMemberService.update(id, args);
        pubSub.publish('GroupMemberRecieved', { GroupMemberRecieved: updatedGroupMember });
        return updatedGroupMember;
    }

    @Subscription('GroupMemberRecieved')
    GroupMemberRecieved() {
        return pubSub.asyncIterator('GroupMemberRecieved');
    }
}