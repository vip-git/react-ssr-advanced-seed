// internal
import { ChatServiceEngine } from '../chat.service';

// Mocks
import ChatMocks from '../mocks/chats';

describe('Chat Service', () => {
    it('can get all chats', () => {
        const allChats = ChatServiceEngine.requestAllChats({});
        expect(allChats).toBe(ChatMocks)
    });

    it('can create chat', () => {
        const requestCreateChat = ChatServiceEngine.requestCreateChat({});
        expect(requestCreateChat).toBeDefined();
    });

    it('can update chat', () => {
        const requestEditChat = ChatServiceEngine.requestEditChat({});
        expect(requestEditChat).toBeDefined();
    });

    it('can remove chats', () => {
        const requestRemoveChat = ChatServiceEngine.requestRemoveChat({});
        expect(requestRemoveChat).toBeDefined();
    });
});