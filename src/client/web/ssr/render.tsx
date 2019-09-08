// Library
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// Apollo Client
import { apolloClient } from '@omega-core/utils/apollo-client-ssr.engine';
import IntlProvider from '../../shared/i18n/IntlProvider';
import Html from './html';
import App from '../app/App';
import theme from '../app/common/styles';

interface IReq {
	store?: { getState: () => void };
	url?: any;
}

interface IRes {
	send?: (arg0: string) => void;
	locals?: {
		assetPath?: {
			(arg0: string): string;
			(arg0: string): string;
			(arg0: string): string;
			(arg0: string): string;
		};
	};
}
/* ignore coverage */
const serverRenderer = () => (req: any, res: IRes) => {
	const sheets = new ServerStyleSheets();
	const content = renderToString(
		sheets.collect(
			<ApolloProvider client={apolloClient}>
				<ThemeProvider theme={theme}>
					<Provider store={req.store}>
						<Router location={req.url} context={{}}>
							<IntlProvider i18n={req.i18n}>
								<App />
							</IntlProvider>
						</Router>
					</Provider>
				</ThemeProvider>
			</ApolloProvider>
		)
	);

	const state = JSON.stringify(req.store.getState());

	return res.send(
		`<!doctype html>${renderToString(
			<Html
				css={[
					res.locals.assetPath('bundle.css'),
					res.locals.assetPath('vendor.css')
				]}
				scripts={[
					res.locals.assetPath('bundle.js'),
					res.locals.assetPath('vendor.js')
				]}
				state={state}
			>
				{content}
			</Html>
		)}`
	);
};

export default serverRenderer;
