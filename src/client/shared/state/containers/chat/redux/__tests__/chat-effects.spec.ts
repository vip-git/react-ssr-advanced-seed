//  Library
import { of } from 'rxjs';
import configureStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';

// effects
import { ChatEffectsEngine } from '../chat.effects';

// mocks
import ChatMocks from './mocks/chats';
import UserMocks from './mocks/contacts';

// Model
import { ChatReduxModel } from '../../chat.redux-model';

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];
const mockStore = configureStore(middlewares);

describe('Chat Effects', () => {
	it('can read initial users and chats', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const dispatchReadAllUsersAndChats = ChatReduxModel.reduxActions(
			store.dispatch
		).dispatchReadAllUsersAndChats({});
		jest
			.spyOn(ChatReduxModel.services, 'requestAllUsers')
			.mockImplementation(() => UserMocks);
		jest
			.spyOn(ChatReduxModel.services, 'requestAllChats')
			.mockImplementation(() => ChatMocks);
		const mockedResponse = ['chat/read-all-users', 'chat/read-all-chats'];
		expect(dispatchReadAllUsersAndChats).toStrictEqual(
			ChatReduxModel.actions.effects.readAllUsersAndChats({})
		);
		const readAllUsersAndChats$ = of(dispatchReadAllUsersAndChats);
		const readAllUsers$ = of(ChatReduxModel.actions.effects.readAllUsers({}));
		const readAllChats$ = of(ChatReduxModel.actions.effects.readAllChats({}));
		ChatEffectsEngine.$readAllUsersAndChats(readAllUsersAndChats$).subscribe(
			(actual: any) => {
				const expectedType =
					mockedResponse[mockedResponse.indexOf(actual.type)];
				expect(actual.type).toBe(expectedType);
				of({ type: expectedType });
			}
		);

		ChatEffectsEngine.$readAllUsers(readAllUsers$).subscribe((actual: any) => {
			expect(ChatReduxModel.services.requestAllUsers).toBeCalled();
			expect(actual.payload).toBe(UserMocks);
		});

		ChatEffectsEngine.$readAllChats(readAllChats$).subscribe((actual: any) => {
			expect(ChatReduxModel.services.requestAllChats).toBeCalled();
			expect(actual.payload).toBe(ChatMocks);
		});
	});

	it('can create new chats', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const mockedActionPayload = {
			chatId: 1,
			token: 'test'
		};
		const dispatchCreateChat = ChatReduxModel.reduxActions(
			store.dispatch
		).dispatchCreateChat(mockedActionPayload);
		expect(dispatchCreateChat).toStrictEqual(
			ChatReduxModel.actions.effects.createChat(mockedActionPayload)
		);
		jest
			.spyOn(ChatReduxModel.services, 'requestAllChats')
			.mockImplementation(() => ChatMocks);
		const createChat$ = of(dispatchCreateChat);
		const processCreateChat$ = jest.spyOn(
			ChatReduxModel.actions.reducer,
			'processCreateChat'
		);
		const readAllChats$ = of(ChatReduxModel.actions.effects.readAllChats({}));
		const mockedResponse = ['chat/process-create-chat', 'chat/read-all-chats'];
		ChatEffectsEngine.$createChat(createChat$).subscribe((actual: any) => {
			const expectedType = mockedResponse[mockedResponse.indexOf(actual.type)];
			expect(actual.type).toBe(expectedType);
			of({ type: expectedType });
			expect(processCreateChat$).toHaveBeenCalled();
		});
		ChatEffectsEngine.$readAllChats(readAllChats$).subscribe((actual: any) => {
			expect(ChatReduxModel.services.requestAllChats).toBeCalled();
			expect(actual.payload).toBe(ChatMocks);
		});
	});

	it('can delete existing chats', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const mockedActionPayload = {
			chatId: 1,
			chatSn: '123123',
			token: 'test'
		};
		const dispatchDeleteChat = ChatReduxModel.reduxActions(
			store.dispatch
		).dispatchDeleteChat(mockedActionPayload);
		expect(dispatchDeleteChat).toStrictEqual(
			ChatReduxModel.actions.effects.deleteChat(mockedActionPayload)
		);
		const deleteChat$ = of(dispatchDeleteChat);
		const processRemoveChat$ = jest.spyOn(
			ChatReduxModel.actions.reducer,
			'processRemoveChat'
		);
		const readAllChats$ = of(ChatReduxModel.actions.effects.readAllChats({}));
		const mockedResponse = ['chat/process-deleted-chat', 'chat/read-all-chats'];
		ChatEffectsEngine.$deleteChat(deleteChat$).subscribe((actual: any) => {
			const expectedType = mockedResponse[mockedResponse.indexOf(actual.type)];
			expect(actual.type).toBe(expectedType);
			of({ type: expectedType });
			expect(processRemoveChat$).toHaveBeenCalled();
		});
		ChatEffectsEngine.$readAllChats(readAllChats$).subscribe((actual: any) => {
			expect(ChatReduxModel.services.requestAllChats).toBeCalled();
			expect(actual.payload).toBe(ChatMocks);
		});
	});

	it('can edit existing chats', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const mockedActionPayload = {
			chatId: 1,
			chatSn: '123123',
			token: 'test'
		};
		const dispatchEditChat = ChatReduxModel.reduxActions(
			store.dispatch
		).dispatchEditChat(mockedActionPayload);
		expect(dispatchEditChat).toStrictEqual(
			ChatReduxModel.actions.effects.editChat(mockedActionPayload)
		);
		const editChat$ = of(dispatchEditChat);
		const processEditChat$ = jest.spyOn(
			ChatReduxModel.actions.reducer,
			'processAllChats'
		);
		const readAllChats$ = of(ChatReduxModel.actions.effects.readAllChats({}));
		const mockedResponse = ['chat/process-all-chats', 'chat/read-all-chats'];
		ChatEffectsEngine.$editChat(editChat$).subscribe((actual: any) => {
			const expectedType = mockedResponse[mockedResponse.indexOf(actual.type)];
			expect(actual.type).toBe(expectedType);
			of({ type: expectedType });
			expect(processEditChat$).toHaveBeenCalled();
		});
	});
});
