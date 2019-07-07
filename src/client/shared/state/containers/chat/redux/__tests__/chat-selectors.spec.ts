// Internal
import { getChatState } from '../chat.selectors';

describe('Chat Selectors', () => {
    it('Get Initial State', () => {
        const initialState = {
            chats: {},
        };
        const state = getChatState(initialState).chats;
        expect(state).toBe(undefined);
    });
});
