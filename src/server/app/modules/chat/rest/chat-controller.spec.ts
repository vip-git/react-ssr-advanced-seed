// dbConnection
import {
	dbConnection,
	dbClearConnection
} from '../../../__mocks__/db-connection.mock';

// Shared
import { IChat } from '../shared/chat.model';
import { ChatsController } from './chat.controller';

describe('ChatsController', () => {
	let chatsController: ChatsController;
	beforeAll(async () => {
		const clearConnection = await dbClearConnection.compile();
		clearConnection.close();
		const module = await dbConnection.compile();
		chatsController = module.get<ChatsController>(ChatsController);
	});

	describe('findAll', () => {
		it('should return an array of chats', async () => {
			const allChats = await chatsController.findAll();
			expect(allChats).toBeDefined();
			expect(allChats).toEqual([]);
		});
	});

	describe('create', () => {
		it('should return created chat', async () => {
			const mockedChatData: any = {
				id: 1,
				groupId: 2,
				message: 'test',
				ownerId: 3,
				date: new Date()
			};
			const createChat = await chatsController.create(mockedChatData);
			expect(createChat).toBeDefined();
			expect(createChat).toHaveProperty('groupId', 2);
			expect(createChat).toHaveProperty('message', 'test');
			expect(createChat).toHaveProperty('type', 'sent');
		});
	});

	describe('findOne', () => {
		it('should return single', async () => {
			const getSingleChat = await chatsController.findOne('1');
			expect(getSingleChat).toBeDefined();
			expect(getSingleChat).toHaveProperty('groupId', 2);
			expect(getSingleChat).toHaveProperty('message', 'test');
			expect(getSingleChat).toHaveProperty('type', 'sent');
		});
	});
});
