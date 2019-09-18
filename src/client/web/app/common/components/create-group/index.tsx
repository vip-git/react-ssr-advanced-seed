// Library
import React from 'react';
import MaterialForm from '@omega-web-components/material-form';

export default function CreatGroupForm(props) {
    const { onSubmit } = props;
    // Internals
    const schema = {
        title: '',
        type: 'object',
        properties: {
            groupName: {
                title: 'Group Name',
                type: 'string'
            },
            groupMembers: {
                type: 'string',
                title: 'Group Members',
                enum: ['Yes', 'No']
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

    return (
        <MaterialForm
            schema={schema}
            uiSchema={uiSchema}
            formData={initialFormData}
            onSubmit={onSubmit}
            submitOnEnter
            activityIndicatorEnabled
        />
    );
}
