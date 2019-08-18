/* eslint-disable */
// Library
import { from } from 'rxjs';

// Config
import { config } from '@omega-core/config';

const returnValidURL = (type: any, URI: string) => {
	switch (type) {
		case 'api':
			return config.API_URL + URI;
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
			watchQuery.subscribeToMore({
				document,
				variables,
				updateQuery: (prev, { subscriptionData }): any => {
					// Perform updates on previousResult with subscriptionData
					if (!subscriptionData.data) return prev;
					const chatRecieved = subscriptionData.data.chatRecieved;
					return Object.assign({}, prev, {
						getChats: [...prev.getChats, chatRecieved]
					});
				}
			});
			return watchQuery;
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
		const options: any = {
			credentials: 'include',
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
		return response;
	}

	static setCookie(name, value, options: any = {}) {
		options = {
			path: '/',
			// add other defaults here if necessary
			...options
		};

		if (options && options.expires && options.expires.toUTCString) {
			options.expires = options.expires.toUTCString();
		}

		let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

		for (let optionKey in options) {
			updatedCookie += "; " + optionKey;
			let optionValue = options[optionKey];
			if (optionValue !== true) {
				updatedCookie += "=" + optionValue;
			}
		}
		console.log('about to set cookie', updatedCookie);
		document.cookie = updatedCookie;
	}
}
