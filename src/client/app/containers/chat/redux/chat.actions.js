export const ActionTypes = {
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

export class ChatActions { 
  static readAllChats = payload => ({
    type: ActionTypes.READ_ALL_CHATS,
    payload,
  });
    
  static processAllChats = payload => ({
    type: ActionTypes.PROCESS_ALL_CHATS,
    payload,
  });

  static readAllUsers = payload => ({
    type: ActionTypes.READ_ALL_USERS,
    payload,
  });
  
  static readAllUsersAndChats = payload => ({
    type: ActionTypes.READ_ALL_USERS_AND_CHATS,
    payload,
  });
    
  static processAllUsers = payload => ({
    type: ActionTypes.PROCESS_ALL_USERS,
    payload,
  });

  static createChat = payload => ({
    type: ActionTypes.CREATE_CHAT,
    payload,
  });
    
  static addChat = payload => ({
    type: ActionTypes.PROCESS_NEW_CHAT,
    payload,
  });
    
  static deleteChat = payload => ({
    type: ActionTypes.DELETE_CHAT,
    payload,
  });
    
  static removeChat = payload => ({
    type: ActionTypes.PROCESS_DELETED_CHAT,
    payload,
  });
    
  static editChat = payload => ({
    type: ActionTypes.UPDATE_CHAT,
    payload,
  });
}
