// dbConnection
import {
	dbConnection,
	dbClearConnection
} from '../../../../__mocks__/db-connection.mock';

// Shared
import { ChatResolver } from '../chat.resolver';
import { ChatService } from '../../shared/chat.service';
import { GroupService } from '../../../group/shared/group.service';

describe('ChatResolvers', () => {
	let chatsResolver: ChatResolver;
	let chatsService: ChatService;
	let groupService: GroupService;
	beforeAll(async () => {
		const clearConnection = await dbClearConnection.compile();
		clearConnection.close();
		const module = await dbConnection.compile();
		chatsService = module.get<ChatService>(ChatService);
		chatsResolver = new ChatResolver(chatsService);
		groupService = module.get<GroupService>(GroupService);
	});

	describe('getChats', () => {
		it('should return an array of Chats', async () => {
			const getChats = await chatsResolver.getChats({});
			expect(getChats).toBeDefined();
			expect(getChats).toEqual([]);
		});
	});

	describe('create', () => {
		it('should return created chat', async () => {
			await groupService.createFirstGroup();
			const mockedChatData = {
				groupId: 1,
				message: 'test',
				ownerId: 6302771,
				date: new Date()
			};
			const createChat = await chatsResolver.create(
				null,
				mockedChatData,
				null,
				null
			);
			expect(createChat).toBeDefined();
			expect(createChat).toHaveProperty('groupId', 1);
			expect(createChat).toHaveProperty('ownerId', 6302771);
			expect(createChat).toHaveProperty('message', 'test');
		});
		it('should be able to call chatCreated', async () => {
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
			expect(getSingleChat).toHaveProperty('groupId', 1);
			expect(getSingleChat).toHaveProperty('ownerId', 6302771);
			expect(getSingleChat).toHaveProperty('message', 'test');
		});
	});
});
