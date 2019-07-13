/* eslint-disable */
/* tslint:disable */
// Library
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { createMemoryHistory } from 'history';
// import { createLogger } from 'redux-logger';

// Global Redux
import rootReducer from './root.reducer';
import { rootEffect } from './root.effects';

const history = createMemoryHistory();

const epicMiddleware = createEpicMiddleware();
const middlewares = [routerMiddleware(history)];

export const configureStore = ({ initialState = {}, middleware = [] } = {}) => {
	const devtools =
		typeof window !== 'undefined' &&
		typeof window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] === 'function' &&
		window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ actionsBlacklist: [] });

	const composeEnhancers = devtools || compose;

	if (process.env.NODE_ENV === 'development') {
		// eslint-disable-next-line global-require
		const { logger } = require('redux-logger');

		middlewares.push(logger);
	}

	const store = createStore(
		rootReducer(history),
		initialState,
		composeEnhancers(applyMiddleware(...[...middlewares, epicMiddleware])),
	);

	if (process.env.NODE_ENV !== 'production') {
		if (module['hot']) {
			module['hot'].accept('./root.reducer', () =>
				// eslint-disable-next-line global-require
				store.replaceReducer(require('./root.reducer').default),
			);
		}
	}

	epicMiddleware.run(rootEffect);

	return store;
};

export default configureStore;
