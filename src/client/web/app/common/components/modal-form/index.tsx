// Library
import React from 'react';

// Material UI
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
    const {
			open,
			handleClose,
			modalTitle,
			modalDescription,
			modalContent,
			modalActions
		} = props;
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'>{modalTitle}</DialogTitle>
				<Divider />
				<DialogContent>
					<DialogContentText style={{ marginBottom: 0 }}>
						{modalDescription}
					</DialogContentText>
					{modalContent()}
				</DialogContent>
				<Divider />
				<DialogActions>{modalActions()}</DialogActions>
			</Dialog>
		</div>
	);
}
