// Library
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Model
import { ChatModel } from '../../chat/shared/chat.model';

export interface IProfile {
	id?: number;
	githubUid: number;
	chats?: ChatModel[];
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
	@ApiProperty()
	@IsInt()
	id: number;

	@Column('int', { unique: true })
	@ApiProperty()
	@IsInt()
	githubUid: number;

	@OneToMany(type => ChatModel, chat => chat.ownerId, {
		eager: false,
		cascade: false
	})
	chats: ChatModel[];

	@Column('text', { unique: true })
	@ApiProperty()
	@IsString()
	githubId: string;

	@Column('text', { unique: true })
	@ApiProperty()
	@IsString()
	lastTokenWeb: string;

	@Column('text', { unique: true })
	@ApiProperty()
	@IsString()
	lastTokenMobile: string;

	@Column('text')
	@ApiProperty()
	@IsString()
	name: string;

	@Column('text')
	@ApiProperty()
	@IsString()
	email: string;

	@Column('text')
	@ApiProperty()
	@IsString()
	avatarUrl: string;

	@Column('text')
	@ApiProperty()
	@IsString()
	bio: string;

	@Column('text')
	@ApiProperty()
	@IsString()
	location: string;

	@Column('text')
	@ApiProperty({ type: Date })
	@IsString()
	createdAt: Date;

	@Column('text')
	@ApiProperty({ type: Date })
	@IsString()
	updatedAt: Date;
}
