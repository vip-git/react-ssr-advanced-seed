// Library
import { of } from 'rxjs';

// Services
import { HttpService } from '../core/http.service';

// Gql
import { 
	chatQuery,
	createChatMutation,
	updateChatMutation,
	chatSubscription
} from './chat.gql';

export interface Payload {
	apolloClient: {};
	data: {};
	accessToken: string;
}

class ChatService {
	static getChats(payload: Payload) {
		// allChats
		const { apolloClient, data } = payload;
		return HttpService.buildGraphQLCall(apolloClient, 'query', chatQuery, data);
	}

	static getChatsRest(payload: Payload) {
		return HttpService.buildRestApiCall(
			'api',
			'GET',
			'/chats',
			payload.accessToken,
			{}
		);
	}

	static getAllChats(payload: Payload) {
		const { apolloClient, data } = payload;
		return HttpService.buildGraphQLCall(
			apolloClient,
			'subscription',
			{ query: chatQuery, document: chatSubscription },
			data,
			(prev, { subscriptionData }): any => {
				// Perform updates on previousResult with subscriptionData
				if (!subscriptionData.data) return prev;
				const { chatRecieved } = subscriptionData.data;
				prev.getGroup[0].chats.push(chatRecieved);
				return { ...prev };
			}
		);
	}

	static createChat(payload: Payload) {
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

	static editChat(payload: any) {
		const { apolloClient, data } = payload;
		return HttpService.buildGraphQLCall(
			apolloClient,
			'mutation',
			updateChatMutation,
			data
		);
	}
}

export const ChatServiceEngine = {
	requestAllChats: action => ChatService.getAllChats(action),
	requestChats: action => ChatService.getChats(action),
	requestAllChatsRest: action => ChatService.getChatsRest(action),
	requestCreateChat: (payload: any) => ChatService.createChat(payload),
	requestRemoveChat: (chatId: any) => ChatService.removeChat(chatId),
	requestEditChat: (payload: any) => ChatService.editChat(payload)
};
