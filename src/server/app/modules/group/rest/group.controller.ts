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
import { GroupModel, GroupService } from '../index';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUseTags('group')
@Controller('group')
export class GroupController {
	constructor(private readonly GroupService: GroupService) {}

	@Post()
	@ApiOperation({ title: 'Create Group' })
	@ApiResponse({
		status: 201,
		description: 'The record has been successfully created.'
	})
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	async create(@Body() GroupModel: GroupModel) {
		return await this.GroupService.create(GroupModel);
	}

	@Get()
	async findAll(): Promise<GroupModel[]> {
		return await this.GroupService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<GroupModel> {
		return await this.GroupService.findOneById(+id);
	}
}
