import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 300;

const useChatStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative'
	},
	header: {
		marginTop: '-72px',
		padding: '8px'
	},
	avatar: {
		margin: 10
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		position: 'relative',
		boxShadow: '0 1px 8px rgba(0,0,0,.3)'
	},
	toolBar: {
		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(2) / 2,
			paddingRight: theme.spacing(2) / 2
		}
	},
	drawerPaper: {
		position: 'relative',
		overflow: 'auto',
		[theme.breakpoints.down('md')]: {
			width: drawerWidth,
			maxWidth: drawerWidth
		},
		height: '100%'
	},
	modal: {
		[theme.breakpoints.down('sm')]: {
			top: '56px'
		},
		[theme.breakpoints.up('sm')]: {
			top: '64px'
		},
		zIndex: 1000,
	},
	backdrop: {
		[theme.breakpoints.down('sm')]: {
			top: '56px'
		},
		[theme.breakpoints.up('sm')]: {
			top: '64px'
		}
	},
	headerLeft: {
		position: 'relative',
		[theme.breakpoints.up('md')]: {
			width: drawerWidth,
			maxWidth: drawerWidth
		},
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth / 2,
			maxWidth: drawerWidth / 2
		},
		[theme.breakpoints.down('sm')]: {
			marginRight: '-40px'
		},
		display: 'flex',
		alignItems: 'center',
		overflow: 'auto',
		height: '100%',
		margin: 10
	},
	wrapper: {
		width: '100%',
		height: 'calc(100vh - 208px)',
		zIndex: 1,
		display: 'flex',
		position: 'relative',
		overflow: 'hidden',
		maxWidth: '100%',
		flexDirection: 'row'
	},
	main: {
		flexGrow: 1,
		height: '100%'
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(2),
		minWidth: 0,
		height: 'calc(100% - 75px)',
		boxSizing: 'border-box',
		flex: 1,
		position: 'relative',
		overflowX: 'hidden',
		overflowY: 'auto'
	},
	conversation: {
		boxSizing: 'border-box',
		width: '100%',
		marginBottom: theme.spacing(2) * 2,
		[theme.breakpoints.down('sm')]: {
			padding: `0 ${theme.spacing(2) * 1}px`
		},
		[theme.breakpoints.up('sm')]: {
			padding: `0 ${theme.spacing(2) * 3}px`
		},
		display: 'flex'
	},
	conversationSent: {
		justifyContent: 'flex-end'
	},
	body: {
		position: 'relative',
		padding: '.625rem 1rem',
		backgroundColor: theme.palette.primary.main,
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[1],
		color: 'white'
	},
	bodyReceived: {
		'top': '10px',
		'&::after': {
			position: 'absolute',
			top: 0,
			width: 0,
			height: 0,
			content: '""',
			border: `5px solid ${theme.palette.primary.main}`,
			borderBottomColor: 'transparent',
			left: '-7px',
			borderLeftColor: 'transparent'
		}
	},
	bodySent: {
		'position': 'relative',
		'backgroundColor': theme.palette.secondary.main,
		'float': 'right',
		'order': 1,
		'&::after': {
			position: 'absolute',
			bottom: 0,
			width: 0,
			height: 0,
			content: '""',
			border: `5px solid ${theme.palette.secondary.main}`,
			borderTopColor: 'transparent',
			borderRightColor: 'transparent',
			right: '-7px'
		}
	},
	date: {
		display: 'block',
		fontSize: '11px',
		paddingTop: '2px',
		fontStyle: 'italic',
		fontWeight: 600,
		color: theme.palette.primary.contrastText
	},
	dateSent: {
		textAlign: 'right'
	},
	input: {
		flex: '1 1 0%',
		marginLeft: 10,
		marginRight: 10,
		boxSizing: 'border-box'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	}
}));

export default useChatStyles;
