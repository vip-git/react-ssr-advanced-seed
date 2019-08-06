export const ActionTypes = {
  SET_LOCALE: 'app/set-locale',
  SET_TOKEN: 'app/set-token'
};

export const setLocale = (locale: any) => ({
  type: ActionTypes.SET_LOCALE,
  payload: locale,
});

export const setToken = (locale: any) => ({
  type: ActionTypes.SET_TOKEN,
  payload: locale,
});
