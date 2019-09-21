// Library
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany, ManyToOne, JoinColumn
} from 'typeorm';
import { IsString, IsInt, IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

// Model
import { GroupMemberModel } from '../../group-member/shared/group-member.model';
import { ChatModel } from '../../chat/shared/chat.model';
import { ProfileModel } from '../../profile/shared/profile.model';


enum GroupType {
	Personal = 'personal',
	Group = 'group'
}

enum AccessType {
	Public = 'public',
	Private = 'private'
}
export interface IGroup {
	id: number;
	ownerId: number;
	memberId?: number;
	member?: ProfileModel;
	groupName: string;
	groupMembers: GroupMemberModel[];
	chats: ChatModel[];
	groupDescription: string;
	groupType: GroupType;
	accessType: AccessType;
	groupImage: string;
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

	@Column('int', {
		default: 0
	})
	@ApiModelProperty()
	@IsInt()
	memberId: number;

	@ManyToOne(type => ProfileModel, profile => profile.githubUid, {
		eager: true,
		cascade: false
	})
	@JoinColumn({ name: 'memberId', referencedColumnName: 'githubUid' })
	member: ProfileModel;

	@Column({ length: 500 })
	@ApiModelProperty()
	@IsString()
	groupName: string;

	@OneToMany(type => ChatModel, chat => chat.group, {
		eager: true,
		cascade: false
	})
	chats: ChatModel[];

	@OneToMany(type => GroupMemberModel, groupMember => groupMember.group, {
		eager: true,
		cascade: false
	})
	groupMembers: GroupMemberModel[];

	@Column('text')
	@ApiModelProperty()
	@IsString()
	groupDescription: string;

	@Column({
		type: "enum",
		enum: GroupType,
		default: GroupType.Group,
	})
	@ApiModelProperty()
	groupType: GroupType;

	@Column({
		type: "enum",
		enum: AccessType,
		default: AccessType.Public,
	})
	@ApiModelProperty()
	accessType: AccessType;

	@Column('text')
	@ApiModelProperty()
	@IsString()
	groupImage: string;

	@Column('text')
	@ApiModelProperty({ type: Date })
	@IsString()
	date: Date;
}
