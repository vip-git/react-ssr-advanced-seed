// GraphQL
import gql from 'graphql-tag';

export const userQuery = gql`
	query userQuery($filters: ProfileFindOptions!) {
        getProfile(filters: $filters) {
            id
            githubId
            name
            bio
            avatar: avatarUrl
            createdAt
            updatedAt
        }
	}
`;

export const userSubscription = gql`
	subscription userSubscription {
		profileRecieved {
			id
            githubId
            name
            bio
            avatar: avatarUrl
            createdAt
            updatedAt
		}
	}
`;
