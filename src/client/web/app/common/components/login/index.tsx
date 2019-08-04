// Types
import {
	Theme,
	WithStyles
} from '@material-ui/core/styles';

// Model
import { LoginModel } from './login.model';

const {
	React,
	createStyles, 
	Button,
	Dialog,
	MuiDialogTitle,
	MuiDialogContent,
	withStyles,
	Typography
} = LoginModel.libraries;

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

interface IDialogProps {
	show: boolean;
	content: string;
	title: string;
	handleLoginClick: () => void;
}

class LoginDialog extends React.Component<IDialogProps, {}> {
  render() {
    const { show, handleLoginClick } = this.props;
    return (
			<div>
				<Dialog
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
								alignItems: 'center'
							}}
							onClick={handleLoginClick}
						>
							Login with Github
						</Button>
					</DialogContent>
				</Dialog>
			</div>
		);
  }
}

export default LoginDialog;
