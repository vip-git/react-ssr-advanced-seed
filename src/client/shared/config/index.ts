// Config
export const config = {
	WS_PROTOCOL:
		process.env.NODE_ENV === 'development'
			? 'ws://'
			: process.env.WS_PROTOCOL_URL,
	WS_URL: process.env.NODE_ENV === 'development' ? 'localhost:3000' : process.env.WS_URL,
	API_PROTOCOL: process.env.NODE_ENV === 'development' ? 'http://' : process.env.API_PROTOCOL,
	API_URL: process.env.NODE_ENV === 'development' ? 'localhost:3000' : '/api',
	LOGIN_URL: process.env.NODE_ENV === 'development' ? 'localhost:3000/auth/github' : '/auth/github'
};
