// Library
import _ from 'lodash';
import { combineEpics } from 'redux-observable';

// Epics
import { ChatModel } from '../../containers/chat/chat.model';

export const rootEffect = combineEpics(
  ..._.values(ChatModel.effects),
);
