// Model and Actions
import { ChatModel } from '../chat.model';

// Library
const { Observable, of, concat } = require('rxjs');
const { map, switchMap, mergeMap, catchError } = require('rxjs/operators');

class ChatEffect {
    /**
     * GET chat epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static readAllChats = action$ =>
      action$.ofType(ChatModel.actionTypes.READ_ALL_CHATS)
        .pipe(
          map(action => ChatModel.services.requestAllChats(action.payload)),
          map(data => ChatModel.actions.processAllChats(data)),
        );

    /**
     * GET chat epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static readAllUsers = action$ =>
      action$.ofType(ChatModel.actionTypes.READ_ALL_USERS)
        .pipe(
          map(action => ChatModel.services.requestAllUsers(action.payload)),
          map(data => ChatModel.actions.processAllUsers(data)),
        );

    /**
     * GET chat epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static readAllUsersAndChats = action$ =>
      action$.ofType(ChatModel.actionTypes.READ_ALL_USERS_AND_CHATS)
        .pipe(
          mergeMap(action => 
            concat(
              of(ChatModel.actions.readAllUsers(action)),
              of(ChatModel.actions.readAllChats(action)),
            ),
          ),
        );

    /**
     * POST create comment epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static createChat = (action$) => {
      const getPayload = {
        productId: null,
        token: null,
      };
      return action$.ofType(ChatModel.actionTypes.CREATE_CHAT).pipe(
        switchMap((action) => {
          getPayload.productId = action.payload.productId;
          getPayload.token = action.payload.token;
          return ChatModel.services.requestCreateChat(action.payload);
        }),
        mergeMap(data => concat(of(ChatModel.actions.addChat(data)), 
          of(ChatModel.actions.getAllChats(getPayload)))),
      );
    };

    /**
     * DELETE remove comment epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static deleteChat = (action$) => {
      const getPayload = {
        productId: null,
        token: null,
      };
      let commentSn = '';
      return action$.ofType(ChatModel.actionTypes.DELETE_CHAT).pipe(
        switchMap((action) => {
          getPayload.productId = action.payload.productId;
          getPayload.token = action.payload.token;
          commentSn = action.payload.productCommentSn;
          return ChatModel.services.deleteComment(action.payload);
        }),
        mergeMap(() => concat(of(ChatModel.actions.removeChat(commentSn)), 
          of(ChatModel.actions.getAllChats(getPayload)))),
      );
    };

    /**
     * PUT edit comment epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static editChat = (action$) => {
      const getPayload = {
        productId: null,
        token: null,
      };
      return action$.ofType(ChatModel.actionTypes.UPDATE_CHAT).pipe(
        switchMap((action) => {
          getPayload.productId = action.payload.productId;
          getPayload.token = action.payload.token;
          return ChatModel.services.editComment(action.payload);
        }),
        map(() => ChatModel.actions.getAllChats(getPayload)),
      );
    };
}

export const ChatEffects = 
[
  ChatEffect.readAllChats,
  ChatEffect.readAllUsers,
  ChatEffect.readAllUsersAndChats,
  ChatEffect.createChat,
  ChatEffect.deleteChat,
  ChatEffect.editChat,
];
