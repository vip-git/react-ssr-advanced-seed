// internal
import { createMockClient } from 'mock-apollo-client';
import { ChatServiceEngine } from '..';


// Mocks
const apolloClientMock = createMockClient();

describe('Chat Service', () => {
	it('can get chats', () => {
		const allChats = ChatServiceEngine.requestChats({
			apolloClientMock,
			data: {}
		});
		expect(allChats).toStrictEqual({});
	});

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

	it('can request All chats', () => {
		const requestRemoveChat = ChatServiceEngine.requestAllChatsRest({
			apolloClientMock,
			data: {}
		});
		expect(requestRemoveChat).toBeDefined();
	});
});
