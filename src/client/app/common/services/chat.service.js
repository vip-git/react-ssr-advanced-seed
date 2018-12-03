const allChats = require('../mocks/chats');

class ChatService {
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
  
export const ChatServiceEngine = 
{
  requestAllChats: () => ChatService.getAllChats(),  
  requestRemoveChat: chatId => ChatService.removeChat(chatId),
  requestEditChat: chatId => ChatService.editChat(chatId),
};
