/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
// Model
import { ChatBoxModel } from './chat-box.model';

// Interfaces
import { IChatProps, IChatState, IContact, IChat } from './types';

import './style.scss';

// Internals
const {
	withWidth,
	isWidthUp,
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
	Avatar,
	Divider,
	TextField,
	Hidden,
	Button,
	IconButton,
	MenuIcon,
	SendIcon,
	AccountCircleIcon,
	GroupWorkIcon
} = ChatBoxModel.uiFrameworkComponents;
const {
	React,
	Component,
	classNames,
	distanceInWordsToNow,
	i18next,
	SplitPane,
	withTranslation,
	reject,
	find
} = ChatBoxModel.libraries;
const { Wrapper, OptionsBar, ModalForm, Tabs, CreateGroupForm, SettingsForm } = ChatBoxModel.components;
const { ChatStyles } = ChatBoxModel.styles;

type iModalForm = 'createGroupForm' | 'settingsForm';

class Chat extends Component<IChatProps, IChatState> {
	state = {
		opened: false,
		currentChat: '',
		createGroupForm: false,
		settingsForm: false,
	};

	componentDidMount() {
		const { i18nKeys } = ChatBoxModel;
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
		i18next.addResourceBundle(
			'fr-FR',
			'translation',
			ChatBoxModel.i18nKeys['fr-FR']
		);
		this.props.readUsersAndChat();
	}

	handleDrawerToggle = () => {
		this.setState({ opened: !this.state.opened });
	};

	scrollToBottomChat = () => {
		if (typeof window !== 'undefined') {
			setTimeout(() => {
				const objDiv =
					typeof document !== 'undefined' && document.getElementById('chats');
				objDiv.scrollTop = objDiv.scrollHeight;
			}, 1);
		}
	};

	modalOpen = (modalForm: iModalForm) => this.setState({ [modalForm]: true });

	modalHandleClose = (modalForm: iModalForm) => this.setState({ [modalForm]: false });

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

	renderSubmitChatBox = () => {
		const {
			classes,
			chatData: { groupMembers },
			githubUserData
		} = this.props;
		const groupMemberData = find(groupMembers, [
			'member.githubUid',
			githubUserData.id
		]);
		return groupMemberData ? (
			<div className='px-2'>
				<Grid container spacing={0} justify={'center'} alignItems={'center'}>
					<TextField
						label='Write a message'
						type='text'
						margin='normal'
						value={this.state.currentChat}
						onChange={(e: any) =>
							this.setState({ currentChat: e.target.value })}
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
		) : (
			<div className='px-2'>
				<Grid container spacing={0} justify={'center'} alignItems={'center'}>
					<Typography style={{ marginTop: 20 }}>
						You are not part of this group - Click here to Join
					</Typography>
				</Grid>
			</div>
		);
	};

