// Library
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

// Model
// import { GroupMemberModel } from '../../group-member/shared/group-member.model';
import { ChatModel } from '../../chat/shared/chat.model';

export interface IGroup {
	id: number;
	ownerId: number;
	groupName: string;
	// groupMembers: GroupMemberModel[];
	chats: ChatModel[];
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

	@OneToMany(type => ChatModel, chat => chat.group, {
		eager: true,
		cascade: false
	})
	chats: ChatModel[];

	@Column('text')
	@ApiModelProperty()
	@IsString()
	groupDescription: string;

	@Column('text')
	@ApiModelProperty({ type: Date })
	@IsString()
	date: Date;
}
