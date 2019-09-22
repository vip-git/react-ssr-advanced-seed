// internal
import { apolloClient } from '@omega-core/utils/apollo-client.engine';
import { ChatServiceEngine } from '../chat';


// Mocks
import ChatMocks from '../mocks/chats';

describe('Chat Service', () => {
	it('can get all chats', () => {
		const allChats = ChatServiceEngine.requestAllChats({
			apolloClient,
			data: {}
		});
		expect(allChats).toBe({});
	});

	it('can create chat', () => {
		const requestCreateChat = ChatServiceEngine.requestCreateChat({
			apolloClient,
			data: {}
		});
		expect(requestCreateChat).toBeDefined();
	});

	it('can update chat', () => {
		const requestEditChat = ChatServiceEngine.requestEditChat({
			apolloClient,
			data: {}
		});
		expect(requestEditChat).toBeDefined();
	});

	it('can remove chats', () => {
		const requestRemoveChat = ChatServiceEngine.requestRemoveChat({
			apolloClient,
			data: {}
		});
		expect(requestRemoveChat).toBe(undefined);
	});
});
