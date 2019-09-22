// Library
import React from 'react';
import { createBrowserHistory as createHistory } from 'history';
import { hydrate } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import {
	ConnectedRouter as Router,
	routerMiddleware
} from 'connected-react-router';

// Internal
import { ThemeProvider } from '@material-ui/styles';
import IntlProvider from '@omega-core/i18n';
import routes from './app/routes';
import { configureStore } from '../shared/state';
import theme from './app/common/styles';

// Apollo Client
import { apolloClient } from '@omega-core/utils/apollo-client.engine';

/* ignore coverage */
const browserHistory =
	((window as any) && (window as any).browserHistory) || createHistory();
	
/* ignore coverage */
const store =
	((window as any) && (window as any).store) ||
	configureStore({
		initialState: (window as any) && (window as any).__PRELOADED_STATE__,
		middleware: [routerMiddleware(browserHistory)]
	});
/* ignore coverage */
hydrate(
	<ApolloProvider client={apolloClient}>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Router history={browserHistory}>
					<IntlProvider>{routes}</IntlProvider>
				</Router>
			</Provider>
		</ThemeProvider>
	</ApolloProvider>,
	document.getElementById('app')
);
/* ignore coverage */
if (process.env.NODE_ENV === 'development') {
	if ((module as any) && (module as any).hot) {
		(module as any).hot.accept();
	}

	if (
		((!window as any) && !(window as any).store) ||
		((!window as any) && !(window as any).browserHistory)
	) {
		(window as any).browserHistory = browserHistory;
		(window as any).store = store;
	}
}
