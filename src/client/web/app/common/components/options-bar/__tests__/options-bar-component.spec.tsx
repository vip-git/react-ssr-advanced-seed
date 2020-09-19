// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import OptionsBarComponent from '../index';
import { act } from '@testing-library/react-hooks';

describe('OptionsBarComponent <OptionsBar />', () => {
	it('OptionsBar Component renders correctly', () => {
		const optionsBarComponent = shallow(
			<ThemeProvider theme={theme}>
				<OptionsBarComponent menuItems={[]} />
			</ThemeProvider>
		);

		// Interaction demo
		expect(optionsBarComponent.text()).toEqual('<OptionsBar />');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});

	it('OptionsBar Component mounts correctly', () => {
		const optionsBarComponent = mount(
			<ThemeProvider theme={theme}>
				<OptionsBarComponent
					menuItems={[
						{
							menuName: 'Create Group',
							callback: () => {}
						},
						{
							menuName: 'Settings',
							callback: () => {}
						},
						{
							menuName: 'Logout',
							callback: () => console.log('called for logout')
						}
					]}
				/>
			</ThemeProvider>
		);

		act(() => {
			(optionsBarComponent.find('WithStyles(ForwardRef(Menu))').props() as any).onClose(() => {});
			(optionsBarComponent.find('WithStyles(ForwardRef(MenuItem))').first().props() as any).onClick(() => {});
		})

		expect(optionsBarComponent.length).toBeTruthy();
	});
});
