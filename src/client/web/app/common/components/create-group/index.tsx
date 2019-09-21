// Library
import React from 'react';
import MaterialForm from '@omega-web-components/material-form';

export default function CreatGroupForm(props) {
    const { groupMembers, onSubmit, closeForm, ownerId } = props;
    // Internals
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
                enum: groupMembers
            },
            groupDescription: {
                type: 'string',
                title: 'Group Description'
            },
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
        },
    };

    const initialFormData = {
    };


	const handleCreateGroup = (value) => {
		console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
		onSubmit({
			variables: {
				...value.formData,
				ownerId,
				groupType: 'group',
				accessType: 'public',
				date: new Date()
			},
			callBack: () => closeForm()
		});
    };
    
    return (
        <MaterialForm
            schema={schema}
            uiSchema={uiSchema}
            formData={initialFormData}
            onSubmit={handleCreateGroup}
            submitOnEnter
            activityIndicatorEnabled
        />
    );
}
