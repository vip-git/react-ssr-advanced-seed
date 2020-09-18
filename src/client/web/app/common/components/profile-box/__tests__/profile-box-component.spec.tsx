// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import ProfileBoxComponent from '../index';

describe('ProfileBoxComponent <ProfileBoxComponent />', () => {
    it('ChatBox Component renders correctly', () => {
        const ProfileComponentTyped: any = ProfileBoxComponent;
        const chatBoxComponent = shallow(
            <ThemeProvider theme={theme}>
                <ProfileComponentTyped  />
            </ThemeProvider>
        );

        // Interaction demo
        expect(chatBoxComponent.text()).toEqual(
            '<ProfileBox />'
        );

        // Snapshot demo
        expect(shallow).toMatchSnapshot();
    });
    it('ChatBox Component mounts correctly when props are true', () => {
        const ProfileComponentTyped: any = ProfileBoxComponent;
        const chatBoxComponent = mount(
            <ThemeProvider theme={theme}>
                <ProfileComponentTyped />
            </ThemeProvider>
        );

        expect(chatBoxComponent.length).toBeTruthy();
    });
});
