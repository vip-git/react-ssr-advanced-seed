/* eslint-disable */
// Library
import { DocumentNode } from 'graphql';
import { from } from 'rxjs';

// Config
import { config } from '@omega-core/config';

const returnValidURL = (type: any, URI: string) => {
	switch (type) {
		case 'api':
			return config.API_PROTOCOL + config.API_URL + URI;
	}
};

const returnValidGraphQLOpertaion = (
	apolloClient: any,
	type: any,
	gql: DocumentNode,
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
		gql: DocumentNode,
		variables: Object
	) {
		return from(
			returnValidGraphQLOpertaion(apolloClient, type, gql, variables).then(
				data => data
			)
		);
	}
}
