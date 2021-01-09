// Library
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import {
	ApiTags,
	ApiBearerAuth,
	ApiResponse,
	ApiOperation
} from '@nestjs/swagger';

// Internal
import { GroupMemberModel, GroupMemberService } from '../index';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('group-member')
@Controller('group-member')
export class GroupMemberController {
	constructor(private readonly GroupMemberService: GroupMemberService) {}

	@Post()
	@ApiOperation({ summary: 'Create GroupMember' })
	@ApiResponse({
		status: 201,
		description: 'The record has been successfully created.'
	})
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	async create(@Body() GroupMemberModel: GroupMemberModel) {
		return await this.GroupMemberService.create(GroupMemberModel);
	}

	@Get()
	async findAll(): Promise<GroupMemberModel[]> {
		return await this.GroupMemberService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<GroupMemberModel> {
		return await this.GroupMemberService.findOneById(+id);
	}
}
