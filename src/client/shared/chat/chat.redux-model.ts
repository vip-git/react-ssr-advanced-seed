// Service
import { ChatServiceEngine } from '../common/services/chat.service';
import { UserServiceEngine } from '../common/services/user.service';

// Redux
import { ChatEffectsEngine } from './redux/chat.effects';
import { ChatActionsEngine, ChatActionTypes } from './redux/chat.actions';
import { getChatState } from './redux/chat.selectors';
import { ChatRulesEngine } from './redux/chat.rules';

export const ChatReduxModel = ({
  attributes: {
    currentUsers: {
      id: '',
      name: '',
      status: '',
      avatar: '',
    },
    currentChat: {
      text: '',
      type: '',
      date: '',
    },
    defaultChats: [],
    defaultUsers: [],
  },
  actionTypes: {
    ...ChatActionTypes,
  },
  actions: {
    ...ChatActionsEngine,
  },
  effects: {
    ...ChatEffectsEngine,
  },
  rules: {
    ...ChatRulesEngine,
  },
  services: {
    ...ChatServiceEngine,
    ...UserServiceEngine,
  },
  reduxActions: (dispatch: { (arg0: { type: string; payload: any; }): void; (arg0: { type: string; payload: any; }): void; (arg0: { type: string; payload: any; }): void; (arg0: { type: string; payload: any; }): void; }) => ({
    dispatchReadAllUsersAndChats: (payload: any) => dispatch(ChatReduxModel.actions.effects.readAllUsersAndChats(payload)),
    dispatchCreateChat: (payload: any) => dispatch(ChatReduxModel.actions.effects.createChat(payload)),
    dispatchDeleteChat: (payload: any) => dispatch(ChatReduxModel.actions.effects.deleteChat(payload)),
    dispatchEditChat: (payload: any) => dispatch(ChatReduxModel.actions.effects.editChat(payload)),
  }),
  reduxState: (state: any) => ({
    chats: getChatState(state),
  }),
});