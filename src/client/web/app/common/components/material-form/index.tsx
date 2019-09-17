// Library
import React from 'react';
import MaterialJsonSchemaForm from 'react-jsonschema-form-material-ui';

import './style.scss';

export default class MaterialForm extends React.Component<any, any> {
	onSubmit = (value, callback) => {
		console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
		setTimeout(() => callback && callback(), 2000); // just an example in real world can be your XHR call
	};

	onCancel = () => {
		console.log('on reset being called');
	};

	onFormChanged = ({ formData }) => {
		console.log('onFormChanged: ', formData); // eslint-disable-line no-console
	};

	onUpload = value => {
		console.log('onUpload: ', value); // eslint-disable-line no-console
	};

	render() {
        const { schema, uiSchema, formData } = this.props;
		return (
			<div id={'materialForm'}>
				<MaterialJsonSchemaForm
					schema={schema}
					uiSchema={uiSchema}
					formData={formData}
					onCancel={this.onCancel}
					onSubmit={this.onSubmit}
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
