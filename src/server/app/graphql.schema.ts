
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Chat {
    id?: number;
    groupId?: number;
    ownerId?: number;
    message?: string;
    type?: string;
    date?: string;
}

export class Group {
    id?: number;
    ownerId?: number;
    groupName?: string;
    groupDescription?: string;
    date?: string;
}

export abstract class IMutation {
    abstract createChat(message?: string, groupId?: number, ownerId?: number, date?: string): Chat | Promise<Chat>;

    abstract updateChat(id: string, message?: string, groupId?: number, ownerId?: number, date?: string): Chat | Promise<Chat>;

    abstract createGroup(ownerId: string, groupName?: string, groupDescription?: string, date?: string): Group | Promise<Group>;

    abstract updateGroup(id: string, ownerId?: string, groupName?: string, groupDescription?: string, date?: string): Group | Promise<Group>;

    abstract createProfile(githubId?: string, lastTokenWeb?: string, lastTokenMobile?: string, createdAt?: string, updatedAt?: string): Profile | Promise<Profile>;

    abstract updateProfile(id: string, githubId?: string, lastTokenWeb?: string, lastTokenMobile?: string, createdAt?: string, updatedAt?: string): Profile | Promise<Profile>;
}

export class Profile {
    id?: number;
    githubId?: string;
    lastTokenWeb?: string;
    lastTokenMobile?: string;
    createdAt?: string;
    updatedAt?: string;
}

export abstract class IQuery {
    abstract getChats(): Chat[] | Promise<Chat[]>;

    abstract chat(id: string): Chat | Promise<Chat>;

    abstract getGroup(): Group[] | Promise<Group[]>;

    abstract group(id: string): Group | Promise<Group>;

    abstract getProfile(): Profile[] | Promise<Profile[]>;

    abstract profile(id: string): Profile | Promise<Profile>;
}

export abstract class ISubscription {
    abstract chatRecieved(): Chat | Promise<Chat>;

    abstract groupRecieved(): Group | Promise<Group>;

    abstract profileRecieved(): Profile | Promise<Profile>;
}
