// dbConnection
import {
	dbConnection,
	dbClearConnection
} from '../__mocks__/db-connection.mock';

// Shared
import { IChat } from './chat.model';
import { ChatService } from './chat.service';

describe('ChatsService', () => {
	let chatService: ChatService;
	beforeAll(async () => {
		const clearConnection = await dbClearConnection.compile();
		clearConnection.close();
		const module = await dbConnection.compile();
		chatService = module.get<ChatService>(ChatService);
	});

	describe('findAll', () => {
		it('should return an array of chats', async () => {
			const findAllChats = await chatService.findAll({});
			expect(findAllChats).toBeDefined();
			expect(findAllChats).toEqual([]);
		});
	});

	describe('create', () => {
		it('should be able to create chat', async () => {
			const mockedChatData: IChat = {
				id: 1,
				groupId: 2,
				message: 'test',
				ownerId: 1,
				date: new Date()
			};
			const createChat = await chatService.create(mockedChatData);
			expect(createChat).toBeDefined();
			expect(createChat).toHaveProperty('groupId', 2);
			expect(createChat).toHaveProperty('message', 'test');
			expect(createChat).toHaveProperty('ownerId', 1);
		});
	});

	describe('findOneById', () => {
		it('should return single chat', async () => {
			const findOneChat = await chatService.findOneById(1);
			expect(findOneChat).toBeDefined();
			expect(findOneChat).toHaveProperty('groupId', 2);
			expect(findOneChat).toHaveProperty('message', 'test');
			expect(findOneChat).toHaveProperty('ownerId', 1);
		});
	});

	describe('update', () => {
		it('should return an array of cats', async () => {
			const mockedChatData: IChat = {
				id: 1,
				groupId: 2,
				message: 'test again',
				ownerId: 1,
				date: new Date()
			};
			const updateChat = await chatService.update(1, mockedChatData);
			expect(updateChat).toBeDefined();
			expect(updateChat).toHaveProperty('groupId', 2);
			expect(updateChat).toHaveProperty('message', 'test again');
			expect(updateChat).toHaveProperty('ownerId', 1);
		});
	});

	describe('delete', () => {
		it('should return an array of cats', async () => {
			const deletChat = await chatService.delete(1);
			expect(deletChat).toBe(undefined);
		});
	});
});
