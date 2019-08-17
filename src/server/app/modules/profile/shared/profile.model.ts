// Library
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export interface IProfile {
	id: number;
	githubId: string;
	message: string;
	ownerId: number;
	date: Date;
}

@Entity('profile')
export class ProfileModel implements IProfile {
	@PrimaryGeneratedColumn()
	@ApiModelProperty()
	@IsInt()
	id: number;

	@Column('text')
	@ApiModelProperty()
	@IsString()
	githubId: string;

	@Column({ length: 500 })
	@ApiModelProperty()
	@IsString()
	message: string;

	@Column('int')
	@ApiModelProperty()
	@IsString()
	ownerId: number;

	@Column('text')
	@ApiModelProperty({ type: Date })
	@IsString()
	date: Date;
}
