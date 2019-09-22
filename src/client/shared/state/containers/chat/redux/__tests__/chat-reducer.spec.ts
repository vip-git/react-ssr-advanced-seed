// Model
import { ChatReduxModel } from '../../chat.redux-model';

// mocks
import mockChats from './mocks/chats';

// Reducer
import { ChatActionTypes } from '../chat.actions';
import ChatReducer from '../chat.reducer';

describe('Chat Reducers', () => {
	it('can get Initial State', () => {
		const initialState = {
			'app': undefined,
			'chats': { },
		};
		const state = ChatReduxModel.reduxState(initialState);
		expect(state).toStrictEqual(initialState);
	});

	it('can handle PROCESS_ALL_CHATS', () => {
		expect(
			ChatReducer(null, {
				type: ChatActionTypes.PROCESS_ALL_CHATS,
				payload: 'Run the tests'
			})
		).toEqual({ chatData: 'Run the tests' });
	});

	it('can handle PROCESS_ALL_USERS', () => {
		expect(
			ChatReducer(null, {
				type: ChatActionTypes.PROCESS_ALL_USERS,
				payload: 'Run the tests'
			})
		).toEqual({ userData: 'Run the tests' });
	});

	it('can handle PROCESS_CREATE_CHAT', () => {
		const initialState = {
			...ChatReduxModel.attributes,
			chats: mockChats
		};
		const date = Date.now();
		const mockedNewChatData = {
			id: 7,
			message: 'Hey.',
			type: 'received',
			date: new Date(date - 1000 * 60 * 60 * 10)
		};
		const expectedResponse = mockChats;
		expectedResponse.push(mockedNewChatData);
		expect(
			ChatReducer(initialState, {
				type: ChatActionTypes.PROCESS_CREATE_CHAT,
				payload: mockedNewChatData
			})
		).toEqual({
			...ChatReduxModel.attributes,
			chatData: [mockedNewChatData],
			chats: expectedResponse
		});
	});

	it('can handle PROCESS_DELETED_CHAT', () => {
		const initialState = {
			...ChatReduxModel.attributes,
			chats: mockChats
		};
		expect(
			ChatReducer(initialState, {
				type: ChatActionTypes.PROCESS_DELETED_CHAT,
				payload: 'Run the tests'
			})
		).toEqual({
			...ChatReduxModel.attributes,
			chats: mockChats
		});
	});

	it('can handle PROCESS_ERROR_CHAT_RESPONSE', () => {
		expect(
			ChatReducer(null, {
				type: ChatActionTypes.PROCESS_ERROR_CHAT_RESPONSE,
				payload: 'Run the tests'
			})
		).toEqual({ error: 'Run the tests' });
	});

	it('can handle CUSTOM_MESSAGE', () => {
		expect(
			ChatReducer(null, {
				type: 'CUSTOM_MESSAGE',
				payload: 'Run the tests'
			})
		).toEqual(null);
	});
});
