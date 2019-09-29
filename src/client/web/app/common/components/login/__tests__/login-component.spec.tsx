// Library
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import LoginDialog from '../index';

describe('DialogComponent <LoginDialog />', () => {
	it('Dialog Component renders correctly', () => {
		const dialogComponent = shallow(
			<ThemeProvider theme={theme}>
				<LoginDialog
					show={false}
					content={'test'}
					title={'test'}
					handleLoginClick={() => {}}
				/>
			</ThemeProvider>
		);

		// Interaction demo
		expect(dialogComponent.text()).toEqual('<LoginDialog />');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
	it('LoginDialog Component renders correctly when props are true', () => {
		const dialogComponent = mount(
			<ThemeProvider theme={theme}>
				<LoginDialog
					show={false}
					content={'test'}
					title={'test'}
					handleLoginClick={() => {}}
				/>
			</ThemeProvider>
		);

		expect(dialogComponent.length).toBeTruthy();
	});
});
