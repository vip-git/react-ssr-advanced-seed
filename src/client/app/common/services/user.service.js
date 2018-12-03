const allUsers = require('../mocks/contacts');

export class UserService {
  static getAllUsers() {
    return allUsers.default;
  }
}
  
