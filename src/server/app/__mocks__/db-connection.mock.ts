// Library
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AuthModule } from '../modules/auth/auth.module';
import { GroupModule } from '../modules/group/group.module';
import { ChatModule } from '../modules/chat/chat.module';
import { GroupMemberModule } from '../modules/group-member/group-member.module';
import { ProfileModule } from '../modules/profile/profile.module';

// Rest
import { ChatsController } from '../modules/chat/rest/chat.controller';
import { ProfileController } from '../modules/profile/rest/profile.controller';
import { GroupController } from '../modules/group/rest/group.controller';
import { GroupMemberController } from '../modules/group-member/rest/group-member.controller';

// Shared Model
import { ChatModel } from '../modules/chat/shared/chat.model';
import { ProfileModel } from '../modules/profile/shared/profile.model';
import { GroupModel } from '../modules/group/shared/group.model';
import { GroupMemberModel } from '../modules/group-member/shared/group-member.model';

// Shared Services
import { ChatService } from '../modules/chat/shared/chat.service';
import { ProfileService } from '../modules/profile/shared/profile.service';
import { GroupService } from '../modules/group/shared/group.service';
import { GroupMemberService } from '../modules/group-member/shared/group-member.service';

// Shared Resolver
import { ChatResolver } from '../modules/chat/graphql/chat.resolver';
import { ProfileResolver } from '../modules/profile/graphql/profile.resolver';
import { GroupResolver } from '../modules/group/graphql/group.resolver';
import { GroupMemberResolver } from '../modules/group-member/graphql/group-member.resolver';


// Internal
const ModelArray = [ChatModel, ProfileModel, GroupModel, GroupMemberModel];
const ControllerArray = [ChatsController, ProfileController, GroupController, GroupMemberController];
const ServicesArray = [ChatService, ProfileService, GroupService, GroupMemberService, 
						ChatResolver, ProfileResolver, GroupResolver, GroupMemberResolver];

export const dbConnection = Test.createTestingModule({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.API_DB_HOST,
			port: parseInt(process.env.API_DB_PORT, 4),
			username: process.env.API_DB_USERNAME || 'postgres',
			password: process.env.API_DB_PASSWORD,
			database: process.env.API_DB_NAME || 'postgres',
			entities: ModelArray,
			synchronize: true
		}),
		AuthModule,
		GroupModule,
		ChatModule,
		GroupMemberModule,
		ProfileModule,
		TypeOrmModule.forFeature(ModelArray)
	],
	controllers: ControllerArray,
	providers: ServicesArray
});

export const dbClearConnection = Test.createTestingModule({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.API_DB_HOST,
			port: parseInt(process.env.API_DB_PORT, 4),
			username: process.env.API_DB_USERNAME || 'postgres',
			password: process.env.API_DB_PASSWORD,
			database: process.env.API_DB_NAME || 'postgres',
			entities: ModelArray,
			dropSchema: true
		}),
		AuthModule,
		GroupModule,
		ChatModule,
		GroupMemberModule,
		ProfileModule,
		TypeOrmModule.forFeature(ModelArray)
	],
	controllers: ControllerArray,
	providers: ServicesArray
});
