// Model
import { ChatReduxModel } from '../../chat.redux-model';

describe('Chat Reducers', () => {
    it('Get Initial State', () => {
        const initialState = {
            chats: {},
        };
        const state = ChatReduxModel.reduxState(initialState);
        expect(state).toStrictEqual(initialState);
    });
});