	render() {
		const {
			classes,
			chatData: {
				chats,
				groupMembers,
				groupName,
				groupDescription,
				groupImage
			},
			userData,
			groupData,
			SharedComponent,
			t,
			githubUserData
		} = this.props;
		const { opened } = this.state;
		const currentUsername =
			githubUserData.name && githubUserData.name.indexOf(' ') === -1
				? githubUserData.name
				: (githubUserData.name && githubUserData.name.split(' ')[0]) ||
				  githubUserData.login;
		const groupMemberData = reject(groupMembers, [
			'member.githubUid',
			githubUserData.id
		]);
		const oppositeAvatarUrl =
			groupMemberData.length === 1
				? groupMemberData[0].member.avatarUrl
				: groupImage;
		const oppositeUserName =
			groupMemberData.length === 1 ? groupMemberData[0].member.name : groupName;
		const oppositeDescription =
			groupMemberData.length === 1 ? 'Online' : groupDescription;
		const menu = (
			<Tabs
				tabs={[
					{
						icon: <AccountCircleIcon />,
						tabName: t('chatbox-all-users'),
						tabContent: () => (
							<List>
								{userData.map((contact: IContact, index) => (
									<ListItem key={`ListItem-${contact.id}`} button>
										<Avatar
											alt=''
											src={contact.avatar}
											className={classes.avatar}
										/>
										<ListItemText
											primary={contact.name || contact.githubId}
											secondary={contact.status || contact.bio}
										/>
									</ListItem>
								))}
							</List>
						)
					},
					{
						icon: <GroupWorkIcon />,
						tabName: t('chatbox-all-groups'),
						tabContent: () => (
							<List>
								{groupData.map((groupVal: any, index) => (
									<ListItem key={`ListItem-${groupVal.id}`} button>
										<Avatar
											alt=''
											src={groupVal.groupImage}
											className={classes.avatar}
										/>
										<ListItemText
											primary={groupVal.groupName}
											secondary={groupVal.groupDescription}
										/>
									</ListItem>
								))}
							</List>
						)
					}
				]}
			/>
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
											<Avatar
												alt=''
												src={oppositeAvatarUrl}
												className={classes.avatar}
											/>
											<ListItemText
												primary={oppositeUserName}
												secondary={oppositeDescription}
											/>
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
										<OptionsBar
											menuItems={[
												{
													menuName: 'Create Group',
													callback: () => this.modalOpen('createGroupForm')
												},
												{
													menuName: 'Settings',
													callback: () => this.modalOpen('settingsForm')
												},
												{
													menuName: 'Logout',
													callback: () => console.log('called for logout')
												}
											]}
										/>
										<ModalForm
											open={this.state.createGroupForm}
											modalTitle={t('create-group-title')}
											modalDescription={t('create-group-description')}
											modalContent={() => <CreateGroupForm />}
											modalActions={() => {
												return (
													<Button
														color='primary'
														onClick={() =>
															this.modalHandleClose('createGroupForm')}
													>
														Create
													</Button>
												);
											}}
											handleClose={() =>
												this.modalHandleClose('createGroupForm')}
										/>
										<ModalForm
											open={this.state.settingsForm}
											modalTitle={t('settings-title')}
											modalDescription={t('settings-description')}
											modalContent={() => <SettingsForm />}
											modalActions={() => {
												return (
													<Button
														color='primary'
														onClick={() =>
															this.modalHandleClose('settingsForm')}
													>
														Create
													</Button>
												);
											}}
											handleClose={() => this.modalHandleClose('settingsForm')}
										/>
									</Toolbar>
								</AppBar>
								<div className={classes.wrapper}>
									<SplitPane
										split='vertical'
										defaultSize={isWidthUp('md', this.props.width) ? '27%' : 0}
										minSize={isWidthUp('md', this.props.width) ? 300 : 0}
										maxSize={
											isWidthUp('md', this.props.width)
												? window.innerWidth / 4
												: 0
										}
										allowResize={isWidthUp('md', this.props.width)}
									>
										<div
											style={{
												height: '100%'
											}}
										>
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
													style={{
														height: '100%'
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
													style={{
														height: '100%'
													}}
												>
													{menu}
												</Drawer>
											</Hidden>
										</div>
										<div
											style={{
												height: '100%'
											}}
										>
											<main className={classes.main}>
												<div id={'chats'} className={classes.content}>
													{chats &&
														chats.map((chat: IChat, index) => (
															<div
																key={`ChatItem-${chat.id}`}
																className={classNames(
																	classes.conversation,
																	chat.ownerId === githubUserData.id
																		? classes.conversationSent
																		: classes.conversationReceived
																)}
															>
																<Avatar
																	alt=''
																	src={chat.owner.avatarUrl}
																	style={{
																		marginRight: 10,
																		display:
																			chat.ownerId === githubUserData.id
																				? 'none'
																				: 'block'
																	}}
																/>
																<div
																	className={classNames(
																		classes.body,
																		chat.ownerId === githubUserData.id
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
																			chat.ownerId === githubUserData.id
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
																		display:
																			chat.ownerId === githubUserData.id
																				? 'block'
																				: 'none'
																	}}
																/>
															</div>
														))}
												</div>
												<Divider />
												{this.renderSubmitChatBox()}
											</main>
										</div>
									</SplitPane>
								</div>
							</div>
						</Card>
					</Grid>
				</Grid>
			</Wrapper>
		);
	}
}

const TypedChatStyles: any = ChatStyles;
const TypeChatBox: any = Chat;
export default withWidth()(withStyles(TypedChatStyles)(withTranslation()(TypeChatBox)));
