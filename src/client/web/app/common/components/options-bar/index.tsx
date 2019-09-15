// Library
import React from 'react';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface MenuObj {
	menuName: string; 
	callback: () => void
}

interface Options {
	menuItems: Array<MenuObj>;
}

export default function OptionsBar(props: Options) {
	const { menuItems } = props;
	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose(callback: () => void) {
		if (callback && typeof callback === 'function') {
			callback();
		}
		setAnchorEl(null);
	}
	return (
		<div>
			<IconButton
				color='inherit'
				aria-controls='simple-menu'
				aria-haspopup='true'
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{menuItems.map((menuVal: MenuObj) => (
					<MenuItem
						onClick={() => handleClose(menuVal.callback)}
						key={`menu-name-${menuVal.menuName}`}
					>
						{menuVal.menuName}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
