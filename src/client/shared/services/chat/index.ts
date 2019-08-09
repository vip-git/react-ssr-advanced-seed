// Library
import { of } from 'rxjs';

// Services
import { HttpService } from '../core/http.service';

// Mocks
import allChats from '../mocks/chats';

// Gql
import { chatQuery, createChatMutation } from './chat.gql';

class ChatService {
	static getAllChats(payload: any) {
		// allChats
		const { apolloClient, data } = payload;
		return HttpService.buildGraphQLCall(apolloClient, 'query', chatQuery, data);
	}

	static createChat(payload: any) {
		const { apolloClient, data } = payload;
		return HttpService.buildGraphQLCall(
			apolloClient,
			'mutation',
			createChatMutation,
			data
		);
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
	requestEditChat: (chatId: any) => ChatService.editChat(chatId)
};
