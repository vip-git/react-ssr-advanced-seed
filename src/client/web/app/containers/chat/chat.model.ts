// Library
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ApolloConsumer } from 'react-apollo';
import JWTDecode from 'jwt-decode';

// Shared
import { ChatReduxModel } from '@omega-state-machines/chat/chat.redux-model';

// Components
import { ChatComponentsEngine } from './chat.components';

export const ChatModel = {
	container: true,
	i18nKeys: {},
	libraries: {
		React,
		Component,
		connect,
		JWTDecode,
		ApolloConsumer
	},
	components: {
		...ChatComponentsEngine
	},
	docs: {
		// dispatchReadAllUsersAndChats: {
		// 	template: 'two-effects-diagram',
		// 	vars: {
		// 		1: {
		// 			effect: 'READ_ALL_USERS_AND_CHATS'
		// 		},
		// 		2: {
		// 			effect: 'READ_ALL_USERS',
		// 			rules: ['NONE', 'NONE'],
		// 			api: 'requestAllUsers',
		// 			reducer: 'PROCESS_ALL_USERS',
		// 			state: 'userData: payload'
		// 		},
		// 		3: {
		// 			effect: 'READ_ALL_CHATS',
		// 			rules: ['validateChat', 'validateChatAgain'],
		// 			api: 'requestAllChats',
		// 			reducer: 'PROCESS_ALL_CHATS',
		// 			state: 'chatData: payload'
		// 		}
		// 	}
		// },
		// dispatchCreateChat: {
		// 	template: 'normal-diagram',
		// 	vars: {
		// 		1: {
		// 			effect: 'hello asdads',
		// 			rules: ['asdasdads 2', 'asdasdasd asdasd asd 2'],
		// 			api: 'hello test asdasd asdasdapi 2',
		// 			reducer: 'hello te asdasd asdadst reducer 2',
		// 			state: 'hello tes asdasd t state 2'
		// 		}
		// 	}
		// },
		// dispatchDeleteChat: {
		// 	template: 'normal-diagram',
		// 	vars: {
		// 		1: {
		// 			effect: 'hello asdads',
		// 			rules: ['asdasdads 2', 'asdasdasd asdasd asd 2'],
		// 			api: 'hello test asdasd asdasdapi 2',
		// 			reducer: 'hello te asdasd asdadst reducer 2',
		// 			state: 'hello tes asdasd t state 2'
		// 		}
		// 	}
		// },
		// dispatchEditChat: {
		// 	template: 'normal-diagram',
		// 	vars: {
		// 		1: {
		// 			effect: 'hello asdads',
		// 			rules: ['asdasdads 2', 'asdasdasd asdasd asd 2'],
		// 			api: 'hello test asdasd asdasdapi 2',
		// 			reducer: 'hello te asdasd asdadst reducer 2',
		// 			state: 'hello tes asdasd t state 2'
		// 		}
		// 	}
		// }
	},
	...ChatReduxModel
};
