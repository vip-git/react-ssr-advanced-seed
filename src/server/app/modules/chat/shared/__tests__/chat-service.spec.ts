// dbConnection
import {
	dbConnection,
	dbClearConnection
} from '../../../../__mocks__/db-connection.mock';

// Shared
import { IChat } from '../chat.model';
import { ChatService } from '../chat.service';
import { GroupService } from '../../../group/shared/group.service';

describe('ChatsService', () => {
	let chatService: ChatService;
	let groupService: GroupService;
	beforeAll(async () => {
		const clearConnection = await dbClearConnection.compile();
		clearConnection.close();
		const module = await dbConnection.compile();
		chatService = module.get<ChatService>(ChatService);
		groupService = module.get<GroupService>(GroupService);
	});

	describe('findAll', () => {
		it('should return an array of chats', async () => {
			const findAllChats = await chatService.findAll({
				where: { 'message': '' },
				not: {'message': ''},
				like: {'message': ''},
				in: {'message': []},
				any: {'message': []},
				order: {},
				skip: 1,
				take: 1,
			});
			expect(findAllChats).toBeDefined();
			expect(findAllChats).toEqual([]);
		});
	});

	describe('create', () => {
		it('should be able to create chat', async () => {
			await groupService.createFirstGroup();
			const mockedChatData: IChat = {
				groupId: 1,
				message: 'test',
				ownerId: 6302771,
				date: new Date()
			};
			const createChat = await chatService.create(mockedChatData);
			expect(createChat).toBeDefined();
			expect(createChat).toHaveProperty('groupId', 1);
			expect(createChat).toHaveProperty('message', 'test');
			expect(createChat).toHaveProperty('ownerId', 6302771);
		});
	});

	describe('findOneById', () => {
		it('should return single chat', async () => {
			const findOneChat = await chatService.findOneById(1);
			expect(findOneChat).toBeDefined();
			expect(findOneChat).toHaveProperty('groupId', 1);
			expect(findOneChat).toHaveProperty('message', 'test');
			expect(findOneChat).toHaveProperty('ownerId', 6302771);
		});
	});

	describe('update', () => {
		it('should return an array of chat', async () => {
			const mockedChatData: any = {
				id: 1,
				groupId: 1,
				message: 'test again',
				ownerId: 6302771,
				date: new Date()
			};
			const updateChat = await chatService.update(1, mockedChatData);
			expect(updateChat).toBeDefined();
			expect(updateChat).toHaveProperty('groupId', 1);
			expect(updateChat).toHaveProperty('message', 'test again');
			expect(updateChat).toHaveProperty('ownerId', 6302771);
		});
	});

	describe('delete', () => {
		it('should return an array of chat', async () => {
			const deletChat = await chatService.delete(1);
			expect(deletChat).toBe(undefined);
		});
	});
});
