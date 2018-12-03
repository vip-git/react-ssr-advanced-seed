// Service
import { ChatServiceEngine } from '../../common/services/chat.service';
import { UserServiceEngine } from '../../common/services/user.service';

// Redux
import { ChatActionsEngine, ChatActionTypes } from './redux/chat.actions';
import { getChatState } from './redux/chat.selectors';
import { ChatRulesEngine } from './redux/chat.rules';

export const ChatModel = ({
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
  i18nKeys: {

  },
  actionTypes: {
    ...ChatActionTypes,
  },
  actions: {
    ...ChatActionsEngine,
  },
  rules: {
    ...ChatRulesEngine,
  },
  services: {
    ...ChatServiceEngine,
    ...UserServiceEngine,
  },
  reduxActions: dispatch => ({
    dispatchReadAllUsersAndChats: payload => dispatch(ChatModel.actions.readAllUsersAndChats(payload)),
    dispatchCreateChat: payload => dispatch(ChatModel.actions.createChat(payload)),
    dispatchDeleteChat: payload => dispatch(ChatModel.actions.deleteChat(payload)),
    dispatchEditChat: payload => dispatch(ChatModel.actions.editChat(payload)),
  }),
  reduxState: state => ({
    chats: getChatState(state),
  }),
});
