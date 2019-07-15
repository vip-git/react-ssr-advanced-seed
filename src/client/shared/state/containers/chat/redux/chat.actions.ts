export const ChatActionTypes = {
	READ_ALL_USERS_AND_CHATS: 'chat/read-all-users-and-chats',

	READ_ALL_CHATS: 'chat/read-all-chats',
	PROCESS_ALL_CHATS: 'chat/process-all-chats',

	READ_ALL_USERS: 'chat/read-all-users',
	PROCESS_ALL_USERS: 'chat/process-all-users',

	CREATE_CHAT: 'chat/create-chat',
	PROCESS_CREATE_CHAT: 'chat/process-create-chat',

	DELETE_CHAT: 'chat/delete-chat',
	PROCESS_DELETED_CHAT: 'chat/process-deleted-chat',

	UPDATE_CHAT: 'chat/update-chat',

	PROCESS_ERROR_CHAT_RESPONSE: 'chat/process-error-response'
};

class ChatActions {
	static readAllChats = (payload: any) => ({
		type: ChatActionTypes.READ_ALL_CHATS,
		payload
	})

	static processAllChats = (payload: any) => ({
		type: ChatActionTypes.PROCESS_ALL_CHATS,
		payload
	})

	static readAllUsers = (payload: any) => ({
		type: ChatActionTypes.READ_ALL_USERS,
		payload
	})

	static readAllUsersAndChats = (payload: any) => ({
		type: ChatActionTypes.READ_ALL_USERS_AND_CHATS,
		payload
	})

	static processAllUsers = (payload: any) => ({
		type: ChatActionTypes.PROCESS_ALL_USERS,
		payload
	})

	static createChat = (payload: any) => ({
		type: ChatActionTypes.CREATE_CHAT,
		payload
	})

	static processCreateChat = (payload: any) => ({
		type: ChatActionTypes.PROCESS_CREATE_CHAT,
		payload
	})

	static deleteChat = (payload: any) => ({
		type: ChatActionTypes.DELETE_CHAT,
		payload
	})

	static processRemoveChat = (payload: any) => ({
		type: ChatActionTypes.PROCESS_DELETED_CHAT,
		payload
	})

	static editChat = (payload: any) => ({
		type: ChatActionTypes.UPDATE_CHAT,
		payload
	})

	static processErrorChatResponse = (payload: any) => ({
		type: ChatActionTypes.PROCESS_ERROR_CHAT_RESPONSE,
		payload
	})
}

export const ChatActionsEngine = {
	effects: {
		readAllUsersAndChats: (payload: any) =>
			ChatActions.readAllUsersAndChats(payload),
		readAllChats: (payload: any) => ChatActions.readAllChats(payload),
		readAllUsers: (payload: any) => ChatActions.readAllUsers(payload),
		createChat: (payload: any) => ChatActions.createChat(payload),
		editChat: (payload: any) => ChatActions.editChat(payload),
		deleteChat: (payload: any) => ChatActions.deleteChat(payload)
	},
	reducer: {
		processAllChats: (payload: any) => ChatActions.processAllChats(payload),
		processAllUsers: (payload: any) => ChatActions.processAllUsers(payload),
		processCreateChat: (payload: any) => ChatActions.processCreateChat(payload),
		processRemoveChat: (payload: any) => ChatActions.processRemoveChat(payload),
		processErrorChatResponse: (payload: any) =>
			ChatActions.processErrorChatResponse(payload)
	}
};
