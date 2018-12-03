const allChats = require('../mocks/chats');

export class ChatService {
  static getAllChats() {
    return allChats.default;
  }

  static removeChat(chatId) {
    return console.log('i was called to remove');
  }

  static editChat(chatId) {
    return console.log('i was called to edit');
  }
}
  
