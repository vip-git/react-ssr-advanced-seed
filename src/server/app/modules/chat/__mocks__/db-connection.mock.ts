// Library
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

// Auth
import { AuthModule } from '../../auth/auth.module';

// Rest
import { ChatsController } from '../rest/chat.controller';

// Shared
import { ChatModel } from '../shared/chat.model';
import { ChatService } from '../shared/chat.service';

export const dbConnection = Test.createTestingModule({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.API_DB_HOST,
			port: parseInt(process.env.API_DB_PORT, 4),
			username: process.env.API_DB_USERNAME || 'postgres',
			password: process.env.API_DB_PASSWORD,
			database: process.env.API_DB_NAME || 'postgres',
			entities: [ChatModel],
			synchronize: true
		}),
		AuthModule,
		TypeOrmModule.forFeature([ChatModel])
	],
	controllers: [ChatsController],
	providers: [ChatService]
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
			entities: [ChatModel],
			dropSchema: true
		}),
		AuthModule,
		TypeOrmModule.forFeature([ChatModel])
	],
	controllers: [ChatsController],
	providers: [ChatService]
});
