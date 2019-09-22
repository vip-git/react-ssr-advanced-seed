// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import TabsComponent from '../index';

describe('TabsComponent <TabsBar />', () => {
	it('TabsBar Component renders correctly', () => {
		const tabsComponent = shallow(
			<ThemeProvider theme={theme}>
				<TabsComponent />
			</ThemeProvider>
		);

		// Interaction demo
		expect(tabsComponent.text()).toEqual('<IconLabelTabs />');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
});
