// Library
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import LangButtons from '../index';

describe('Lang Buttons <LangButtons />', () => {
	it('Lang Buttons Component renders correctly', () => {
		const settingsComponent = shallow(
			<ThemeProvider theme={theme}>
                <LangButtons 
                    languages={[]} 
                    defaultLanguage={''} 
                    onSetLang={() => {}} 
                />
			</ThemeProvider>
		);

		// Interaction demo
		expect(settingsComponent.text()).toEqual('<LangButtons />');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
	it('Lang Buttons Component mounts correctly', () => {
		const settingsComponent = mount(
			<ThemeProvider theme={theme}>
				<LangButtons languages={[]} defaultLanguage={''} onSetLang={() => {}} />
			</ThemeProvider>
		);

		expect(settingsComponent.length).toBeTruthy();
	});
});
