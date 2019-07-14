import * as React from 'react';
import { shallow } from 'enzyme';

// Mobile
import SharedComponentMobile from '../../../shared/components/content';

describe('SharedComponent <SharedComponent />', () => {
	it('Shared Component Mobile renders correctly', () => {
		const sharedComponentMobile = shallow(<SharedComponentMobile />);

		// Interaction demo
		expect(sharedComponentMobile.text()).toEqual('<App />');

		// Snapshot demo
		expect(shallow).toMatchSnapshot();
	});
});
