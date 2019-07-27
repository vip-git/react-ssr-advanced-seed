// Config
export const config = {
    API_URL: (process.env.NODE_ENV === 'development') ?
                'http://localhost:3000' : 'https://react-ssr-nest-api.herokuapp.com',
};