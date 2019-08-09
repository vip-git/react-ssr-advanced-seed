// Library
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import {
	ApiUseTags,
	ApiBearerAuth,
	ApiResponse,
	ApiOperation
} from '@nestjs/swagger';

// Internal
import { ChatModel, ChatService } from '../';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUseTags('chats')
@Controller('chats')
export class ChatsController {
	constructor(private readonly chatService: ChatService) {}

	@Post()
	@ApiOperation({ title: 'Create chat' })
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
		return await this.chatService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<ChatModel> {
		return await this.chatService.findOneById(+id);
	}
}
