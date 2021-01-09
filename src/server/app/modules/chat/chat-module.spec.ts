// Library
import { INestApplication } from '@nestjs/common';

// dbConnection
import { dbConnection } from '../../__mocks__/db-connection.mock';

// Shared
import { ChatService } from './shared/chat.service';

const request = require('supertest');

describe('Chats e2e test', () => {
	let app: INestApplication;
	const catsService = { findAll: () => ['test'] };

	beforeAll(async () => {
		const module = await dbConnection
			.overrideProvider(ChatService)
			.useValue(catsService)
			.compile();

		app = module.createNestApplication();
		await app.init();
	});

	it('/GET chats', () => {
		return request(app.getHttpServer())
			.get('/chats')
			.expect(401)
			.expect({
				statusCode: 401,
				message: 'Unauthorized'
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
