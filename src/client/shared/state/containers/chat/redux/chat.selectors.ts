/* eslint-disable */
/* eslint-disable import/prefer-default-export */

import { createSelector } from 'reselect';

export const chats = (state: any) => state.chats;
export const app = (state: any) => state.app;

export const getChatState = createSelector([chats], (chatState) => chatState);
export const getAppState = createSelector([app], (appState) => appState);
