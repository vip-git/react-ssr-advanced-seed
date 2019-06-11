import allChats from './mocks/chats';

class ChatService {
  static getAllChats() {
    return allChats;
  }

  static removeChat(chatId: any) {
    return console.log('i was called to remove');
  }

  static editChat(chatId: any) {
    return console.log('i was called to edit');
  }
}

export const ChatServiceEngine = 
{
  requestAllChats: () => ChatService.getAllChats(),
  requestRemoveChat: (chatId: any) => ChatService.removeChat(chatId),
  requestEditChat: (chatId: any) => ChatService.editChat(chatId),
};
