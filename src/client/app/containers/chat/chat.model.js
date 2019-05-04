// ParentModel
import { RootModel } from '../../common/model/root.model';

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

const {
  libraries: {
    React,
    Component,
    connect,
  },
} = RootModel;

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
    ...ChatComponentsEngine,
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
      template: 'two-effects-diagram',
      vars: {
        '1': {
          effect: 'READ_ALL_USERS_AND_CHATS',
        },
        '2': {
          effect: 'READ_ALL_USERS',
          rules: ['NONE', 'NONE'],
          api: 'requestAllUsers',
          reducer: 'PROCESS_ALL_USERS',
          state: 'defaultUsers: payload',
        },
        '3': {
          effect: 'READ_ALL_CHATS',
          rules: ['validateChat', 'validateChatAgain'],
          api: 'requestAllChats',
          reducer: 'PROCESS_ALL_CHATS',
          state: 'defaultChats: payload',
        },
      },
    },
    dispatchCreateChat: {
      template: 'normal-diagram',
      vars: {
        '1': {
          effect: 'hello asdads',
          rules: ['asdasdads 2', 'asdasdasd asdasd asd 2'],
          api: 'hello test asdasd asdasdapi 2',
          reducer: 'hello te asdasd asdadst reducer 2',
          state: 'hello tes asdasd t state 2',
        },
      },
    },
    dispatchDeleteChat: {
      template: 'normal-diagram',
      vars: {
        '1': {
          effect: 'hello asdads',
          rules: ['asdasdads 2', 'asdasdasd asdasd asd 2'],
          api: 'hello test asdasd asdasdapi 2',
          reducer: 'hello te asdasd asdadst reducer 2',
          state: 'hello tes asdasd t state 2',
        },
      },
    },
    dispatchEditChat: {
      template: 'normal-diagram',
      vars: {
        '1': {
          effect: 'hello asdads',
          rules: ['asdasdads 2', 'asdasdasd asdasd asd 2'],
          api: 'hello test asdasd asdasdapi 2',
          reducer: 'hello te asdasd asdadst reducer 2',
          state: 'hello tes asdasd t state 2',
        },
      },
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
