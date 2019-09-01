// Library
import { UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, Subscription, Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

// Internal
import { IProfile } from '../shared/profile.model';
import { ProfileService } from '../shared/profile.service';
import { ProfileGuard } from './profile.guard';

const pubSub = new PubSub();

@UseGuards(ProfileGuard)
@Resolver('Profile')
export class ProfileResolver {
constructor(private readonly profileService: ProfileService) {}

    @Query()
    async getProfile(@Args('filters') filters: Object) {
        const params = filters ? filters : {};
        return await this.profileService.findAll(params);
    }

    @Query('profile')
    async findOneById(obj, args, context, info): Promise<IProfile> {
        const { id } = args;
        return await this.profileService.findOneById(+id);
    }

    @Mutation('createProfile')
    async create(obj, args: IProfile, context, info): Promise<IProfile> {
        const createdProfile = await this.profileService.create(args);
        pubSub.publish('profileRecieved', { profileRecieved: createdProfile });
        return createdProfile;
    }

    @Mutation('updateProfile')
    async update(obj, args: IProfile, context, info): Promise<IProfile> {
        const { id } = args;
        const updatedProfile = await this.profileService.update(id, args);
        pubSub.publish('profileRecieved', { profileRecieved: updatedProfile });
        return updatedProfile;
    }

    @Subscription('profileRecieved')
    profileRecieved() {
        return pubSub.asyncIterator('profileRecieved');
    }
}