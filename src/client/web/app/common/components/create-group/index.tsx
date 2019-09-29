// Library
import React from 'react';
import MaterialForm from '@omega-web-components/material-form';

export default function CreatGroupForm(props) {
    const { groupMembers, onSubmit, closeForm, ownerId, ownerRealId } = props;
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
        let selectedGroupMembers = [];
        try {
            selectedGroupMembers = JSON.parse(value.formData.groupMembers).map(
							val => ({ memberId: val.value })
                        );
            selectedGroupMembers.push({
                memberId: ownerRealId
            });
        }
        catch(err) { 
            selectedGroupMembers.push({
                memberId: ownerRealId
            });
        }
		onSubmit({
			variables: {
				...value.formData,
                ownerId,
                memberId: 0,
				groupType: 'group',
				accessType: 'public',
				groupMembers: selectedGroupMembers,
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
