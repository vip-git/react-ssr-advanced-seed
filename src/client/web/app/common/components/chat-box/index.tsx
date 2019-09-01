// Model
import { ChatBoxModel } from './chat-box.model';

// Interfaces
import { IChatProps, IChatState, IContact, IChat } from './types';

// Internals
const {
	withStyles,
	AppBar,
	Toolbar,
	Grid,
	Card,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	Avatar,
	Divider,
	TextField,
	Hidden,
	Button,
	IconButton,
	MenuIcon,
	MoreVertIcon,
	SendIcon
} = ChatBoxModel.uiFrameworkComponents;
const {
	React,
	Component,
	classNames,
	distanceInWordsToNow,
	i18next,
	withTranslation,
} = ChatBoxModel.libraries;
const { Wrapper } = ChatBoxModel.components;
const { ChatStyles } = ChatBoxModel.styles;
const face1 = require('@omega-core/assets/images/face1.jpg');

class Chat extends Component<IChatProps, IChatState> {
	state = {
		opened: false,
		currentChat: ''
	};

	componentDidMount() {
		i18next.addResourceBundle(
			'en-US',
			'translation',
			ChatBoxModel.i18nKeys['en-US']
		);
		i18next.addResourceBundle(
			'de-DE',
			'translation',
			ChatBoxModel.i18nKeys['de-DE']
		);
		this.props.readUsersAndChat();
	}

	handleDrawerToggle = () => {
		this.setState({ opened: !this.state.opened });
	};

	scrollToBottomChat = () => {
		if (typeof window !== 'undefined') {
			setTimeout(() => {
				const objDiv = document.getElementById('chats');
				objDiv.scrollTop = objDiv.scrollHeight;
			}, 1);
		}
	};

	sendChat = () =>
		this.state.currentChat !== '' &&
		this.props.submitChat({
			variables: {
				ownerId: this.props.githubUserData.id,
				groupId: this.props.groupId,
				message: this.state.currentChat,
				date: new Date().toISOString()
			},
			callBack: () => this.setState({ currentChat: '' })
		});

	handleKeyDown = e => {
		if (e.key === 'Enter') {
			this.sendChat();
		}
	};

	render() {
		const {
			classes,
			chatData,
			userData,
			SharedComponent,
			t,
			githubUserData
		} = this.props;
		const { opened } = this.state;
		const currentUsername =
			githubUserData.name.indexOf(' ') === -1
				? githubUserData.name
				: githubUserData.name.split(' ')[0];
		const menu = (
			<List
				subheader={
					<ListSubheader disableSticky>
						{t('chatbox-previous-chat')}
					</ListSubheader>
				}
			>
				{userData.map((contact: IContact, index) => (
					<ListItem key={`ListItem-${contact.id}`} button>
						<Avatar alt='' src={contact.avatar} className={classes.avatar} />
						<ListItemText primary={contact.name} secondary={contact.status} />
					</ListItem>
				))}
			</List>
		);
		this.scrollToBottomChat();
		return (
			<Wrapper padding={false}>
				<AppBar position='static'>
					<Toolbar>
						<Typography
							variant='h6'
							color='inherit'
							style={{ margin: '0 auto' }}
						>
							{this.props.title}
						</Typography>
					</Toolbar>
					<Toolbar />
				</AppBar>

				<Grid
					container
					spacing={0}
					justify={'center'}
					className={classes.header}
				>
					<Grid item xs={11} sm={11} md={10} lg={9}>
						<Card>
							<div className={classes.root}>
								<AppBar
									position='absolute'
									className={classes.appBar}
									color='default'
								>
									<Toolbar className={classes.toolBar}>
										<Hidden mdUp>
											<IconButton
												color='inherit'
												aria-label='open drawer'
												onClick={() => this.handleDrawerToggle()}
											>
												<MenuIcon />
											</IconButton>
										</Hidden>
										<div
											className={classes.headerLeft}
											style={{ width: '100%', maxWidth: '100%' }}
										>
											<Avatar alt='' src={face1} className={classes.avatar} />
											<ListItemText primary='Robert' secondary='Online' />
										</div>
										<List dense>
											<ListItem>
												<Avatar
													alt=''
													src={githubUserData.avatar_url}
													className={classes.avatar}
												/>
												<ListItemText
													primary={currentUsername}
													secondary='Online'
												/>
											</ListItem>
										</List>
										<span className='flexSpacer' />
										<IconButton color='inherit'>
											<MoreVertIcon />
										</IconButton>
									</Toolbar>
								</AppBar>
								<div className={classes.wrapper}>
									<Hidden smDown>
										<Drawer
											variant='permanent'
											ModalProps={{
												keepMounted: false,
												className: classes.modal,
												BackdropProps: {
													className: classes.backdrop
												},
												onBackdropClick: this.handleDrawerToggle
											}}
											classes={{
												paper: classes.drawerPaper
											}}
										>
											{menu}
											<SharedComponent />
										</Drawer>
									</Hidden>
									<Hidden mdUp>
										<Drawer
											variant='temporary'
											open={opened}
											ModalProps={{
												keepMounted: false,
												className: classes.modal,
												BackdropProps: {
													className: classes.backdrop
												},
												onBackdropClick: this.handleDrawerToggle
											}}
											classes={{
												paper: classes.drawerPaper
											}}
										>
											{menu}
										</Drawer>
									</Hidden>
									<main className={classes.main}>
										<div id={'chats'} className={classes.content}>
											{chatData.map((chat: IChat, index) => (
												<div
													key={`ChatItem-${chat.id}`}
													className={classNames(
														classes.conversation,
														chat.ownerId === 1
															? classes.conversationSent
															: classes.conversationReceived
													)}
												>
													<Avatar
														alt=''
														src={face1}
														style={{
															marginRight: 10,
															display: chat.ownerId === 1 ? 'none' : 'block'
														}}
													/>
													<div
														className={classNames(
															classes.body,
															chat.ownerId === 1
																? classes.bodySent
																: classes.bodyReceived
														)}
													>
														<Typography color='inherit'>
															{chat.message}
														</Typography>
														<Typography
															variant='caption'
															className={classNames(
																classes.date,
																chat.ownerId === 1
																	? classes.dateSent
																	: classes.dateReceived
															)}
														>
															{' '}
															{distanceInWordsToNow(chat.date)}
														</Typography>
													</div>
													<Avatar
														alt=''
														src={githubUserData.avatar_url}
														style={{
															float: 'right',
															order: 2,
															marginLeft: 10,
															top: 25,
															display: chat.ownerId === 1 ? 'block' : 'none'
														}}
													/>
												</div>
											))}
										</div>
										<Divider />
										<div className='px-2'>
											<Grid
												container
												spacing={0}
												justify={'center'}
												alignItems={'center'}
											>
												<TextField
													label='Write a message'
													type='text'
													margin='normal'
													value={this.state.currentChat}
													onChange={(e: any) =>
														this.setState({ currentChat: e.target.value })
													}
													onKeyDown={this.handleKeyDown}
													className={classes.input}
												/>
												<Button
													onClick={() => this.sendChat()}
													disabled={this.state.currentChat.length === 0}
													variant='contained'
													color='primary'
													aria-label='send'
													style={{ marginRight: 10 }}
													className={classes.button}
												>
													<SendIcon />
												</Button>
											</Grid>
										</div>
									</main>
								</div>
							</div>
						</Card>
					</Grid>
				</Grid>
			</Wrapper>
		);
	}
}

export default withStyles(ChatStyles as any)(withTranslation()(Chat as any));
