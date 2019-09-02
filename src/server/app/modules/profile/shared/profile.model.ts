// Library
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export interface IProfile {
	id: number;
	githubUid: number;
	githubId: string;
	lastTokenWeb: string;
	lastTokenMobile: string;
	name: string;
	email: string;
	avatarUrl: string;
	bio: string;
	location: string;
	createdAt: Date;
	updatedAt: Date;
}

@Entity('profile')
export class ProfileModel implements IProfile {
	@PrimaryGeneratedColumn()
	@ApiModelProperty()
	@IsInt()
	id: number;

	@Column('int', { unique: true })
	@ApiModelProperty()
	@IsInt()
	githubUid: number;

	@Column('text', { unique: true })
	@ApiModelProperty()
	@IsString()
	githubId: string;

	@Column('text', { unique: true })
	@ApiModelProperty()
	@IsString()
	lastTokenWeb: string;

	@Column('text', { unique: true })
	@ApiModelProperty()
	@IsString()
	lastTokenMobile: string;

	@Column('text')
	@ApiModelProperty()
	@IsString()
	name: string;

	@Column('text')
	@ApiModelProperty()
	@IsString()
	email: string;

	@Column('text')
	@ApiModelProperty()
	@IsString()
	avatarUrl: string;

	@Column('text')
	@ApiModelProperty()
	@IsString()
	bio: string;

	@Column('text')
	@ApiModelProperty()
	@IsString()
	location: string;

	@Column('text')
	@ApiModelProperty({ type: Date })
	@IsString()
	createdAt: Date;

	@Column('text')
	@ApiModelProperty({ type: Date })
	@IsString()
	updatedAt: Date;
}
