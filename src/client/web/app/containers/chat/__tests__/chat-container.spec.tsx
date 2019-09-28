import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
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

const mocks = [
	{
		request: {
			query: GET_DOG_QUERY,
			variables: {
				name: 'Buck'
			}
		},
		result: {
			data: {
				dog: { id: '1', name: 'Buck', breed: 'bulldog' }
			}
		}
	}
];

describe('container <ChatContainer />', () => {
	let wrapper;
	let component;
	let container;

	beforeEach(() => {
		jest.resetAllMocks();

		const store = storeFake({
			chats: ChatReduxModel.attributes
		});

		wrapper = mount(
			<MockedProvider mocks={mocks} addTypename={false}>
				<ThemeProvider theme={theme}>
					<Provider store={store}>
						<ChatContainer />
					</Provider>
				</ThemeProvider>
			</MockedProvider>
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
			'sharedComponent',
			'title',
			'chatData',
			'userData'
		];

		expect(Object.keys(component.props())).toEqual(
			expect.arrayContaining(expectedPropKeys)
		);
	});

	it('should map dispatch to props', () => {
		const expectedPropKeys = [
			'sharedComponent',
			'title',
			'chatData',
			'userData'
		];

		expect(Object.keys(component.props())).toEqual(
			expect.arrayContaining(expectedPropKeys)
		);
	});
});
