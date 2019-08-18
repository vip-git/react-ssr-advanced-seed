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
	classes: {
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
	accessToken: string;
	title: string;
	chatData: Array<object>;
	userData: Array<object>;
	submitChat: (payload) => void;
	readUsersAndChat: () => void;
	sharedComponent: ReactType;
	t: (string) => string;
}

export interface IChat {
	id: number;
	groupId?: number;
	ownerId: number;
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
