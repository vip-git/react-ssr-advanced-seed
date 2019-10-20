/* eslint-env browser */
// Library
import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

interface langProps { 
    languages: any; 
    onSetLang: (langName: string) => void;
    defaultLanguage: string;
}

export default function LangButtons(props: langProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { languages, onSetLang, defaultLanguage } = props;
    const selectedLanguage = languages[defaultLanguage];
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				aria-controls='simple-menu'
				aria-haspopup='true'
				onClick={handleClick}
			>
				<Icon color='primary'>translate</Icon>
				{selectedLanguage && selectedLanguage.name}
			</Button>
			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{languages.map((val: { name: string; value: string }) => (
					<MenuItem onClick={() => onSetLang(val.value)}> val.name </MenuItem>
				))}
			</Menu>
		</div>
	);
}
