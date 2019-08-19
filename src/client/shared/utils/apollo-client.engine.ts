/* eslint-env browser */
// Library
import { ApolloClient, DefaultOptions } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { from, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Config
import { config as Config } from '@omega-core/config';
import { HttpService } from '@omega-core/services/core/http.service';

interface IMainDefinintion {
	kind: string;
	operation?: string;
}

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'network-only',
		errorPolicy: 'all'
	},
	query: {
		fetchPolicy: 'network-only',
		errorPolicy: 'all'
	}
};

const cacheLink = new InMemoryCache();

export const httpOnlyLink = (config: any = {}) =>
	createHttpLink({
		...config,
		uri: `${Config.API_URL}/graphql`,
		credentials: 'include'
	});

const subscriptionLink = (config = {}) => {
	let token = '';
	if (typeof window !== 'undefined') {
		const tokenObj =
			window.sessionStorage.getItem('token') &&
			JSON.parse(window.sessionStorage.getItem('token'));
		token = (tokenObj && tokenObj.accessToken) || '';
	}
	return new WebSocketLink({
		uri: `${Config.WS_PROTOCOL + Config.WS_URL}/graphql`,
		options: {
			reconnect: true,
			connectionParams: () => {
				/**
				 * Todo: just needs a valid token on first handshake thats it later it handles it itself
				 * so no refresh token is needed for this.
				 */
				// const token = await HttpService.getRefreshToken();
				return {
					isWebSocket: true,
					headers: {
						authorization: `Bearer ${token}`
					}
				};
			},
		},
		...config
	});
};

const authLink = setContext(async (_, { headers }) => {
	try {
		const token = await HttpService.getRefreshToken();
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : ''
			}
		};
	}
 catch (err) {
		return {
			headers: {
				...headers,
				authorization: ''
			}
		};
	}
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const requestLink = ({ httpLink, wsLink }) =>
	split(
		// split based on operation type
		({ query }) => {
			const { kind, operation }: IMainDefinintion = getMainDefinition(query);
			return kind === 'OperationDefinition' && operation === 'subscription';
		},
		wsLink,
		httpLink
	);

const errorLink = onError(({ graphQLErrors, networkError }) => {
	/*
    onError receives a callback in the event a GraphQL or network error occurs.
    This example is a bit contrived, but in the real world, you could connect
    a logging service to the errorLink or perform a specific action in response
    to an error.
    */
	if (graphQLErrors)
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const links: any = [
	errorLink,
	authLink,
	requestLink({
		httpLink: httpOnlyLink(),
		wsLink: subscriptionLink()
	})
];

export const apolloClient: any = new ApolloClient({
	connectToDevTools: process.env.NODE_ENV === 'development',
	link: from(links),
	cache: cacheLink,
	defaultOptions
});
