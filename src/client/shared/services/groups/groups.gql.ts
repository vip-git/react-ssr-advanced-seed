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
	mutation createGroupMutation(
		$groupName: String
		$groupImage: String
		$groupDescription: String
		$groupType: String
		$accessType: String
		$date: String
	) {
		createGroup(
			groupName: $groupName
			groupImage: $groupImage
			groupDescription: $groupDescription
			groupType: $groupType
			accessType: $accessType
			date: $date
		) {
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

export const updateGroupMutation = gql`
	mutation updateGroupMutation(
		$id: Int
		$groupName: String
		$groupImage: String
		$groupDescription: String
		$groupType: String
		$accessType: String
		$date: String
	) {
		updateGroup(
			id: $id
			groupName: $groupName
			groupImage: $groupImage
			groupDescription: $groupDescription
			groupType: $groupType
			accessType: $accessType
			date: $date
		) {
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

export const removeGroupMutation = gql`
	mutation removeGroupMutation(
		$id: Int
	) {
		removeGroup(
			id: $id
		) {
			id
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
