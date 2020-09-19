/* eslint-disable */
// Library
import { from } from 'rxjs';
import JWTDecode from 'jwt-decode';

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
	variables: Object,
	updateQuery: (prev: any, subscriptionData: any) => void = null
) => {
	switch (type) {
		case 'query':
			return apolloClient && apolloClient.query && apolloClient.query({
				query: gql,
				variables
			}) || {};
		case 'mutation':
			return apolloClient && apolloClient.mutate && apolloClient.mutate({
				mutation: gql,
				variables
			}) || {};
		case 'subscription':
			const { query, document } = gql;
			if (apolloClient && apolloClient.watchQuery) {
				const watchQuery = apolloClient.watchQuery({
					query,
					variables
				});
				watchQuery.subscribeToMore({
					document,
					variables,
					updateQuery
				});
				return watchQuery;
			}
			return {};
	}
};

export class HttpService {
	static async buildRestApiCall(
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

	static getRefreshToken() {
		try {
			const lastAccessToken = window.sessionStorage.getItem('token') && JSON.parse(window.sessionStorage.getItem('token')).accessToken;
			const githubUserData: any = JWTDecode(window.sessionStorage.getItem('token') && JSON.parse(window.sessionStorage.getItem('token')).idToken);
			if (!lastAccessToken) {
				return 'Refresh API call failed';
			}
			const URL = returnValidURL('api', '/auth/refresh?lastToken=' + lastAccessToken + '&githubId=' +  githubUserData?.login);
			const options: any = {
				method: 'GET',
			};
			return fetch(URL, options)
				.then(response => {
					if (!response.ok) {
						return 'Refresh API call failed';
					}
					return response.json();
				})
				.then(response => {
					let newToken = '';
					try {
						newToken = response.accessToken;
						const token = window.sessionStorage.getItem('token') && JSON.parse(window.sessionStorage.getItem('token'));
						token.accessToken = newToken;
						window.sessionStorage.setItem('token', JSON.stringify(token));
					} catch (error) {
						newToken = '';
					}
					return newToken;
				})
				.catch(error => {
					console.log('error is', error);
					return 'Refresh API call failed';
				});
		} catch (error) {
			return 'Refresh API call failed';
		}
	}

	static buildGraphQLCall(
		apolloClient: any,
		type: any,
		gql: any,
		variables: Object,
		updateQuery: (prev: any, subscriptionData: any) => void = null,
	) {
		const response = returnValidGraphQLOpertaion(
			apolloClient,
			type,
			gql,
			variables,
			updateQuery
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
		document.cookie = updatedCookie;
	}
}
