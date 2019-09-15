// Library
import React from 'react';
import MaterialForm from '@omega-web-components/material-form';

export default function CreatGroupForm(props) {
    // Internals
    const schema = {
        title: 'A registration form',
        description: 'A simple form example.',
        type: 'object',
        required: ['firstName', 'lastName'],
        properties: {
            firstName: {
                type: 'string',
                title: 'First name'
            },
            lastName: {
                type: 'string',
                title: 'Last name'
            },
            age: {
                type: 'integer',
                title: 'Age'
            },
            upload: {
                type: 'upload',
                title: 'Please upload your file'
            },
            creatableSelectTest: {
                type: 'string',
                title: 'Example creatable select',
                enum: ['test', 'teete', 'etetet']
            },
            select: {
                type: 'string',
                title: 'Example select',
                enum: ['Yes', 'No']
            },
            selectTest: {
                type: 'string',
                title: 'Example Multi Select',
                enum: ['Yes', 'No']
            },
            bio: {
                type: 'string',
                title: 'Bio'
            },
            date: {
                type: 'material-date',
                title: 'Date'
            },
            password: {
                type: 'string',
                title: 'Password',
                minLength: 3
            },
            telephone: {
                type: 'string',
                title: 'Telephone',
                minLength: 10
            }
        }
    };

    const uiSchema = {
        firstName: {
            'ui:autofocus': true,
            'ui:emptyValue': ''
        },
        age: {
            'ui:widget': 'updown',
            'ui:title': 'Age of person',
            'ui:description': '(earthian year)'
        },
        upload: {
            'ui:widget': 'outlined',
            'ui:accept': 'image/*',
            'ui:isMulti': true,
            'ui:buttonTitle': 'Upload',
            'ui:icon': 'add_circle'
        },
        bio: {
            'ui:widget': 'textarea',
            'ui:options': 'rich-text-editor'
        },
        password: {
            'ui:widget': 'password',
            'ui:help': 'Hint: Make it strong!'
        },
        date: {
            'ui:activeCompColor': 'red',
            'ui:widget': 'alt-datetime'
        },
        selectTest: {
            'ui:widget': 'material-multiselect'
        },
        creatableSelectTest: {
            'ui:widget': 'creatable-select'
        },
        telephone: {
            'ui:options': {
                inputType: 'tel'
            }
        }
    };

    const initialFormData = {
        firstName: 'Chuck',
        lastName: 'Norris',
        age: 75,
        upload: '',
        bio: '<p><u>ads</u></p>',
        password: 'noneed',
        creatableSelectTest:
            '[{"label":"hello","value":"hello"},{"label":"yes","value":"yes"}]',
        selectTest: '[{"value":"Yes","label":"Yes"},{"value":"No","label":"No"}]',
        telephone: ''
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
