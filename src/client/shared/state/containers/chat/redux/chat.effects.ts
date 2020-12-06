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
export interface Chat {
	id: number;
	groupId?: number;
	ownerId: number;
	message: string;
	date: Date | number;
}

interface Action {
	type: string;
	payload: any;
}

interface GraphqlDataResponse {
	error?: boolean;
	message?: string;
	data: any;
}

// persisted vars
const initialAction: Action = {
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
			(action: Action) => [
				ChatReduxModel.rules.validateChat(action),
				ChatReduxModel.rules.validateChatAgain(action)
			],
			() => [
				flatMap((action: Action) => {
					const { apolloClient, data } = action.payload.payload;
					const { chatPayload } = data;
					const graphqlPayload = {
						apolloClient,
						data: chatPayload,
					};
					return ChatReduxModel.services.requestAllChats(graphqlPayload);
				}),
				map(data => ChatReduxModel.rules.isValidChatResponse(data)),
				map((chatResponse: GraphqlDataResponse) => {
					if (chatResponse && chatResponse.error) {
						return ChatReduxModel.actions.reducer.processErrorChatResponse({
							...chatResponse
						});
					}
					const {
						data: { getGroup }
					} = chatResponse;
					const { id, chats, groupMembers, groupName, groupDescription, groupImage, groupType,
						accessType, member } = getGroup[0];
					const finalData = Array.isArray(chats)
						? chats.map((val: Chat) => {
								// eslint-disable-next-line no-param-reassign
								val.date = new Date(val.date).getTime();
								return val;
						  })
						: [];
					return ChatReduxModel.actions.reducer.processAllChats({
						id,
						groupName,
						groupDescription,
						groupType,
						member,
						accessType,
						groupImage,
						chats: finalData,
						groupMembers
					});
				})
			]
		);

	/**
	 * GET user epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static readAllUsers = (action$: any) =>
		action$.pipe(
			ofType(ChatReduxModel.actionTypes.READ_ALL_USERS),
			flatMap((action: Action) => {
				const { apolloClient, data } = action.payload.payload;
				const { profilePayload } = data;
				const graphqlPayload = {
					apolloClient,
					data: profilePayload,
				};
				return ChatReduxModel.services.requestAllUsers(graphqlPayload);
			}),
			map((userResponse: GraphqlDataResponse) => {
				const {
					data: { getProfile }
				} = userResponse;
				const finalData = Array.isArray(getProfile)
					? getProfile
					: [];
				return ChatReduxModel.actions.reducer.processAllUsers(finalData)
			})
		);

	/**
	 * GET group epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static readAllGroups = (action$: any) =>
		action$.pipe(
			ofType(ChatReduxModel.actionTypes.READ_ALL_GROUPS),
			flatMap((action: Action) => {
				const { apolloClient, data } = action.payload.payload;
				const { groupPayload } = data;
				const graphqlPayload = {
					apolloClient,
					data: groupPayload,
				};
				return ChatReduxModel.services.requestAllGroups(graphqlPayload);
			}),
			map((userResponse: GraphqlDataResponse) => {
				const {
					data: { getGroup }
				} = userResponse;
				const finalData = Array.isArray(getGroup)
					? getGroup
					: [];
				return ChatReduxModel.actions.reducer.processAllGroups(finalData)
			})
		);

	/**
	 * GET chat epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static readAllUsersAndChats = (action$: any) =>
		action$.pipe(
			ofType(ChatReduxModel.actionTypes.READ_ALL_USERS_AND_CHATS),
			mergeMap((action: Action) =>
				concat(
					of(ChatReduxModel.actions.effects.readAllUsers(action)),
					of(ChatReduxModel.actions.effects.readAllGroups(action)),
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
			flatMap((action: Action) => {
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
			switchMap((action: Action) => {
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
			switchMap((action: Action) => {
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

	/**
	 * POST create group epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static createGroup = (action$: any) => {
		let componentCallBack: any = () => { };
		return action$.pipe(
			ofType(ChatReduxModel.actionTypes.CREATE_GROUP),
			flatMap((action: Action) => {
				const {
					payload: { apolloClient, data, callBack }
				} = action;
				componentCallBack = (id) => callBack(id);
				return ChatReduxModel.services.createGroup({
					apolloClient,
					data
				});
			}),
			map((group: any) => {
				const { data: { createGroup: { id } } } = group;
				componentCallBack(id);
				return {
					type: 'GROUP_CREATED_END',
					payload: {}
				};
			})
		);
	};

	/**
	 * DELETE remove group epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static deleteGroup = (action$: any) => {
		const getPayload = {
			groupId: null,
			token: null
		};
		let chatSn = '';
		return action$.pipe(
			ofType(ChatReduxModel.actionTypes.DELETE_GROUP),
			switchMap((action: Action) => {
				getPayload.groupId = action.payload.groupId;
				getPayload.token = action.payload.token;
				chatSn = action.payload.chatSn;
				return ChatReduxModel.services.removeGroup(action.payload);
			}),
			mergeMap(() =>
				concat(
					of(ChatReduxModel.actions.reducer.processRemoveGroup(chatSn)),
					of(ChatReduxModel.actions.effects.readAllGroups(getPayload))
				)
			)
		);
	};

	/**
	 * PUT edit group epic
	 * @param action$
	 * @returns {any|*|Observable}
	 */
	static editGroup = (action$: any) => {
		const getPayload = {
			groupId: null,
			token: null
		};
		return action$.pipe(
			ofType(ChatReduxModel.actionTypes.UPDATE_GROUP),
			switchMap((action: Action) => {
				getPayload.groupId = action.payload.groupId;
				getPayload.token = action.payload.token;
				return ChatReduxModel.services.updateGroup(action.payload);
			}),
			mergeMap(data =>
				concat(
					of(ChatReduxModel.actions.reducer.processAllGroups(data)),
					of(ChatReduxModel.actions.effects.readAllGroups(getPayload))
				)
			)
		);
	};
}

export const ChatEffectsEngine = {
	$readAllChats: ChatEffect.readAllChats,
	$readAllUsers: ChatEffect.readAllUsers,
	$readAllGroups: ChatEffect.readAllGroups,
	$readAllUsersAndChats: ChatEffect.readAllUsersAndChats,
	$createChat: ChatEffect.createChat,
	$deleteChat: ChatEffect.deleteChat,
	$editChat: ChatEffect.editChat,
	// Group
	$createGroup: ChatEffect.createGroup,
	$deleteGroup: ChatEffect.deleteGroup,
	$editGroup: ChatEffect.editGroup
};
