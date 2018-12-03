/* eslint-disable */
/* eslint-disable import/prefer-default-export */
// @flow
import { createSelector } from 'reselect';

export const chats = (state) => state.chats;

export const getChatState = createSelector([chats], (chatState) => chatState);
