// GraphQL
import gql from 'graphql-tag';

export const chatQuery = gql`
	query chatQuery($filters: GroupFindOptions!) {
		getGroup(filters: $filters) {
			id
			groupName
			groupDescription
			groupType
			accessType
        	groupImage
			member {
				id
				email
				githubUid
				githubId
				name
				bio
				avatarUrl
				location
			}
			groupMembers {
				id
				member {
					id
					email
					githubUid
					githubId
					name
					bio
					avatarUrl
					location
				}
				date
			}
			chats {
				id
				groupId
				ownerId
				owner {
					id
					email
					githubId
					name
					bio
					avatarUrl
					location
				}
				message
				date
			}
		}
	}
`;

export const createChatMutation = gql`
	mutation createChatMutation(
		$message: String
		$groupId: Int
		$ownerId: Int
		$date: String
	) {
		createChat(
			message: $message
			groupId: $groupId
			ownerId: $ownerId
			date: $date
		) {
			id
			groupId
			message
			ownerId
			date
		}
	}
`;

export const updateChatMutation = gql`
	mutation updateChatMutation(
		$id: Int
		$message: String
		$groupId: Int
		$ownerId: Int
		$date: String
	) {
		updateChat(
			id: $id
			message: $message
			groupId: $groupId
			ownerId: $ownerId
			date: $date
		) {
			id
			groupId
			message
			ownerId
			date
		}
	}
`;

export const chatSubscription = gql`
	subscription chatSubscription {
		chatRecieved {
			id
			groupId
			ownerId
			owner {
				id
				email
				githubId
				name
				bio
				avatarUrl
				location
			}
			message
			date
		}
	}
`;
