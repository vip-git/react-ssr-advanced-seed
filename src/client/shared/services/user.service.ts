// Library
import { from } from 'rxjs';

// Services
import { HttpService } from './core/http.service';

// Contacts
import allUsers from './mocks/contacts';

class UserService {
	static getSession() {
		return from(
			HttpService.buildRestApiCall('api', 'GET', '/auth/token', null, {})
		);
	}

	static getAllUsers() {
		return allUsers;
	}
}

export const UserServiceEngine = {
	requestAllUsers: () => UserService.getAllUsers(),
	getSession: () => UserService.getSession()
};
