// internal
// import { apolloClient } from '@omega-core/utils/apollo-client.engine';
import { ChatServiceEngine } from '../chat';


// Mocks
const apolloClientMock = {};

describe('Chat Service', () => {
	it('can get all chats', () => {
		const allChats = ChatServiceEngine.requestAllChats({
			apolloClientMock,
			data: {}
		});
		expect(allChats).toStrictEqual({});
	});

	it('can create chat', () => {
		const requestCreateChat = ChatServiceEngine.requestCreateChat({
			apolloClientMock,
			data: {}
		});
		expect(requestCreateChat).toBeDefined();
	});

	it('can update chat', () => {
		const requestEditChat = ChatServiceEngine.requestEditChat({
			apolloClientMock,
			data: {}
		});
		expect(requestEditChat).toBeDefined();
	});

	it('can remove chats', () => {
		const requestRemoveChat = ChatServiceEngine.requestRemoveChat({
			apolloClientMock,
			data: {}
		});
		expect(requestRemoveChat).toBeDefined();
	});
});
