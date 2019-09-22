// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import OptionsBarComponent from '../index';

describe('OptionsBarComponent <OptionsBar />', () => {
	it('OptionsBar Component renders correctly', () => {
		const optionsBarComponent = shallow(
			<ThemeProvider theme={theme}>
				<OptionsBarComponent />
			</ThemeProvider>
		);

		// Interaction demo
		expect(optionsBarComponent.text()).toEqual('<FormDialog />');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
});
