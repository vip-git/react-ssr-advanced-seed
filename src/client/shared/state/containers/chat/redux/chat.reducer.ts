import { ChatReduxModel } from '../chat.redux-model'; // Todo needs to be web and mobile

export const initialState = Object.freeze({
	...ChatReduxModel.attributes
});

export default (state = initialState, action: { type: any; payload?: {} }) => {
	const { type, payload = {} } = action;

	// eslint-disable-next-line default-case
	switch (type) {
		case ChatReduxModel.actionTypes.PROCESS_ALL_CHATS: {
			return {
				...state,
				defaultChats: payload
			};
		}
		case ChatReduxModel.actionTypes.PROCESS_ALL_USERS: {
			return {
				...state,
				defaultUsers: payload
			};
		}
		case ChatReduxModel.actionTypes.PROCESS_CREATE_CHAT: {
			return {
				...state,
				chats: (state as any).chats.concat(payload)
			};
		}
		case ChatReduxModel.actionTypes.PROCESS_DELETED_CHAT: {
			return {
				...state,
				chats: (state as any).chats.filter(
					(c: { productCommentSn: any }) => c.productCommentSn !== payload
				)
			};
		}
		case ChatReduxModel.actionTypes.PROCESS_ERROR_CHAT_RESPONSE: {
			return {
				...state,
				error: payload
			};
		}

		default: {
			return state;
		}
	}
};
