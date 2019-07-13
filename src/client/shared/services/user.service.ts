import allUsers from './mocks/contacts';

class UserService {
  static getAllUsers() {
    return allUsers;
  }
}

export const UserServiceEngine = {
  requestAllUsers: () => UserService.getAllUsers(),
};
