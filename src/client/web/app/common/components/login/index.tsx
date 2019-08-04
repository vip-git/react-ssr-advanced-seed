import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
	id: string;
	children: React.ReactNode;
	onClose?: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes } = props;
  return (
		<MuiDialogTitle disableTypography className={classes.root}>
			<Typography
				variant='h6'
				style={{
					textAlign: 'center'
				}}
			>
				{children}
   </Typography>
		</MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface IDialogProps {
	show: boolean;
	content: string;
	title: string;
	handleClose: () => void;
}

class CustomizedDialogs extends React.Component<IDialogProps, {}> {
  render() {
    const { show, handleClose, content, title } = this.props;
    return (
			<div>
				<Dialog
					onClose={handleClose}
					aria-labelledby='customized-dialog-title'
					open={show || false}
				>
					<DialogTitle id='customized-dialog-title'>
						Welcome to React-SSR-Advanced Seed Demo
					</DialogTitle>
					<DialogContent
						dividers
						style={{
							minWidth: 500,
							minHeight: 50,
							display: 'flex',
							justifyContent: 'center',
							alignContent: 'center',
							alignItems: 'center'
						}}
					>
						<Button
							variant='outlined'
							style={{
								margin: 10,
								padding: 10,
								width: 260,
								justifyContent: 'center',
								alignContent: 'center',
								alignItems: 'center',
							}}
						>
							Login with Github
						</Button>
					</DialogContent>
				</Dialog>
			</div>
		);
  }
}

export default CustomizedDialogs;
