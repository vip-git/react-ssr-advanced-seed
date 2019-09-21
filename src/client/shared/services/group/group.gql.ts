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
		$ownerId: ID!
		$groupName: String
		$groupImage: String
		$groupDescription: String
		$groupType: GroupType
		$accessType: AccessType
		$date: String
	) {
		createGroup(
			ownerId: $ownerId
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
		$ownerId: ID!
		$groupName: String
		$groupImage: String
		$groupDescription: String
		$groupType: GroupType
		$accessType: AccessType
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
