// ParentModel
import { RootModel } from '../../common/model/root.model';
const {
  libraries: {
      React,
      Component,
      connect
  }
} = RootModel;

// Service
import { ChatServiceEngine } from '../../common/services/chat.service';
import { UserServiceEngine } from '../../common/services/user.service';

// Components
import { ChatComponentsEngine } from './components';

// Redux
import { ChatEffectsEngine } from './redux/chat.effects';
import { ChatActionsEngine, ChatActionTypes } from './redux/chat.actions';
import { getChatState } from './redux/chat.selectors';
import { ChatRulesEngine } from './redux/chat.rules';

export const ChatModel = ({
  container: true,
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
  libraries: {
    React,
    Component,
    connect,
  },
  components: {
    ...ChatComponentsEngine
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
  docs: {
    dispatchReadAllUsersAndChats: {
      template: 'two-effects-diagram'
    },
    dispatchCreateChat: {
      template: 'normal-diagram'
    },
    dispatchDeleteChat: {
      template: 'normal-diagram'
    },
    dispatchEditChat: {
      template: 'normal-diagram'
    },
  },
  reduxActions: dispatch => ({
    dispatchReadAllUsersAndChats: payload => dispatch(ChatModel.actions.effects.readAllUsersAndChats(payload)),
    dispatchCreateChat: payload => dispatch(ChatModel.actions.effects.createChat(payload)),
    dispatchDeleteChat: payload => dispatch(ChatModel.actions.effects.deleteChat(payload)),
    dispatchEditChat: payload => dispatch(ChatModel.actions.effects.editChat(payload)),
  }),
  reduxState: state => ({
    chats: getChatState(state),
  }),
});
