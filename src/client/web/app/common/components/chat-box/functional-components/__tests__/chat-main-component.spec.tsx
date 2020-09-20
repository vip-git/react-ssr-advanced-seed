// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../../styles';

// Web
import { ChatMainComponent } from '../chat-main.component';

const chatMocks = [{
    id: 1245,
    groupId: 1233,
    ownerId: 123,
    owner: {
        id: 123,
        githubId: 'string',
        lastTokenWeb: 'string',
        lastTokenMobile: 'string',
        name: 'string',
        email: 'string',
        avatarUrl: 'string',
        bio: 'string',
        location: 'string',
        createdAt: 'string',
        updatedAt: 'string'
    },
    message: 'new message',
    date: new Date()
}];

describe('ChatMainComponent <ChatMainComponent />', () => {
    it('ChatMain Component renders correctly', () => {
        const chatMainComponent = shallow(
            <ThemeProvider theme={theme}>
                <ChatMainComponent
                    chats={chatMocks}
                    classes={{}}
                    githubUserData={{}}
                    t={jest.fn}
                    renderSubmitChatBox={jest.fn}
                />
            </ThemeProvider>
        );

        // Interaction demo
        expect(chatMainComponent.text()).toEqual(
            '< />'
        );

        // Snapshot demo
        expect(shallow).toMatchSnapshot();
    });
    it('ChatMain Component mounts correctly when props are true', () => {
        const chatMainComponent = mount(
            <ThemeProvider theme={theme}>
                <ChatMainComponent
                    chats={chatMocks}
                    classes={{}}
                    githubUserData={{}}
                    t={jest.fn}
                    renderSubmitChatBox={jest.fn}
                />
            </ThemeProvider>
        );

        expect(chatMainComponent.length).toBeTruthy();
    });
});
