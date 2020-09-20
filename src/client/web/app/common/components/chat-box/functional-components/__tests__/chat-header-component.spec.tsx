// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../../styles';

// Web
import { ChatHeaderComponent } from '../chat-header.component';
import { act } from '@testing-library/react-hooks';

describe('ChatHeaderComponent <ChatHeaderComponent />', () => {
    it('ChatHeader Component renders correctly', () => {
        const chatHeaderComponent = shallow(
            <ThemeProvider theme={theme}>
                <ChatHeaderComponent
                    classes={{}}
                    t={jest.fn}
                    handleCreateGroup={jest.fn}
                    modalOpen={jest.fn}
                    currentUsername={'currentUsername'}
                    githubUserData={{}}
                    oppositeAvatarUrl={'oppositeAvatarUrl'}
                    oppositeDescription={'oppositeDescription'}
                    oppositeUserName={'oppositeUserName'}
                    createGroupForm={true}
                    settingsForm={false}
                    modalHandleClose={jest.fn}
                    handleDrawerToggle={jest.fn}
                    groupMembers={[]}
                    ownerRealId={123}
                 />
            </ThemeProvider>
        );

        // Interaction demo
        expect(chatHeaderComponent.text()).toEqual(
            '< />'
        );

        // Snapshot demo
        expect(shallow).toMatchSnapshot();
    });
    it('ChatHeader Component mounts correctly when props are true', () => {
        const chatHeaderComponent = mount(
            <ThemeProvider theme={theme}>
                <ChatHeaderComponent
                    classes={{}}
                    t={jest.fn}
                    handleCreateGroup={jest.fn}
                    modalOpen={jest.fn}
                    currentUsername={'currentUsername'}
                    githubUserData={{}}
                    oppositeAvatarUrl={'oppositeAvatarUrl'}
                    oppositeDescription={'oppositeDescription'}
                    oppositeUserName={'oppositeUserName'}
                    createGroupForm={false}
                    settingsForm={true}
                    modalHandleClose={jest.fn}
                    handleDrawerToggle={jest.fn}
                    groupMembers={[]}
                    ownerRealId={123}
                />
            </ThemeProvider>
        );

        act(() => {
            (chatHeaderComponent.find('WithStyles(ForwardRef(IconButton))').first().props() as any).onClick({
                currentTarget: ''
            });
        });
        expect(chatHeaderComponent.length).toBeTruthy();
    });

    it('ChatHeader Component mounts correctly for groups form', () => {
        const chatHeaderComponent = mount(
            <ThemeProvider theme={theme}>
                <ChatHeaderComponent
                    classes={{}}
                    t={jest.fn}
                    handleCreateGroup={jest.fn}
                    modalOpen={jest.fn}
                    currentUsername={'currentUsername'}
                    githubUserData={{}}
                    oppositeAvatarUrl={'oppositeAvatarUrl'}
                    oppositeDescription={'oppositeDescription'}
                    oppositeUserName={'oppositeUserName'}
                    createGroupForm={true}
                    settingsForm={false}
                    modalHandleClose={jest.fn}
                    handleDrawerToggle={jest.fn}
                    groupMembers={[]}
                    ownerRealId={123}
                />
            </ThemeProvider>
        );

        expect(chatHeaderComponent.length).toBeTruthy();
    });
});
