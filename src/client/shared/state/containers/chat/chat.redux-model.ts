// Service
import { ChatServiceEngine } from '@omega-core/services/chat';
import { UserServiceEngine } from '@omega-core/services/user.service';

// Rules
import { ChatRulesEngine } from '@omega-core/rules/chat.rules';

// Redux
import { ChatEffectsEngine } from './redux/chat.effects';
import { ChatActionsEngine, ChatActionTypes } from './redux/chat.actions';
import { getChatState } from './redux/chat.selectors';

interface IDispatch {
	(arg0: { type: string; payload: any }): void;
	(arg0: { type: string; payload: any }): void;
	(arg0: { type: string; payload: any }): void;
	(arg0: { type: string; payload: any }): void;
}

export const ChatReduxModel = {
	attributes: {
		chatData: [],
		userData: []
	},
	actionTypes: {
		...ChatActionTypes
	},
	actions: {
		...ChatActionsEngine
	},
	effects: {
		...ChatEffectsEngine
	},
	rules: {
		...ChatRulesEngine
	},
	services: {
		...ChatServiceEngine,
		...UserServiceEngine
	},
	reduxActions: (dispatch: IDispatch) => ({
		dispatchReadAllUsersAndChats: (payload: any) =>
			dispatch(ChatReduxModel.actions.effects.readAllUsersAndChats(payload)),
		dispatchCreateChat: (payload: any) =>
			dispatch(ChatReduxModel.actions.effects.createChat(payload)),
		dispatchDeleteChat: (payload: any) =>
			dispatch(ChatReduxModel.actions.effects.deleteChat(payload)),
		dispatchEditChat: (payload: any) =>
			dispatch(ChatReduxModel.actions.effects.editChat(payload)),
		dispatchProcessErrorChatResponse: (payload: any) =>
			dispatch(ChatReduxModel.actions.reducer.processErrorChatResponse(payload))
	}),
	reduxState: (state: any) => ({
		chats: getChatState(state)
	})
};
