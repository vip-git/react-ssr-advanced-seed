// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

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

	it('TabsBar Component mounts correctly', () => {
		const tabsComponent = mount(
			<ThemeProvider theme={theme}>
				<TabsComponent
					tabs={[
						{
							icon: <span> </span>,
							tabName: 'All Users',
							tabContent: () => <div> </div>
						},
						{
							icon: <span> </span>,
							tabName: 'All Groups',
							tabContent: () => <div> </div>
						}
					]}
				/>
			</ThemeProvider>
		);

		expect(tabsComponent.length).toBeTruthy();
	});
});
