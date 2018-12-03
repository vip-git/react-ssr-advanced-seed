// @flow
import { ChatModel } from '../chat.model';

export const initialState = Object.freeze({
  ...ChatModel.attributes,
});

export default (state = initialState, action) => {
  const { type, payload = {} } = action;

  // eslint-disable-next-line default-case
  switch (type) {
    case ChatModel.actionTypes.PROCESS_ALL_CHATS: {
      return {
        ...state,
        defaultChats: payload,
      };
    }
    case ChatModel.actionTypes.PROCESS_ALL_USERS: {
      return {
        ...state,
        defaultUsers: payload,
      };
    }
    case ChatModel.actionTypes.PROCESS_NEW_CHAT: {
      return {
        ...state,
        chats: state.chats.concat(payload),
      };
    }
    case ChatModel.actionTypes.PROCESS_DELETED_CHAT: {
      return {
        ...state,
        chats: state.chats.filter(c => c.productCommentSn !== payload),
      };
    }
  }

  return state;
};
