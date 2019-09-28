// dbConnection
import {
	dbConnection,
	dbClearConnection
} from '../../../../__mocks__/db-connection.mock';

// Shared
import { ChatResolver } from '../chat.resolver';
import { ChatService } from '../../shared/chat.service';

describe('ChatResolvers', () => {
	let chatsResolver: ChatResolver;
	let chatsService: ChatService;
	beforeAll(async () => {
		const clearConnection = await dbClearConnection.compile();
		clearConnection.close();
		const module = await dbConnection.compile();
		chatsService = module.get<ChatService>(ChatService);
		chatsResolver = new ChatResolver(chatsService);
	});

	describe('getChats', () => {
		it('should return an array of cats', async () => {
			const getChats = await chatsResolver.getChats({});
			expect(getChats).toBeDefined();
			expect(getChats).toEqual([]);
		});
	});

	describe('create', () => {
		it('should return created chat', async () => {
			const mockedChatData = {
				id: 1,
				groupId: 2,
				ownerId: 3,
				message: 'test',
				date: new Date()
			};
			const createChat = await chatsResolver.create(
				null,
				mockedChatData,
				null,
				null
			);
			expect(createChat).toBeDefined();
			expect(createChat).toHaveProperty('groupId', 2);
			expect(createChat).toHaveProperty('ownerId', 3);
			expect(createChat).toHaveProperty('message', 'test');
		});
		it('should be able to call catCreated', async () => {
			const catCreated = await chatsResolver.chatRecieved();
			expect(catCreated).toBeDefined();
		});
	});

	describe('findOneById', () => {
		it('should return single chat', async () => {
			const getSingleChat = await chatsResolver.findOneById(
				null,
				{ id: 1 },
				null,
				null
			);
			expect(getSingleChat).toBeDefined();
			expect(getSingleChat).toHaveProperty('groupId', 2);
			expect(getSingleChat).toHaveProperty('ownerId', 3);
			expect(getSingleChat).toHaveProperty('message', 'test');
		});
	});
});
