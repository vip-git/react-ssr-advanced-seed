// Library
import { UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

// Internal
import { IGroup } from '../shared/group.model';
import { GroupService } from '../shared/group.service';
import { GroupGuard } from './group.guard';

const pubSub = new PubSub();

// @UseGuards(GroupGuard)
@Resolver('Group')
export class GroupResolver {
constructor(private readonly groupService: GroupService) {}

@Query()
async getgroup() {
    return await this.groupService.findAll();
}

@Query('group')
async findOneById(obj, args, context, info): Promise<IGroup> {
    const { id } = args;
        return await this.groupService.findOneById(+id);
    }

    @Mutation('creategroup')
    async create(obj, args: IGroup, context, info): Promise<IGroup> {
        const createdGroup = await this.groupService.create(args);
        pubSub.publish('groupRecieved', { groupRecieved: createdGroup });
        return createdGroup;
    }

    @Mutation('updategroup')
    async update(obj, args: IGroup, context, info): Promise<IGroup> {
        const { id } = args;
        const updatedGroup = await this.groupService.update(id, args);
        pubSub.publish('groupRecieved', { groupRecieved: updatedGroup });
        return updatedGroup;
    }

    @Subscription('groupRecieved')
    groupRecieved() {
        return pubSub.asyncIterator('groupRecieved');
    }
}