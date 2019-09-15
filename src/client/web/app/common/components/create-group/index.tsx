// Library
import React from 'react';
import MaterialForm from '@omega-web-components/material-form';

export default function CreatGroupForm(props) {
    // Internals
    const schema = {
        title: '',
        type: 'object',
        required: ['groupName', 'groupDescription'],
        properties: {
            groupName: {
                type: 'string',
                title: 'Group Name'
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
            'ui:autofocus': true,
            'ui:emptyValue': ''
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
            submitOnEnter
            activityIndicatorEnabled
        />
    );
}
