// Library
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export interface IGroup {
	id: number;
	ownerId: number;
	groupName: string;
	groupDescription: string;
	date: Date;
}

@Entity('group')
export class GroupModel implements IGroup {
	@PrimaryGeneratedColumn()
	@ApiModelProperty()
	@IsInt()
	id: number;

	@Column('int')
	@ApiModelProperty()
	@IsInt()
	ownerId: number;

	@Column({ length: 500 })
	@ApiModelProperty()
	@IsString()
	groupName: string;

	@Column('text')
	@ApiModelProperty()
	@IsString()
	groupDescription: string;

	@Column('text')
	@ApiModelProperty({ type: Date })
	@IsString()
	date: Date;
}
