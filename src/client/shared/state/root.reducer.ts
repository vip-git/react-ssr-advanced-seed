import { combineReducers } from 'redux';
import { createMemoryHistory } from 'history';
import { connectRouter } from 'connected-react-router';
const history = createMemoryHistory();

import app from './containers/app/reducer';
import chats from './containers/chat/redux/chat.reducer';

const rootReducer: any = combineReducers({
  app,
  router: connectRouter(history),
  chats,
});

export default rootReducer;
