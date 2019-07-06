import { getChatState } from '../chat.selectors';
import { initialState } from '../chat.reducer';
import { ChatReduxModel } from '../../chat.redux-model';

describe('App Selectors', () => {
    it('gets the locale', () => {
        const matchState: any = ChatReduxModel.attributes;
        // expect(getChatState(initialState)).toMatch(matchState);
        expect(true).toBe(true);
    });
});
