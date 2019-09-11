// GraphQL
import gql from 'graphql-tag';

export const groupQuery = gql`
	query groupQuery($filters: GroupFindOptions!) {
		getGroup(filters: $filters){
            id
            groupName
            groupImage
            groupDescription
            groupType
            accessType
            date
        }
	}
`;

export const createGroupMutation = gql`
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

export const groupSubscription = gql`
	subscription groupSubscription {
		groupRecieved {
            id
            groupName
            groupImage
            groupDescription
            groupType
            accessType
            date
		}
	}
`;
