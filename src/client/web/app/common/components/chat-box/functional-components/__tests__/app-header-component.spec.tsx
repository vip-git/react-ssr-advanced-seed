// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../../styles';

// Web
import { AppHeaderComponent } from '../app-header.component';

describe('AppHeaderComponent <AppHeaderComponent />', () => {
    it('AppHeader Component renders correctly', () => {
        const appHeaderComponent = shallow(
            <ThemeProvider theme={theme}>
                <AppHeaderComponent title={'some title'} />
            </ThemeProvider>
        );

        // Interaction demo
        expect(appHeaderComponent.text()).toEqual(
            '< />'
        );

        // Snapshot demo
        expect(shallow).toMatchSnapshot();
    });
    it('AppHeader Component mounts correctly when props are true', () => {
        const appHeaderComponent = mount(
            <ThemeProvider theme={theme}>
                <AppHeaderComponent title={'some title'} />
            </ThemeProvider>
        );

        expect(appHeaderComponent.length).toBeTruthy();
    });
});
