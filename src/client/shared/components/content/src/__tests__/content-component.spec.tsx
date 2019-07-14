import * as React from 'react';
import { View, Text } from 'react-native-web';
import { shallow } from 'enzyme';
// Web
import SharedComponentWeb from '../index';

// Common
import ChildComponent from '../render-app';

describe('SharedComponent <SharedComponent />', () => {
	it('Shared Component Web renders correctly', () => {
		const sharedComponentWeb = shallow(<SharedComponentWeb />);

		// Interaction demo
		expect(sharedComponentWeb.text()).toEqual('<App />');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
	it('Shared Component renders child component correctly', () => {
		const childComponent = shallow(<ChildComponent api={{ View, Text }} />);

		// Interaction demo
		expect(childComponent.text()).toEqual('<View />');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
});
