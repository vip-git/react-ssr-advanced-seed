import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './app/reducer';
import chats from '../../chat/redux/chat.reducer';

const rootReducer = combineReducers({
  app,
  router,
  chats,
});

export default rootReducer;
