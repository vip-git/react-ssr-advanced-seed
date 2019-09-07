// Library
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

// Model
import { GroupModel } from '../../group/shared/group.model';

export interface IChat {
	id: number;
	groupId: number;
	group: GroupModel;
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

	@ManyToOne(type => GroupModel, group => group.id, { eager: true, cascade: false  })
	group: GroupModel;

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
