/* eslint-env browser */
// Library
import _ from 'lodash';
import { of, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, switchMap, mergeMap, flatMap } from 'rxjs/operators';

// Model and Actions
import { RulesEngine } from '@omega-core/utils/rules.engine';
import { ChatReduxModel } from '../chat.redux-model'; // Todo: This would change based on web and mobile

// Interfaces
export interface IChat {
	id: number;
	groupId?: number;
	ownerId: number;
	message: string;
	date: Date | number;
}

interface IAction {
	type: string;
	payload: any;
}

interface IChatDataResponse {
	error?: boolean;
	message?: string;
	data: any;
}

// persisted vars
const initialAction: IAction = {
	type: 'NO_ACTION',
	payload: {}
};

class ChatEffect {
	/**
	 * GET chat epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static readAllChats = (action$: any) =>
		RulesEngine.applyRule(
			action$,
			ChatReduxModel.actionTypes.READ_ALL_CHATS,
			(action: IAction) => [
				ChatReduxModel.rules.validateChat(action),
				ChatReduxModel.rules.validateChatAgain(action)
			],
			() => [
				flatMap((action: IAction) => {
					const { payload } = action.payload;
					return ChatReduxModel.services.requestAllChats(payload);
				}),
				map(data => ChatReduxModel.rules.isValidChatResponse(data)),
				map((chatResponse: IChatDataResponse) => {
					if (chatResponse && chatResponse.error) {
						return ChatReduxModel.actions.reducer.processErrorChatResponse({
							...chatResponse
						});
					}
					const {
						data: { getChats }
					} = chatResponse;
					const finalData = Array.isArray(getChats)
						? getChats.map((val: IChat) => {
								// eslint-disable-next-line no-param-reassign
								val.date = new Date(val.date).getTime();
								return val;
						  })
						: [];
					return ChatReduxModel.actions.reducer.processAllChats(finalData);
				})
			]
		);

	/**
	 * GET chat epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static readAllUsers = (action$: any) =>
		action$.pipe(
			ofType(ChatReduxModel.actionTypes.READ_ALL_USERS),
			map((action: IAction) => ChatReduxModel.services.requestAllUsers()),
			map(data => ChatReduxModel.actions.reducer.processAllUsers(data))
		);

	/**
	 * GET chat epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static readAllUsersAndChats = (action$: any) =>
		action$.pipe(
			ofType(ChatReduxModel.actionTypes.READ_ALL_USERS_AND_CHATS),
			mergeMap((action: IAction) =>
				concat(
					of(ChatReduxModel.actions.effects.readAllUsers(action)),
					of(ChatReduxModel.actions.effects.readAllChats(action))
				)
			)
		);

	/**
	 * POST create chat epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static createChat = (action$: any) => {
		let componentCallBack = () => {};
		return action$.pipe(
			ofType(ChatReduxModel.actionTypes.CREATE_CHAT),
			flatMap((action: IAction) => {
				const {
					payload: { apolloClient, data, callBack }
				} = action;
				componentCallBack = () => callBack();
				return ChatReduxModel.services.requestCreateChat({
					apolloClient,
					data
				});
			}),
			map(() => {
				componentCallBack();
				return {
					type: 'CHAT_CREATED_END',
					payload: {}
				};
			})
		);
	};

	/**
	 * DELETE remove chat epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static deleteChat = (action$: any) => {
		const getPayload = {
			chatId: null,
			token: null
		};
		let chatSn = '';
		return action$.pipe(
			ofType(ChatReduxModel.actionTypes.DELETE_CHAT),
			switchMap((action: IAction) => {
				getPayload.chatId = action.payload.chatId;
				getPayload.token = action.payload.token;
				chatSn = action.payload.chatSn;
				return ChatReduxModel.services.requestRemoveChat(action.payload);
			}),
			mergeMap(() =>
				concat(
					of(ChatReduxModel.actions.reducer.processRemoveChat(chatSn)),
					of(ChatReduxModel.actions.effects.readAllChats(getPayload))
				)
			)
		);
	};

	/**
	 * PUT edit chat epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static editChat = (action$: any) => {
		const getPayload = {
			chatId: null,
			token: null
		};
		return action$.pipe(
			ofType(ChatReduxModel.actionTypes.UPDATE_CHAT),
			switchMap((action: IAction) => {
				getPayload.chatId = action.payload.chatId;
				getPayload.token = action.payload.token;
				return ChatReduxModel.services.requestEditChat(action.payload);
			}),
			mergeMap(data =>
				concat(
					of(ChatReduxModel.actions.reducer.processAllChats(data)),
					of(ChatReduxModel.actions.effects.readAllChats(getPayload))
				)
			)
		);
	};
}

export const ChatEffectsEngine = {
	$readAllChats: ChatEffect.readAllChats,
	$readAllUsers: ChatEffect.readAllUsers,
	$readAllUsersAndChats: ChatEffect.readAllUsersAndChats,
	$createChat: ChatEffect.createChat,
	$deleteChat: ChatEffect.deleteChat,
	$editChat: ChatEffect.editChat
};
