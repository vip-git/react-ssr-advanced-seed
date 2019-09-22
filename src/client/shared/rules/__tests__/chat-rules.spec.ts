// internal
import { ChatRulesEngine } from '../chat.rules';

describe('Chat Rules', () => {
  it('can get all chats', () => {
    const validateChat = ChatRulesEngine.validateChat({});
    expect(validateChat).toBe('done');
  });

  it('can validate chat', () => {
    const validateChatAgain = ChatRulesEngine.validateChatAgain({});
    expect(validateChatAgain).toBe('done');
  });

  it('can validate error chat', () => {
    const isValidChatResponse = ChatRulesEngine.isValidChatResponse({});
    const isErrorChatResponse = ChatRulesEngine.isValidChatResponse({ error: [{ message: { error: 'Invalid Token', statusCode: 401 }}]});
    expect(isValidChatResponse).toStrictEqual({});
    expect(isErrorChatResponse).toStrictEqual({'error': [{
      message: {
        error: 'Invalid Token',
        statusCode: 401
      },
    }]});
  });
});
