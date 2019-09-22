// internal
import { UserServiceEngine } from '../user';

// Mocks
import ContactMocks from '../mocks/contacts';

describe('User Service', () => {
  it('can get all users', () => {
    const allUsers = UserServiceEngine.requestAllUsers({});
    expect(allUsers).toStrictEqual({});
  });
});
