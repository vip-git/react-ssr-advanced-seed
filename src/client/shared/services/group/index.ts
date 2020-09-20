// Services
import { HttpService } from '../core/http.service';

// Gql
import { 
    groupQuery, 
    groupSubscription, 
    createGroupMutation,
    updateGroupMutation,
    removeGroupMutation
} from './group.gql';

export interface Payload {
    apolloClient: {};
    data: {};
    accessToken: string;
}

class GroupService {
    static getGroupsRest(payload: Payload) {
        return HttpService.buildRestApiCall('api', 'GET', '/group', payload.accessToken, {})
    }

    static getAllGroups(payload: Payload) {
        const { apolloClient, data } = payload;
        return HttpService.buildGraphQLCall(
            apolloClient,
            'subscription',
            { query: groupQuery, document: groupSubscription },
            data,
            (prev, { subscriptionData }): any => {
                // Perform updates on previousResult with subscriptionData
                if (!subscriptionData.data) return prev;
                const { groupRecieved } = subscriptionData.data;
                prev.getGroup.push(groupRecieved);
                return { ...prev };
            }
        );
    }

    static createGroup(payload: Payload) {
        const { apolloClient, data } = payload;
        return HttpService.buildGraphQLCall(
            apolloClient,
            'mutation',
            createGroupMutation,
            data
        );
    }

    static updateGroup(payload: Payload) {
        const { apolloClient, data } = payload;
        return HttpService.buildGraphQLCall(
            apolloClient,
            'mutation',
            updateGroupMutation,
            data
        );
    }

    static removeGroup(payload: Payload) {
        const { apolloClient, data } = payload;
        return HttpService.buildGraphQLCall(
            apolloClient,
            'mutation',
            removeGroupMutation,
            data
        );
    }
}

export const GroupServiceEngine = {
    requestAllGroupsRest: action => GroupService.getGroupsRest(action),
    requestAllGroups: action => GroupService.getAllGroups(action),
    createGroup: action => GroupService.createGroup(action),
    updateGroup: action => GroupService.updateGroup(action),
    removeGroup: action => GroupService.removeGroup(action),
};
