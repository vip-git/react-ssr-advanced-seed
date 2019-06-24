// Library
import { of, concat } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';

// Model and Actions
import { ChatReduxModel } from '../chat.redux-model'; // Todo: This would change based on web and mobile
import { RulesEngine } from '@omega-core/utils/rules.engine';

interface IAction {
   payload: {
     productId?: number,
     productCommentSn?: string,
     token: string,
   };
}

class ChatEffect {
    /**
     * GET chat epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static readAllChats = (action$: any) =>
      RulesEngine
        .applyRule(action$,
          ChatReduxModel.actionTypes.READ_ALL_CHATS,
          (          action: any) => [ChatReduxModel.rules.validateChat(action), ChatReduxModel.rules.validateChatAgain(action)],
          () => ([
            map(action => ChatReduxModel.services.requestAllChats()),
            map(data => ChatReduxModel.actions.reducer.processAllChats(data)),
          ]),
        )

    /**
     * GET chat epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static readAllUsers = (action$: any) =>
      action$.ofType(ChatReduxModel.actionTypes.READ_ALL_USERS)
        .pipe(
          map((action: IAction) => ChatReduxModel.services.requestAllUsers()),
          map(data => ChatReduxModel.actions.reducer.processAllUsers(data)),
        )

    /**
     * GET chat epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static readAllUsersAndChats = (action$: any) =>
      action$.ofType(ChatReduxModel.actionTypes.READ_ALL_USERS_AND_CHATS)
        .pipe(
          mergeMap(action =>
            concat(
              of(ChatReduxModel.actions.effects.readAllUsers(action)),
              of(ChatReduxModel.actions.effects.readAllChats(action)),
            ),
          ),
        )

    /**
     * POST create chat epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static createChat = (action$: any) => {
      const getPayload = {
        productId: null,
        token: null,
      };
      return action$.ofType(ChatReduxModel.actionTypes.CREATE_CHAT).pipe(
        switchMap((action: IAction) => {
          getPayload.productId = action.payload.productId;
          getPayload.token = action.payload.token;
          return ChatReduxModel.services.requestCreateChat(action.payload);
        }),
        mergeMap(data => concat(of(ChatReduxModel.actions.reducer.processCreateChat(data)),
          of(ChatReduxModel.actions.effects.readAllChats(getPayload)))),
      );
    }

    /**
     * DELETE remove chat epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static deleteChat = (action$: any) => {
      const getPayload = {
        productId: null,
        token: null,
      };
      let commentSn = '';
      return action$.ofType(ChatReduxModel.actionTypes.DELETE_CHAT).pipe(
        switchMap((action: IAction) => {
          getPayload.productId = action.payload.productId;
          getPayload.token = action.payload.token;
          commentSn = action.payload.productCommentSn;
          return ChatReduxModel.services.requestRemoveChat(action.payload);
        }),
        mergeMap(() => concat(of(ChatReduxModel.actions.reducer.processRemoveChat(commentSn)),
          of(ChatReduxModel.actions.effects.readAllChats(getPayload)))),
      );
    }

    /**
     * PUT edit chat epic
     * @param action$
     * @returns {any|*|Observable}
     */
    static editChat = (action$: any) => {
      const getPayload = {
        productId: null,
        token: null,
      };
      return action$.ofType(ChatReduxModel.actionTypes.UPDATE_CHAT).pipe(
        switchMap((action: IAction) => {
          getPayload.productId = action.payload.productId;
          getPayload.token = action.payload.token;
          return ChatReduxModel.services.requestEditChat(action.payload);
        }),
        map(() => ChatReduxModel.actions.effects.readAllChats(getPayload)),
      );
    }
}

export const ChatEffectsEngine =
{
  $readAllChats: ChatEffect.readAllChats,
  $readAllUsers: ChatEffect.readAllUsers,
  $readAllUsersAndChats: ChatEffect.readAllUsersAndChats,
  $createChat: ChatEffect.createChat,
  $deleteChat: ChatEffect.deleteChat,
  $editChat: ChatEffect.editChat,
};
