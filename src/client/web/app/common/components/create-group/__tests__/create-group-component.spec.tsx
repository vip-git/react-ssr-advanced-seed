// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow } from 'enzyme';

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
});
