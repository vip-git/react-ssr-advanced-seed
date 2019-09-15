import React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexWrap: 'wrap'
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200
		},
		dense: {
			marginTop: 19
		},
		menu: {
			width: 200
		}
	})
);

const currencies = [
	{
		value: 'USD',
		label: '$'
	},
	{
		value: 'EUR',
		label: '€'
	},
	{
		value: 'BTC',
		label: '฿'
	},
	{
		value: 'JPY',
		label: '¥'
	}
];

interface State {
	name: string;
	age: string;
	multiline: string;
	currency: string;
}

export default function TextFields() {
	const classes = useStyles({});
	const [values, setValues] = React.useState<State>({
		name: 'Cat in the Hat',
		age: '',
		multiline: 'Controlled',
		currency: 'EUR'
	});

	const handleChange = (name: any) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setValues({ ...values, [name]: event.target.value });
	};

	return (
		<form className={classes.container} noValidate autoComplete='off'>
			<TextField
				id='standard-name'
				label='Group name'
				className={classes.textField}
				value={values.name}
				onChange={handleChange('name')}
				margin='normal'
			/>
			<TextField
				id='standard-uncontrolled'
				label='Group Description'
				defaultValue='foo'
				className={classes.textField}
				margin='normal'
			/>
			<TextField
				required
				id='standard-required'
				label='Group Access Type'
				defaultValue='Hello World'
				className={classes.textField}
				margin='normal'
			/>
			<TextField
				required
				id='standard-required'
				label='Group Members'
				defaultValue='Hello World'
				className={classes.textField}
				margin='normal'
			/>
		</form>
	);
}
