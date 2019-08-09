// Library
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export interface IChat {
	id: number;
	groupId: number;
	message: string;
	ownerId: number;
	date: Date;
}

@Entity('chat')
export class ChatModel implements IChat {
	@PrimaryGeneratedColumn()
	@ApiModelProperty()
	@IsInt()
	id: number;

	@Column('int')
	@ApiModelProperty()
	@IsInt()
	groupId: number;

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
