
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum AccessType {
    public = "public",
    private = "private"
}

export enum GroupType {
    personal = "personal",
    group = "group"
}

export class ChatFindOptions {
    select?: string[];
    relations?: string[];
    where?: InputChat;
    not?: InputChat;
    in?: InputChat;
    like?: InputChat;
    any?: InputChat;
    order?: InputChat;
    skip?: number;
    take?: number;
    cache?: boolean;
}

export class GroupFindOptions {
    select?: string[];
    relations?: string[];
    where?: InputGroup;
    not?: InputGroup;
    in?: InputGroup;
    like?: InputGroup;
    any?: InputGroup;
    order?: InputGroup;
    skip?: number;
    take?: number;
    cache?: boolean;
}

export class InputChat {
    id?: number;
    groupId?: number;
    group?: InputGroup;
    ownerId?: number;
    message?: string;
    type?: string;
    date?: string;
}

export class InputGroup {
    id?: number;
    ownerId?: number;
    groupName?: string;
    groupImage?: string;
    groupDescription?: string;
    groupType?: GroupType;
    accessType?: AccessType;
    date?: string;
}

export class InputProfile {
    id?: number;
    githubUid?: number;
    githubId?: string;
    lastTokenWeb?: string;
    lastTokenMobile?: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
    createdAt?: string;
    updatedAt?: string;
}

export class ProfileFindOptions {
    select?: string[];
    relations?: string[];
    where?: InputProfile;
    not?: InputProfile;
    in?: InputProfile;
    like?: InputProfile;
    any?: InputProfile;
    order?: InputProfile;
    skip?: number;
    take?: number;
    cache?: boolean;
}

export class Chat {
    id?: number;
    groupId?: number;
    ownerId?: number;
    owner?: Profile;
    message?: string;
    type?: string;
    date?: string;
}

export class Group {
    id?: number;
    ownerId?: number;
    groupName?: string;
    groupDescription?: string;
    groupType?: GroupType;
    accessType?: AccessType;
    groupImage?: string;
    date?: string;
    groupMembers?: GroupMember[];
    chats?: Chat[];
}

export class GroupMember {
    id?: number;
    memberId?: number;
    member?: Profile;
    groupId?: number;
    date?: string;
}

export abstract class IMutation {
    abstract createChat(message?: string, groupId?: number, ownerId?: number, date?: string): Chat | Promise<Chat>;

    abstract updateChat(id: string, message?: string, groupId?: number, ownerId?: number, date?: string): Chat | Promise<Chat>;

    abstract createGroupMember(memberId?: number, groupId?: number, date?: string): GroupMember | Promise<GroupMember>;

    abstract updateGroupMember(id: string, memberId?: number, groupId?: number, date?: string): GroupMember | Promise<GroupMember>;

    abstract createGroup(ownerId: string, groupName?: string, groupDescription?: string, groupImage?: string, groupType?: GroupType, accessType?: AccessType, date?: string): Group | Promise<Group>;

    abstract updateGroup(id: string, ownerId?: string, groupName?: string, groupDescription?: string, groupType?: GroupType, accessType?: AccessType, groupImage?: string, date?: string): Group | Promise<Group>;

    abstract createProfile(githubUid?: number, githubId?: string, lastTokenWeb?: string, lastTokenMobile?: string, name?: string, email?: string, avatarUrl?: string, bio?: string, location?: string, createdAt?: string, updatedAt?: string): Profile | Promise<Profile>;

    abstract updateProfile(id: string, githubUid?: number, githubId?: string, lastTokenWeb?: string, lastTokenMobile?: string, name?: string, email?: string, avatarUrl?: string, bio?: string, location?: string, createdAt?: string, updatedAt?: string): Profile | Promise<Profile>;
}

export class Profile {
    id?: number;
    githubUid?: number;
    githubId?: string;
    lastTokenWeb?: string;
    lastTokenMobile?: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
    createdAt?: string;
    updatedAt?: string;
}

export abstract class IQuery {
    abstract getChats(filters: ChatFindOptions): Chat[] | Promise<Chat[]>;

    abstract chat(id: string): Chat | Promise<Chat>;

    abstract getGroupMember(): GroupMember[] | Promise<GroupMember[]>;

    abstract GroupMember(id: string): GroupMember | Promise<GroupMember>;

    abstract getGroup(filters: GroupFindOptions): Group[] | Promise<Group[]>;

    abstract group(id: string): Group | Promise<Group>;

    abstract getProfile(filters: ProfileFindOptions): Profile[] | Promise<Profile[]>;

    abstract profile(id: string): Profile | Promise<Profile>;
}

export abstract class ISubscription {
    abstract chatRecieved(): Chat | Promise<Chat>;

    abstract GroupMemberRecieved(): GroupMember | Promise<GroupMember>;

    abstract groupRecieved(): Group | Promise<Group>;

    abstract profileRecieved(): Profile | Promise<Profile>;
}
