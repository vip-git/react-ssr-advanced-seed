// Library
import _ from 'lodash';
import { combineEpics } from 'redux-observable';

// Epics
import { ChatModel } from '../../web/app/containers/chat/chat.model'; // Todo: this needs to be based on web and mobile decorator.

export const rootEffect = combineEpics(..._.values(ChatModel.effects));
