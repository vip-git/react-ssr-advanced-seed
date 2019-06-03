class ChatRules {
  static validateChat(action) {
    console.log('i was called to validate chat', action);
    // throw new Error('I could not update');
    return 'done';
  }

  static validateChatAgain(action) {
    console.log('i was called to validate chat again', action);
    // throw new Error('I could not update again');
    return 'done';
  }
}

export const ChatRulesEngine = 
{
  validateChat: action => ChatRules.validateChat(action),  
  validateChatAgain: action => ChatRules.validateChatAgain(action),
};
