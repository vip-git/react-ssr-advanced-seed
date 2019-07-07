//  Library
import { of } from 'rxjs';
import { concat } from 'rxjs/operators';
import configureStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';

// effects
import { ChatEffectsEngine } from '../chat.effects';

// mocks
import ChatMocks from './mocks/chats';
import UserMocks from './mocks/contacts';

// Model
import { ChatReduxModel } from '../../chat.redux-model';
import console = require('console');

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];
const mockStore = configureStore(middlewares);

describe('Chat Effects', () => {
    it('can read initial users and chats', () => {
        const initialState = {};
        const store = mockStore(initialState);
        const dispatchReadAllUsersAndChats = ChatReduxModel.reduxActions(store.dispatch).dispatchReadAllUsersAndChats({});
        jest.spyOn(ChatReduxModel.services, 'requestAllUsers')
        .mockImplementation(() => UserMocks);
        jest.spyOn(ChatReduxModel.services, 'requestAllChats')
        .mockImplementation(() => ChatMocks);
        const mockedResponse = ['chat/read-all-users', 'chat/read-all-chats'];
        expect(dispatchReadAllUsersAndChats).toStrictEqual(ChatReduxModel.actions.effects.readAllUsersAndChats({}));
        const readAllUsersAndChats$ = of(dispatchReadAllUsersAndChats);
        const readAllUsers$ = of(ChatReduxModel.actions.effects.readAllUsers({}));
        const readAllChats$ = of(ChatReduxModel.actions.effects.readAllChats({}));
        ChatEffectsEngine.$readAllUsersAndChats(readAllUsersAndChats$)
        .subscribe((actual: any) => {
            const expectedType = mockedResponse[mockedResponse.indexOf(actual.type)];
            expect(actual.type).toBe(expectedType);
            of({type: expectedType });
          });

        ChatEffectsEngine.$readAllUsers(readAllUsers$)
        .subscribe((actual: any) => {
            expect(actual.payload).toBe(UserMocks);
          });

        ChatEffectsEngine.$readAllChats(readAllChats$)
        .subscribe((actual: any) => {
            expect(actual.payload).toBe(ChatMocks);
        });
    });
});
