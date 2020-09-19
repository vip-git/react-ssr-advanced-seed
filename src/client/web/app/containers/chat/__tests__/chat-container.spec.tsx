// Library
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { mount } from 'enzyme';

// Theme

// Internal
import ChatComponent from '@omega-web-components/chat-box';
import ChatContainer from '@omega-web-containers/chat';

// Redux Model
import { ChatReduxModel } from '@omega-state-machines/chat/chat.redux-model';
import theme from '../../../common/styles';
import { act } from '@testing-library/react-hooks';

interface IState {
	chats: {
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

describe('container <ChatContainer />', () => {
	let wrapper;
	let component;
	let container;

	beforeEach(() => {
		jest.resetAllMocks();

		const store = storeFake({
			chats: ChatReduxModel.attributes
		});

		const mockClient = createMockClient();

		wrapper = mount(
			<ApolloProvider client={mockClient}>
				<ThemeProvider theme={theme}>
					<Provider store={store}>
						<ChatContainer />
					</Provider>
				</ThemeProvider>
			</ApolloProvider>
		);
		container = wrapper.find(ChatContainer);
		component = container.find(ChatComponent);
	});

	it('should render both the container and the component ', () => {
		expect(container.length).toBeTruthy();
		expect(component.length).toBeTruthy();
	});

	it('should map state to props', () => {
		const expectedPropKeys = [
			'SharedComponent',
			'submitChat',
			'onSelectContact',
			'onSelectGroup',
			'readUsersAndChat',
			'submitCreateGroup',
			'githubUserData',
			'groupId',
			'title',
			'chatData',
			'userData',
			'groupData'
		];

		expect(Object.keys(component.props())).toEqual(
			expect.arrayContaining(expectedPropKeys)
		);
	});

	it('should map dispatch to props', () => {
		const expectedPropKeys = [
			'SharedComponent',
			'submitChat',
			'onSelectContact',
			'onSelectGroup',
			'readUsersAndChat',
			'submitCreateGroup',
			'githubUserData',
			'groupId',
			'title',
			'chatData',
			'userData',
			'groupData'
		];

		act(() => {
			component.props().onSelectGroup();
			component.props().onSelectContact();
			component.props().submitCreateGroup();
			component.props().readUsersAndChat();
			component.props().SharedComponent();
			component.props().submitChat();
		});

		expect(Object.keys(component.props())).toEqual(
			expect.arrayContaining(expectedPropKeys)
		);
	});
});
