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

export interface IChatProps {
	classes?: {
		avatar: string;
		root: string;
		button: string;
		header: string;
		appBar: string;
		toolBar: string;
		headerLeft: string;
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
	githubUserData?: any;
	groupId: number;
	title?: string;
	chatData?: Array<{}>;
	userData?: Array<{}>;
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
	opened: boolean;
	currentChat: string;
}

export interface IContact {
	id: number;
	avatar: string;
	name: string;
	status: string;
}
