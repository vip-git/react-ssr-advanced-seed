// Library
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Query, Mutation, Resolver, Subscription, Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

// Interceptors
import { RulesInterceptor } from '../../../common/interceptors/rules.interceptor';

// Internal
import { Group } from '../shared/group.model';
import { GroupService } from '../shared/group.service';
import { GroupGuard } from './group.guard';

const pubSub = new PubSub();

@UseGuards(GroupGuard)
// @UseInterceptors(RulesInterceptor)
@Resolver('Group')
export class GroupResolver {
	constructor(private readonly groupService: GroupService) {}

	@Query()
	async getGroup(@Args('filters') filters: Object) {
        const params = filters ? filters : {};
		return await this.groupService.findAll(params);
	}

	@Query('group')
	async findOneById(obj, args, context, info): Promise<Group> {
		const { id } = args;
		return await this.groupService.findOneById(+id);
	}

	@Mutation('createGroup')
	async create(obj, args: Group, context, info): Promise<Group> {
		const createdGroup = await this.groupService.create(args);
		if (args.groupType === 'group') {
			pubSub.publish('groupRecieved', { groupRecieved: createdGroup });
		}
		return createdGroup;
	}

	@Mutation('updateGroup')
	async update(obj, args: Group, context, info): Promise<Group> {
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