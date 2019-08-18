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
import { ProfileModel, ProfileService } from '../index';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUseTags('profile')
@Controller('profile')
export class ProfileController {
	constructor(private readonly ProfileService: ProfileService) {}

	@Post()
	@ApiOperation({ title: 'Create Profile' })
	@ApiResponse({
		status: 201,
		description: 'The record has been successfully created.'
	})
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	async create(@Body() ProfileModel: ProfileModel) {
		return await this.ProfileService.create(ProfileModel);
	}

	@Get()
	async findAll(): Promise<ProfileModel[]> {
		return await this.ProfileService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<ProfileModel> {
		return await this.ProfileService.findOneById(+id);
	}
}
