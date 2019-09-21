import { ReactType } from 'react';

export interface ICreateChatPayload {
	variables: {
		ownerId: Number;
		groupId: Number;
		message: string;
		date: Date;
	};
	callBack: () => void;
}

export interface ICreateGroupPayload {
	variables: {
		ownerId: Number;
		groupName: string;
		groupDescription: string;
		groupImage: string;
		groupType: 'group';
		accessType: 'public' | 'private';
		date: String;
	};
	callBack: (id: any) => void;
}

export interface IChatProps {
	classes?: {
		avatar: string;
		root: string;
		button: string;
		header: string;
		appBar: string;
		toolBar: string;
		headerLeft: string;
		textField: string;
		container: string;
		wrapper: string;
		modal: string;
		backdrop: string;
		drawerPaper: string;
		main: string;
		content: string;
		conversation: string;
		conversationSent: string;
		bodyReceived: string;
		conversationReceived: string;
		body: string;
		bodySent: string;
		date: string;
		dateSent: string;
		dateReceived: string;
		input: string;
	};
	width: any;
	githubUserData?: any;
	groupId?: number;
	title?: string;
	chatData?: any;
	userData?: any;
	groupData?: any;
	onSelectContact: (groupId: Number) => void;
	onSelectGroup?: (groupId: Number) => void;
	submitCreateGroup: (payload: any) => void;
	submitChat?: (payload: any) => void;
	readUsersAndChat?: () => void;
	SharedComponent?: ReactType;
	t?: (string) => string;
}

export interface IProfile {
	id: number;
	githubId: string;
	lastTokenWeb: string;
	lastTokenMobile: string;
	name: string;
	email: string;
	avatarUrl: string;
	bio: string;
	location: string;
	createdAt: string;
	updatedAt: string;
}

export interface IChat {
	id: number;
	groupId?: number;
	ownerId: number;
	owner: IProfile;
	message: string;
	date: Date;
}


export interface IChatState {
	opened?: boolean;
	createGroupForm?: boolean;
	settingsForm?: boolean;
	currentChat?: string;
}

export interface IContact {
	id: number;
	githubUid: number;
	githubId: string;
	bio: string;
	avatar: string;
	name: string;
	status: string;
}
