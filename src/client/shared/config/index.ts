// Config
export const config = {
	WS_PROTOCOL: process.env.NODE_ENV === 'development' ? 'ws://' : 'wss://',
	API_PROTOCOL: process.env.NODE_ENV === 'development' ? 'http://' : 'https://',
	API_URL:
		process.env.NODE_ENV === 'development'
			? 'localhost:3000'
			: 'react-ssr-nest-api.herokuapp.com'
};
