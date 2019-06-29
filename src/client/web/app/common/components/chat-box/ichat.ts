import { ReactType } from 'react';

export interface IChatProps {
  classes: {
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
  title: string;
  defaultChats: Array<object>;
  defaultUsers: Array<object>;
  sharedComponent: ReactType;
}

export interface IChat {
    id: number;
    type: 'sent' | 'recieved';
    message: string;
    date: Date;
}

export interface IChatState {
  opened: boolean;
}

export interface IContact {
  id: number;
  avatar: string;
  name: string;
  status: string;
}