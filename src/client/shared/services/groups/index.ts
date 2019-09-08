// Library
import { of } from 'rxjs';

// Services
import { HttpService } from '../core/http.service';

// Gql
import { groupQuery, groupSubscription } from './groups.gql';

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
                prev.getGroup[0].groups.push(groupRecieved);
                return { ...prev };
            }
        );
    }
}

export const GroupServiceEngine = {
    requestAllGroups: action => GroupService.getAllGroups(action),
};
