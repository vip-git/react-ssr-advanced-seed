// Library
import React from 'react';
import { act } from '@testing-library/react-hooks';
import { ThemeProvider } from '@material-ui/styles';
import { shallow, mount } from 'enzyme';

// Theme
import theme from '../../../styles';

// Web
import MaterialFormComponent from '../index';

const schema = {
    title: '',
    type: 'object',
    properties: {
        groupName: {
            title: 'Group Name',
            type: 'string'
        },
        groupImage: {
            title: 'Group Image',
            type: 'string'
        },
        groupMembers: {
            type: 'string',
            title: 'Group Members',
            enum: []
        },
        groupDescription: {
            type: 'string',
            title: 'Group Description'
        }
    }
};

const uiSchema = {
    groupName: {
        'ui:title': 'Group Name'
    },
    groupDescription: {
        'ui:widget': 'textarea'
    },
    groupMembers: {
        'ui:widget': 'material-multiselect'
    }
};

const initialFormData = {};

describe('MaterialFormComponent <MaterialForm />', () => {
    it('MaterialForm Component renders correctly', () => {

        const materialFormComponent = shallow(
					<ThemeProvider theme={theme}>
						<MaterialFormComponent
							schema={schema}
							uiSchema={uiSchema}
							formData={initialFormData}
							onSubmit={() => {}}
						/>
					</ThemeProvider>
				);

        // Interaction demo
        expect(materialFormComponent.text()).toEqual('<MaterialForm />');

        // Snapshot demo
        expect(shallow).toMatchSnapshot();
    });

    it('MaterialForm Component mounts correctly', () => {
			const materialFormComponent = mount(
				<ThemeProvider theme={theme}>
					<MaterialFormComponent
						schema={schema}
						uiSchema={uiSchema}
						formData={initialFormData}
						onSubmit={() => {}}
					/>
				</ThemeProvider>
			);

            act(() => {
                (materialFormComponent.find('WithStyles(Form)').props() as any).onChange({});
                (materialFormComponent.find('WithStyles(Form)').props() as any).onCancel({});
                (materialFormComponent.find('WithStyles(Form)').props() as any).onUpload({});
            });

            // Interaction demo
			expect(materialFormComponent.length).toBeTruthy();
		});
});
