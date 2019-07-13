// Library
import { of } from 'rxjs';

// Mocks
import allChats from './mocks/chats';

interface IAction {
	type: string;
	payload: object;
}

class ChatService {
  static getAllChats(action: IAction) {
    return allChats;
  }

  static createChat(chatId: any) {
    // console.log('i was called to create');
    return of('test');
  }

  static removeChat(chatId: any) {
    // console.log('i was called to remove');
    return of('test');
  }

  static editChat(chatId: any) {
    // console.log('i was called to edit');
    return of('test');
  }
}

export const ChatServiceEngine = {
  requestAllChats: action => ChatService.getAllChats(action),
  requestCreateChat: (payload: any) => ChatService.createChat(payload),
  requestRemoveChat: (chatId: any) => ChatService.removeChat(chatId),
  requestEditChat: (chatId: any) => ChatService.editChat(chatId),
};
