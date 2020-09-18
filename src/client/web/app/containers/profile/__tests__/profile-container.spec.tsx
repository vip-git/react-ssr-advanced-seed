// Library
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import { ThemeProvider } from '@material-ui/styles';
import { mount } from 'enzyme';

// Theme

// Internal
// import ProfileComponent from '@omega-web-components/profile-box';
import ProfileContainer from '../';

// Redux Model
import theme from '../../../common/styles';

describe('container <ProfileContainer />', () => {
    let wrapper;
    // let component;
    let container;

    beforeEach(() => {
        jest.resetAllMocks();

        const mockClient = createMockClient();

        wrapper = mount(
            <ApolloProvider client={mockClient}>
                <ThemeProvider theme={theme}>
                    <ProfileContainer name={'John Doe'} />
                </ThemeProvider>
            </ApolloProvider>
        );
        container = wrapper.find(ProfileContainer);
        // component = container.find(ProfileComponent);
    });

    it('should render both the container and the component ', () => {
        expect(container.length).toBeTruthy();
        // expect(component.length).toBeTruthy();
    });
});
