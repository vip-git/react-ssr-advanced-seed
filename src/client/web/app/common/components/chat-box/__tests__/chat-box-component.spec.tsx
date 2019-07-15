// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// mocks
import {
	mockChats,
	mockContacts
} from '../../../../../../shared/services/mocks/index';

// Theme
import theme from '../../../styles';

// Web
import ChatBoxComponent from '../index';

// Shared
import ContentComponent from '../../../../../../shared/components/content';

describe('ChatBoxComponent <ChatBoxComponent />', () => {
	it('ChatBox Component renders correctly', () => {
		const chatBoxComponent = shallow(
			<ThemeProvider theme={theme}>
				<ChatBoxComponent
					sharedComponent={() => <ContentComponent />}
					title={'Test Me'}
					defaultChats={mockChats}
					defaultUsers={mockContacts}
				/>
			</ThemeProvider>
		);

		// Interaction demo
		expect(chatBoxComponent.text()).toEqual('');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
	it('ChatBox Component renders correctly when props are true', () => {
		const chatBoxComponent = mount(
			<ThemeProvider theme={theme}>
				<ChatBoxComponent
					sharedComponent={() => <ContentComponent />}
					title={'Test Me'}
					defaultChats={mockChats}
					defaultUsers={mockContacts}
				/>
			</ThemeProvider>
		);

		expect(chatBoxComponent.length).toBeTruthy();
	});
});
