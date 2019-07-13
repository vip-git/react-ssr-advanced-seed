/* tslint:disable:no-string-literal */
// Library
import React from 'react';
import { createBrowserHistory as createHistory } from 'history';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router, routerMiddleware } from 'react-router-redux';

// Internal
import routes from './app/routes';
import { ThemeProvider } from '@material-ui/styles';
import IntlProvider from './app/common/i18n/IntlProvider';
import { configureStore } from '../shared/state';
import theme from './app/common/styles';

/* ignore coverage */
const browserHistory = window['browserHistory'] || createHistory();
/* ignore coverage */
const store =
    window['store'] ||
    configureStore({
        initialState: window['__PRELOADED_STATE__'],
        middleware: [routerMiddleware(browserHistory)],
    });
/* ignore coverage */
hydrate(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <Router history={browserHistory}>
                <IntlProvider>
                    { routes }
                </IntlProvider>
            </Router>
        </Provider>
    </ThemeProvider>,
    document.getElementById('app'),
);
/* ignore coverage */
if (process.env.NODE_ENV === 'development') {
    if (module['hot']) {
        module['hot'].accept();
    }

    if (!window['store'] || !window['browserHistory']) {
        window['browserHistory'] = browserHistory;
        window['store'] = store;
    }
}
