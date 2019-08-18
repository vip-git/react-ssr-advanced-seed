// Library
import { of, from } from 'rxjs';

// Services
import { HttpService } from '../core/http.service';

// Mocks
import allChats from '../mocks/chats';

// Gql
import { chatQuery, createChatMutation, chatSubscription } from './chat.gql';

class ChatService {
	static getChats(payload: any) {
		// allChats
		const { apolloClient, data } = payload;
		return HttpService.buildGraphQLCall(apolloClient, 'query', chatQuery, data);
	}

	static getChatsRest(payload: any) {
		return HttpService.buildRestApiCall('api', 'GET', '/chats', payload.accessToken, {})
	}

	static getAllChats(payload: any) {
		const { apolloClient, data } = payload;
		return HttpService.buildGraphQLCall(
			apolloClient,
			'subscription',
			{ query: chatQuery, document: chatSubscription },
			data
		);
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
	requestAllChats: action => ChatService.getChats(action),
	requestAllChatsRest: action => ChatService.getChatsRest(action),
	requestCreateChat: (payload: any) => ChatService.createChat(payload),
	requestRemoveChat: (chatId: any) => ChatService.removeChat(chatId),
	requestEditChat: (chatId: any) => ChatService.editChat(chatId)
};
