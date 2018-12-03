const allUsers = require('../mocks/contacts');

class UserService {
  static getAllUsers() {
    return allUsers.default;
  }
}
  
export const UserServiceEngine = 
{
  requestAllUsers: () => UserService.getAllUsers(),
};
