// Library
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Model
import { GroupModel } from '../../group/shared/group.model';
import { ProfileModel } from '../../profile/shared/profile.model';

export interface IChat {
	id?: number;
	groupId: number;
	group?: GroupModel;
	message: string;
	ownerId: number;
	owner?: ProfileModel;
	date: Date;
}

@Entity('chat')
export class ChatModel implements IChat {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	@IsInt()
	id: number;

	@Column('int')
	@ApiProperty()
	@IsInt()
	groupId: number;

	@ManyToOne(type => GroupModel, group => group.id, { cascade: false })
	group: GroupModel;

	@Column({ length: 500 })
	@ApiProperty()
	@IsString()
	message: string;

	@Column('int')
	@ApiProperty()
	@IsString()
	ownerId: number;

	@ManyToOne(type => ProfileModel, profile => profile.githubUid, {
		eager: true,
		cascade: false
	})
	@JoinColumn({ name: 'ownerId', referencedColumnName: 'githubUid' })
	owner: ProfileModel;

	@Column('text')
	@ApiProperty({ type: Date })
	@IsString()
	date: Date;
}
