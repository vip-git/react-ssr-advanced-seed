import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import app from './containers/app/reducer';
import chats from './containers/chat/redux/chat.reducer';

const rootReducer: any = (history: any) =>
  combineReducers({
    app,
    router: connectRouter(history),
    chats,
  });

export default rootReducer;
