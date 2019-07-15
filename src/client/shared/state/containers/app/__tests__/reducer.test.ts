import reducer, { initialState } from '../reducer';
import { ActionTypes } from '../actions';

describe('App Reducer', () => {
	it('can get Initial State', () => {
		const initialState = {
			locale: 'en-US'
		};
		const state = reducer(undefined, {});
		expect(state).toStrictEqual(initialState);
	});
	it('sets the locale', () => {
		expect(
			reducer(initialState, { type: ActionTypes.SETLOCALE, payload: 'de-DE' })
		).toEqual({
			locale: 'de-DE'
		});
	});
});
