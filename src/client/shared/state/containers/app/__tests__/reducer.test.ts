import reducer, { initialState } from '../reducer';
import { ActionTypes } from '../actions';

describe('App Reducer', () => {
	it('can get Initial State', () => {
		const initialState = {
			'idToken': '',
			'locale': 'en-US'
		};
		const state = reducer(undefined, {});
		expect(state).toStrictEqual(initialState);
	});
	it('sets the locale', () => {
		expect(
			reducer(initialState, { type: ActionTypes.SET_LOCALE, payload: 'de-DE' })
		).toEqual({
			'idToken': '',
			'locale': 'de-DE'
		});
	});
});
