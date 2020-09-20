// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import ChatBoxComponent from '../index';

// Shared
import ContentComponent from '../../../../../../shared/components/content';

describe('ChatBoxComponent <ChatBoxComponent />', () => {
	it('ChatBox Component renders correctly', () => {
		const ChatComponentTyped: any = ChatBoxComponent;
		const chatBoxComponent = shallow(
			<ThemeProvider theme={theme}>
				<ChatComponentTyped
					sharedComponent={() => <ContentComponent />}
					submitChat={() => {}}
					onSelectContact={() => {}}
					onSelectGroup={() => {}}
					readUsersAndChat={() => {}}
					submitCreateGroup={() => {}}
					githubUserData={{}}
					groupId={1}
					title={'title'}
					chatData={{}}
					userData={[]}
					groupData={{}}
				/>
			</ThemeProvider>
		);

		// Interaction demo
		expect(chatBoxComponent.text()).toEqual(
			'<Chat />'
		);

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
	it('ChatBox Component mounts correctly when props are true', () => {
		const ChatComponentTyped: any = ChatBoxComponent;
		const chatBoxComponent = mount(
			<ThemeProvider theme={theme}>
				<ChatComponentTyped
					sharedComponent={() => <ContentComponent />}
					submitChat={() => {}}
					onSelectContact={() => {}}
					onSelectGroup={() => {}}
					readUsersAndChat={() => {}}
					submitCreateGroup={() => {}}
					githubUserData={{}}
					groupId={1}
					title={'title'}
					chatData={{}}
					userData={[]}
					groupData={{}}
				/>
			</ThemeProvider>
		);

		expect(chatBoxComponent.length).toBeTruthy();
	});
});
