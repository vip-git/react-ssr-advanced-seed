// Service
import { ChatService } from '../../common/services/chat.service';
import { UserService } from '../../common/services/user.service';

// Redux
import { ChatActions, ActionTypes } from './redux/chat.actions';
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
  actionTypes: { ...ActionTypes },
  actions: {
    readAllUsersAndChats: payload => ChatActions.readAllUsersAndChats(payload),
    readAllChats: payload => ChatActions.readAllChats(payload),
    processAllChats: payload => ChatActions.processAllChats(payload),
    readAllUsers: payload => ChatActions.readAllUsers(payload),
    processAllUsers: payload => ChatActions.processAllUsers(payload),
    createChat: payload => ChatActions.createChat(payload),
    addChat: payload => ChatActions.addChat(payload),
    removeChat: payload => ChatActions.removeChat(payload),
    editChat: payload => ChatActions.editChat(payload),
  },
  rules: {
    ...ChatRulesEngine,
  },
  services: {
    requestAllChats: () => ChatService.getAllChats(),
    requestCreateChat: chatId => ChatService.createChat(chatId),
    requestRemoveChat: chatId => ChatService.removeChat(chatId),
    requestEditChat: chatId => ChatService.editChat(chatId),
    requestAllUsers: () => UserService.getAllUsers(),
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
