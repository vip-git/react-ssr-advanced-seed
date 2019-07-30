/* eslint-disable */
// Library
import { from } from 'rxjs';

// Config
import { config } from '@omega-core/config';

const returnValidURL = (type: any, URI: string) => {
	switch (type) {
		case 'api':
			return config.API_PROTOCOL + config.API_URL + URI;
	}
};

const subscribeToMoreResults = async (watchQuery, document, variables) => {
	console.log('subscribed to more results');
	try {
		await watchQuery.subscribeToMore({
			document,
			variables,
			updateQuery: (prev, { subscriptionData }): any => {
				// Perform updates on previousResult with subscriptionData
				console.log('new data recieved', subscriptionData);
				if (!subscriptionData.data) return prev;
				const chatRecieved = subscriptionData.data.chatRecieved;
				return Object.assign({}, prev, {
					getChats: [chatRecieved, ...prev.getChats]
				});
			}
		});
	} catch (error) {
		console.log('subscription error', error);
	}
};

const returnValidGraphQLOpertaion = (
	apolloClient: any,
	type: any,
	gql: any,
	variables: Object
) => {
	switch (type) {
		case 'query':
			return apolloClient.query({
				query: gql,
				variables
			});
		case 'mutation':
			return apolloClient.mutate({
				mutation: gql,
				variables
			});
		case 'subscription':
			const { query, document } = gql;
			const watchQuery = apolloClient.watchQuery({
				query,
				variables
			});
			setTimeout(
				() => subscribeToMoreResults(watchQuery, document, variables),
				100
			);
			return watchQuery.result();
	}
};

export class HttpService {
	static buildRestApiCall(
		type: any,
		method: string,
		URI: any,
		token: string,
		payload: any
	) {
		const URL = returnValidURL(type, URI);
		const options = {
			method,
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		};
		if (method === 'GET') {
			delete options.body;
		}
		return from(
			fetch(URL, options)
				.then(response => {
					if (!response.ok) {
						return {
							message: 'API call failed',
							error: true,
							payload
						};
					}
					return response.json();
				})
				.then(response => response)
				.catch(error => {
					console.log('error is', error);
					return {
						message: 'API call failed',
						error: true,
						payload
					};
				})
		);
	}

	static buildGraphQLCall(
		apolloClient: any,
		type: any,
		gql: any,
		variables: Object
	) {
		const response = returnValidGraphQLOpertaion(
			apolloClient,
			type,
			gql,
			variables
		);
		return from(response);
	}
}
