export const ActionTypes = {
  SETLOCALE: 'app/set-locale',
};

export const setLocale = (locale: any) => ({
  type: ActionTypes.SETLOCALE,
  payload: locale,
});
