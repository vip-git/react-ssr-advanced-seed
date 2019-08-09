/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Chat {
	id?: number;
	groupId?: number;
	message?: string;
	type?: string;
	date?: string;
	humanId?: number;
}

export abstract class IMutation {
	abstract createChat(
		message?: string,
		groupId?: number,
		type?: string,
		date?: string
	): Chat | Promise<Chat>;
}

export abstract class IQuery {
	abstract getChats(): Chat[] | Promise<Chat[]>;

	abstract chat(id: string): Chat | Promise<Chat>;

	abstract chatByHumanId(id: string): Chat | Promise<Chat>;
}

export abstract class ISubscription {
	abstract chatRecieved(): Chat | Promise<Chat>;
}
