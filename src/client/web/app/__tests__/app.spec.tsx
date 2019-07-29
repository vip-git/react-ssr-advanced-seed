import React from 'react';
import { createBrowserHistory as createHistory } from 'history';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import IntlProvider from '../common/i18n/IntlProvider';
import { ConnectedRouter as Router } from 'connected-react-router';
import { mount } from 'enzyme';

// Theme
import theme from '../common/styles';

// Internal
import ChatContainer from '@omega-web-containers/chat';
import App from '../App';

const browserHistory =
	((window as any) && (window as any).browserHistory) || createHistory();

interface IState {
	app: {
		locale: string;
	};
	router: {
		location: {
			pathname: string;
			search: string;
			hash: string;
			key: string;
		};
		action: string;
	};
	chats: {
		currentUsers: {
			id: string;
			name: string;
			status: string;
			avatar: string;
		};
		currentChat: any;
		chatData: any[];
		userData: any[];
	};
}

const storeFake = (state: IState) => ({
	default: jest.fn(),
	subscribe: jest.fn(),
	dispatch: jest.fn(),
	getState: () => state
});

describe('app <App />', () => {
	let wrapper;
	let container;
	let app;

	beforeEach(() => {
		jest.resetAllMocks();

		const store = storeFake({
			app: {
				locale: 'en-US'
			},
			router: {
				location: {
					pathname: '/',
					search: '',
					hash: '',
					key: 'kxyuvd'
				},
				action: 'POP'
			},
			chats: {
				currentUsers: {
					id: '',
					name: '',
					status: '',
					avatar: ''
				},
				currentChat: {
					text: '',
					type: '',
					date: ''
				},
				chatData: [],
				userData: []
			}
		});

		wrapper = mount(
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<Router history={browserHistory}>
						<IntlProvider>
							<App />
						</IntlProvider>
					</Router>
				</Provider>
			</ThemeProvider>
		);
		app = wrapper.find(App);
		container = app.find(ChatContainer);
	});

	it('should render both the app and the app ', () => {
		expect(app.length).toBeTruthy();
		expect(container.length).toBeTruthy();
	});

	it('should map state to props', () => {
		const expectedPropKeys = ['title'];

		expect(Object.keys(container.props())).toEqual(
			expect.arrayContaining(expectedPropKeys)
		);
	});

	it('should map dispatch to props', () => {
		const expectedPropKeys = ['title'];

		expect(Object.keys(container.props())).toEqual(
			expect.arrayContaining(expectedPropKeys)
		);
	});
});
