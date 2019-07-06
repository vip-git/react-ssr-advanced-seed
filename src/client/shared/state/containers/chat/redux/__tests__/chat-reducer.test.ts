import reducer, { initialState } from '../chat.reducer';
import { ChatActionTypes } from '../chat.actions';
import { ChatReduxModel } from '../../chat.redux-model';

describe('App Reducer', () => {
    it('sets the locale', () => {
        const matchState: any = ChatReduxModel.attributes;
        expect(reducer(initialState, { type: ChatActionTypes.READ_ALL_CHATS, payload: '' })).toEqual(matchState);
    });
});
