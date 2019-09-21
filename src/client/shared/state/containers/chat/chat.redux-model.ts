// Service
import { ChatServiceEngine } from '@omega-core/services/chat';
import { UserServiceEngine } from '@omega-core/services/user';
import { GroupServiceEngine } from '@omega-core/services/group';

// Rules
import { ChatRulesEngine } from '@omega-core/rules/chat.rules';

// Redux
import { ChatEffectsEngine } from './redux/chat.effects';
import { ChatActionsEngine, ChatActionTypes } from './redux/chat.actions';
import { getChatState, getAppState } from './redux/chat.selectors';

export const ChatReduxModel = {
	attributes: {
		chatData: [],
		userData: [],
		groupData: []
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
		...UserServiceEngine,
		...GroupServiceEngine
	},
	reduxActions: (dispatch: any) => ({
		dispatchReadAllUsersAndChats: (payload: any) =>
			dispatch(ChatReduxModel.actions.effects.readAllUsersAndChats(payload)),
		dispatchCreateChat: (payload: any) =>
			dispatch(ChatReduxModel.actions.effects.createChat(payload)),
		dispatchDeleteChat: (payload: any) =>
			dispatch(ChatReduxModel.actions.effects.deleteChat(payload)),
		dispatchEditChat: (payload: any) =>
			dispatch(ChatReduxModel.actions.effects.editChat(payload)),
		dispatchProcessErrorChatResponse: (payload: any) =>
			dispatch(ChatReduxModel.actions.reducer.processErrorChatResponse(payload)),
		dispatchCreateGroup: (payload: any) =>
			dispatch(ChatReduxModel.actions.effects.createGroup(payload)),
	}),
	reduxState: (state: any) => ({
		chats: getChatState(state),
		app: getAppState(state)
	})
};
