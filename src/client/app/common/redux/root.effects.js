// Library
import { combineEpics } from 'redux-observable';

// Epics
import { ChatEffects } from '../../containers/chat/redux/chat.effects';

export const rootEffect = combineEpics(
  ...ChatEffects,
);
