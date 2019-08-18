/* eslint-disable default-case */
import { ActionTypes } from './actions';

export const initialState: any = Object.freeze({
	locale: 'en-US',
	idToken: ''
});

export default (state: any = initialState, action: any): any => {
	const { type, payload = {} } = action;

	switch (type) {
		case ActionTypes.SET_LOCALE: {
			return {
				...state,
				locale: payload
			};
		}
		case ActionTypes.SET_TOKEN: {
			return {
				...state,
				idToken: payload
			};
		}
	}

	return state;
};
