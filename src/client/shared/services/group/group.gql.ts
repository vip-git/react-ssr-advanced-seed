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
		$memberId: Int
		$groupName: String
		$groupImage: String
		$groupDescription: String
		$groupType: GroupType
		$groupMembers: [InputGroupMember]
		$accessType: AccessType
		$date: String
	) {
		createGroup(
			ownerId: $ownerId
			memberId: $memberId
			groupName: $groupName
			groupImage: $groupImage
			groupDescription: $groupDescription
			groupMembers: $groupMembers
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
		$memberId: Int
		$groupName: String
		$groupImage: String
		$groupDescription: String
		$groupType: GroupType
		$accessType: AccessType
		$date: String
	) {
		updateGroup(
			id: $id
			memberId: $memberId
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
