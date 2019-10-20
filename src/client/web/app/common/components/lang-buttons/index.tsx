/* eslint-env browser */
// Library
import React from 'react';
import { find } from 'lodash';

// Material UI
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

interface langProps { 
    languages: any; 
    onSetLang: (langName: string, callback: () => void) => void;
    defaultLanguage: string;
}

export default function LangButtons(props: langProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { languages, onSetLang, defaultLanguage } = props;
    const selectedLanguage = find(languages, ['value', defaultLanguage]);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				variant={'outlined'}
				aria-controls='simple-menu'
				aria-haspopup='true'
				onClick={handleClick}
				style={{
					color: 'white',
					borderColor: '#f5f5f5a6'
				}}
			>
				<Icon
					color='primary'
					style={{
						color: 'white',
						fontSize: '1.2em',
						marginRight: 10
					}}
				>
					translate
				</Icon>
				{selectedLanguage && selectedLanguage.name}
			</Button>
			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
			>
				{languages.map((val: { name: string; value: string }) => (
					<MenuItem
						style={{
							paddingLeft: 30,
							paddingRight: 30
						}}
						onClick={() => onSetLang(val.value, handleClose)}
					>
						{val.name}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
