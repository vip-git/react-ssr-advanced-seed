// Library
import React from 'react';
import MaterialJsonSchemaForm from 'react-jsonschema-form-material-ui';

import './style.scss';

export default class MaterialForm extends React.Component<any, any> {
	onCancel = () => {
		console.log('on reset being called');
	};

	onFormChanged = ({ formData }) => {
		// console.log('onFormChanged: ', formData); // eslint-disable-line no-console
		return formData;
	};

	onUpload = value => {
		console.log('onUpload: ', value); // eslint-disable-line no-console
	};

	render() {
        const { schema, uiSchema, formData, onSubmit } = this.props;
		return (
			<div id={'materialForm'}>
				<MaterialJsonSchemaForm
					schema={schema}
					uiSchema={uiSchema}
					formData={formData}
					onCancel={this.onCancel}
					onSubmit={onSubmit}
					onUpload={this.onUpload}
					onChange={this.onFormChanged}
					submitValue={'Save'}
					prefixId={'react-ssr'}
					submitOnEnter
					activityIndicatorEnabled
				/>
			</div>
		);
	}
}
