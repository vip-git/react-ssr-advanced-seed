// Library
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
	ApiTags,
	ApiBearerAuth,
	ApiResponse,
	ApiOperation
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/auth.guard';

// Internal
import { ChatModel, ChatService } from '../index';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('chats')
@Controller('chats')
export class ChatsController {
	constructor(private readonly chatService: ChatService) {}

	@Post()
	@ApiOperation({ summary: 'Create chat' })
	@ApiResponse({
		status: 201,
		description: 'The record has been successfully created.'
	})
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	async create(@Body() ChatModel: ChatModel) {
		return await this.chatService.create(ChatModel);
	}

	@Get()
	async findAll(): Promise<ChatModel[]> {
		return await this.chatService.findAll({
			relations: ['group', 'owner'],
		});
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<ChatModel> {
		return await this.chatService.findOneById(+id);
	}
}
