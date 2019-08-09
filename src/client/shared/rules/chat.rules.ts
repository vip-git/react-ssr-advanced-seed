class ChatRules {
	static validateChat(action: any) {
		// console.log('i was called to validate chat', action);
		// throw new Error('I could not update');
		return 'done';
	}

	static validateChatAgain(action: any) {
		// console.log('i was called to validate chat again', action);
		// throw new Error('I could not update again');
		return 'done';
	}

	static isValidChatResponse(data: any) {
		return !data || (data && data.errors && data.errors.length)
			? {
					error: true,
					title: data.errors[0].message.error,
					statusCode: data.errors[0].message.statusCode,
					message: 'Expired Session - Please login'
			  }
			: data;
	}
}

export const ChatRulesEngine = {
	validateChat: (action: any) => ChatRules.validateChat(action),
	validateChatAgain: (action: any) => ChatRules.validateChatAgain(action),
	isValidChatResponse: (data: any) => ChatRules.isValidChatResponse(data)
};
