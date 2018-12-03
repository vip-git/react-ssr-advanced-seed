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
    
  static addChat = payload => ({
    type: ChatActionTypes.PROCESS_NEW_CHAT,
    payload,
  });
    
  static deleteChat = payload => ({
    type: ChatActionTypes.DELETE_CHAT,
    payload,
  });
    
  static removeChat = payload => ({
    type: ChatActionTypes.PROCESS_DELETED_CHAT,
    payload,
  });
    
  static editChat = payload => ({
    type: ChatActionTypes.UPDATE_CHAT,
    payload,
  });
}

export const ChatActionsEngine = {
  readAllUsersAndChats: payload => ChatActions.readAllUsersAndChats(payload),
  readAllChats: payload => ChatActions.readAllChats(payload),
  processAllChats: payload => ChatActions.processAllChats(payload),
  readAllUsers: payload => ChatActions.readAllUsers(payload),
  processAllUsers: payload => ChatActions.processAllUsers(payload),
  createChat: payload => ChatActions.createChat(payload),
  addChat: payload => ChatActions.addChat(payload),
  removeChat: payload => ChatActions.removeChat(payload),
  editChat: payload => ChatActions.editChat(payload),
};
