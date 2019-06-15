/* eslint-disable */
/* eslint-disable import/prefer-default-export */

import { createSelector } from 'reselect';

export const chats = (state: { chats: any; }) => state.chats;

export const getChatState = createSelector([chats], (chatState) => chatState);
