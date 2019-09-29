// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import SettingsComponent from '../index';

describe('Settings <SettingsComponent />', () => {
	it('Settings Component renders correctly', () => {
		const settingsComponent = shallow(
			<ThemeProvider theme={theme}>
				<SettingsComponent />
			</ThemeProvider>
		);

		// Interaction demo
		expect(settingsComponent.text()).toEqual('<TextFields />');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
	it('Settings Component mounts correctly', () => {
		const settingsComponent = mount(
			<ThemeProvider theme={theme}>
				<SettingsComponent />
			</ThemeProvider>
		);

		expect(settingsComponent.length).toBeTruthy();
	});
});
