// internal
import { UserServiceEngine } from '../user.service';

// Mocks
import ContactMocks from '../mocks/contacts';

describe('User Service', () => {
    it('can get all chats', () => {
        const allUsers = UserServiceEngine.requestAllUsers();
        expect(allUsers).toBe(ContactMocks);
    });
});