// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { act } from '@testing-library/react-hooks';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import CreateGroupComponent from '../index';

describe('CreateGroupComponent <CreateGroup />', () => {
	it('CreateGroup Component renders correctly', () => {
		const createGroupComponent = shallow(
			<ThemeProvider theme={theme}>
				<CreateGroupComponent />
			</ThemeProvider>
		);

		// Interaction demo
		expect(createGroupComponent.text()).toEqual('<CreatGroupForm />');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
	it('CreateGroup Component mount correctly', () => {
		const createGroupComponent = mount(
			<ThemeProvider theme={theme}>
				<CreateGroupComponent 
					onSubmit={jest.fn}
				/>
			</ThemeProvider>
		);

		act(() => { 
			(createGroupComponent.find('MaterialForm').first().props() as any).onSubmit({
				formData: {
					groupMembers: '[]'
				}
			});
		});

		// Interaction demo
		expect(createGroupComponent.length).toBeTruthy();
	});
});
