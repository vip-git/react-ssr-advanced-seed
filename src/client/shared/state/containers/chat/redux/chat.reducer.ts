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
				chatData: payload
			};
		}
		case ChatReduxModel.actionTypes.PROCESS_ALL_USERS: {
			return {
				...state,
				userData: payload
			};
		}
		case ChatReduxModel.actionTypes.PROCESS_ALL_GROUPS: {
			return {
				...state,
				groupData: payload
			};
		}
		case ChatReduxModel.actionTypes.PROCESS_CREATE_CHAT: {
			const chatData = state.chatData;
			state.chatData.push(payload);
			return {
				...state,
				chatData
			};
		}
		case ChatReduxModel.actionTypes.PROCESS_DELETED_CHAT: {
			return {
				...state,
				chatData: (state as any).chatData.filter(
					(c: { chatId: any }) => c.chatId !== payload
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
