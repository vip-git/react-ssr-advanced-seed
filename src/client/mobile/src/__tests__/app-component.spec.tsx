import * as React from 'react';
import { shallow } from 'enzyme';

// Mobile
import App from '../App';

describe('App Mobile Component <App />', () => {
	it('App Component Mobile renders correctly', () => {
		const sharedComponentMobile = shallow(<App />);

		// Interaction demo
		expect(sharedComponentMobile.text()).toEqual(
			'<StatusBar /><ScrollViewMock />'
		);

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
});
