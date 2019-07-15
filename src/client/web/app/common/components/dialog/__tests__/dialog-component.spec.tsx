// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import DialogComponent from '../index';

describe('DialogComponent <DialogComponent />', () => {
	it('Dialog Component renders correctly', () => {
		const dialogComponent = shallow(
			<ThemeProvider theme={theme}>
				<DialogComponent
					show={false}
					content={'test'}
					title={'test'}
					handleClose={() => {}}
				/>
			</ThemeProvider>
		);

		// Interaction demo
		expect(dialogComponent.text()).toEqual('<CustomizedDialogs />');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
	it('Dialog Component renders correctly when props are true', () => {
		const dialogComponent = mount(
			<ThemeProvider theme={theme}>
				<DialogComponent
					show={true}
					content={'test'}
					title={'test'}
					handleClose={() => {}}
				/>
			</ThemeProvider>
		);

		expect(dialogComponent.length).toBeTruthy();
	});
});
