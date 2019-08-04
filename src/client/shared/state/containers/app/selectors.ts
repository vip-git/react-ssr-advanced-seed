/* eslint-disable import/prefer-default-export */

import { createSelector } from 'reselect';

export const app = (state: { app: any }): any => state.app;

export const getLocale = createSelector(
  [app],
  (app): any => app,
);
