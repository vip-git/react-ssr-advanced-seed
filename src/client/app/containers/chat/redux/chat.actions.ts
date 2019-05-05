export const ChatActionTypes = {
  READ_ALL_USERS_AND_CHATS: 'chat/read-all-users-and-chats',
  
  READ_ALL_CHATS: 'chat/read-all-chats',
  PROCESS_ALL_CHATS: 'chat/process-all-chats',  
  
  READ_ALL_USERS: 'chat/read-all-users',
  PROCESS_ALL_USERS: 'chat/process-all-users',

  CREATE_CHAT: 'chat/create-chat',
  PROCESS_NEW_CHAT: 'chat/process-new-chat',

  DELETE_CHAT: 'chat/delete-chat',
  PROCESS_DELETED_CHAT: 'chat/process-deleted-chat',
  
  UPDATE_CHAT: 'chat/update-chat',
};

class ChatActions { 
  static readAllChats = payload => ({
    type: ChatActionTypes.READ_ALL_CHATS,
    payload,
  });
    
  static processAllChats = payload => ({
    type: ChatActionTypes.PROCESS_ALL_CHATS,
    payload,
  });

  static readAllUsers = payload => ({
    type: ChatActionTypes.READ_ALL_USERS,
    payload,
  });
  
  static readAllUsersAndChats = payload => ({
    type: ChatActionTypes.READ_ALL_USERS_AND_CHATS,
    payload,
  });
    
  static processAllUsers = payload => ({
    type: ChatActionTypes.PROCESS_ALL_USERS,
    payload,
  });

  static createChat = payload => ({
    type: ChatActionTypes.CREATE_CHAT,
    payload,
  });
    
  static processCreateChat = payload => ({
    type: ChatActionTypes.PROCESS_CREATE_CHAT,
    payload,
  });
    
  static deleteChat = payload => ({
    type: ChatActionTypes.DELETE_CHAT,
    payload,
  });
    
  static processRemoveChat = payload => ({
    type: ChatActionTypes.PROCESS_DELETED_CHAT,
    payload,
  });
    
  static editChat = payload => ({
    type: ChatActionTypes.UPDATE_CHAT,
    payload,
  });
}

export const ChatActionsEngine = {
  effects: {
    readAllUsersAndChats: payload => ChatActions.readAllUsersAndChats(payload),
    readAllChats: payload => ChatActions.readAllChats(payload),
    readAllUsers: payload => ChatActions.readAllUsers(payload),
    createChat: payload => ChatActions.createChat(payload),
    editChat: payload => ChatActions.editChat(payload),
  },
  reducer: {
    processAllChats: payload => ChatActions.processAllChats(payload),
    processAllUsers: payload => ChatActions.processAllUsers(payload),
    processCreateChat: payload => ChatActions.processCreateChat(payload),
    processRemoveChat: payload => ChatActions.processRemoveChat(payload),
  }
};
