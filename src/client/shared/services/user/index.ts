// Library
import { from } from 'rxjs';

// Services
import { HttpService } from '../core/http.service';

// Gql
import { userQuery, userSubscription } from './user.gql';

class UserService {
    static getSession() {
        return from(
            HttpService.buildRestApiCall('api', 'GET', '/auth/token', null, {})
        );
    }

    static getAllUsers(payload: any) {
        const { apolloClient, data } = payload;
        return HttpService.buildGraphQLCall(
            apolloClient,
            'subscription',
            { query: userQuery, document: userSubscription },
            data
        );
    }
}

export const UserServiceEngine = {
    requestAllUsers: (payload) => UserService.getAllUsers(payload),
    getSession: () => UserService.getSession()
};
