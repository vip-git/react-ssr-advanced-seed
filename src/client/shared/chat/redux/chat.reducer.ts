
import { ChatReduxModel } from '../chat.redux-model'; // Todo needs to be web and mobile

export const initialState = Object.freeze({
  ...ChatReduxModel.attributes,
});

export default (state = initialState, action) => {
  const { type, payload = {} } = action;

  // eslint-disable-next-line default-case
  switch (type) {
    case ChatReduxModel.actionTypes.PROCESS_ALL_CHATS: {
      return {
        ...state,
        defaultChats: payload,
      };
    }
    case ChatReduxModel.actionTypes.PROCESS_ALL_USERS: {
      return {
        ...state,
        defaultUsers: payload,
      };
    }
    case ChatReduxModel.actionTypes.PROCESS_CREATE_CHAT: {
      return {
        ...state,
        chats: state.chats.concat(payload),
      };
    }
    case ChatReduxModel.actionTypes.PROCESS_DELETED_CHAT: {
      return {
        ...state,
        chats: state.chats.filter(c => c.productCommentSn !== payload),
      };
    }
  }

  return state;
};
