// Library
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export interface IProfile {
	id: number;
	githubId: string;
	lastTokenWeb: string;
	lastTokenMobile: string;
	createdAt: Date;
	updatedAt: Date;
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
	lastTokenWeb: string;

	@Column({ length: 500 })
	@ApiModelProperty()
	@IsString()
	lastTokenMobile: string;

	@Column('text')
	@ApiModelProperty({ type: Date })
	@IsString()
	createdAt: Date;

	@Column('text')
	@ApiModelProperty({ type: Date })
	@IsString()
	updatedAt: Date;
}
