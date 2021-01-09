// dbConnection
import {
	dbConnection,
	dbClearConnection
} from '../../../__mocks__/db-connection.mock';

// Shared
import { GroupService } from '../../group/shared/group.service';
import { ChatsController } from './chat.controller';

describe('ChatsController', () => {
	let chatsController: ChatsController;
	let groupService: GroupService;
	beforeAll(async () => {
		const clearConnection = await dbClearConnection.compile();
		clearConnection.close();
		const module = await dbConnection.compile();
		chatsController = module.get<ChatsController>(ChatsController);
		groupService = module.get<GroupService>(GroupService);
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
			await groupService.createFirstGroup();
			const mockedChatData: any = {
				groupId: 1,
				message: 'test',
				ownerId: 6302771,
				date: new Date()
			};
			const createChat = await chatsController.create(mockedChatData);
			expect(createChat).toBeDefined();
			expect(createChat).toHaveProperty('groupId', 1);
			expect(createChat).toHaveProperty('message', 'test');
		});
	});

	describe('findOne', () => {
		it('should return single', async () => {
			const getSingleChat = await chatsController.findOne('1');
			expect(getSingleChat).toBeDefined();
			expect(getSingleChat).toHaveProperty('groupId', 1);
			expect(getSingleChat).toHaveProperty('message', 'test');
		});
	});
});
