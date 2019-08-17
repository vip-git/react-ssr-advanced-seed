// Library
import { UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

// Internal
import { IChat } from '../shared/chat.model';
import { ChatService } from '../shared/chat.service';
import { ChatsGuard } from './chat.guard';

const pubSub = new PubSub();

// @UseGuards(ChatsGuard)
@Resolver('Chat')
export class ChatResolver {
	constructor(private readonly chatService: ChatService) {}

	@Query()
	async getChats() {
		return await this.chatService.findAll();
	}

	@Query('chat')
	async findOneById(obj, args, context, info): Promise<IChat> {
		const { id } = args;
		return await this.chatService.findOneById(+id);
	}

	@Mutation('createChat')
	async create(obj, args: IChat, context, info): Promise<IChat> {
		const createdChat = await this.chatService.create(args);
		pubSub.publish('chatRecieved', { chatRecieved: createdChat });
		return createdChat;
	}

	@Mutation('updateChat')
	async update(obj, args: IChat, context, info): Promise<IChat> {
		const { id } = args;
		const updatedChat = await this.chatService.update(id, args);
		pubSub.publish('chatRecieved', { chatRecieved: updatedChat });
		return updatedChat;
	}

	@Subscription('chatRecieved')
	chatRecieved() {
		return pubSub.asyncIterator('chatRecieved');
	}
}
