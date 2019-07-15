// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import WrapperComponent from '../index';

describe('WrapperComponent <WrapperComponent />', () => {
	it('Wrapper Component renders correctly', () => {
		const wrapperComponent = shallow(
			<ThemeProvider theme={theme}>
				<WrapperComponent />
			</ThemeProvider>
		);

		// Interaction demo
		expect(wrapperComponent.text()).toEqual('');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
});
