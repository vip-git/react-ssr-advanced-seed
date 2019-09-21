/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
// Model
import { ChatBoxModel } from './chat-box.model';

// Interfaces
import { IChatProps, IChatState, IContact } from './types';

import './style.scss';

// Internal Components
import { AppHeaderComponent } from './functional-components/app-header.component';
import { ChatHeaderComponent } from './functional-components/chat-header.component';
import { ChatSideBarComponent } from './functional-components/chat-sidebar.component';
import { ChatMainComponent } from './functional-components/chat-main.component';

// Internals
const {
	withWidth,
	isWidthUp,
	withStyles,
	Grid,
	Card,
	Typography,
	List,
	ListItem,
	ListItemText,
	Avatar,
	TextField,
	Button,
	SendIcon,
	AccountCircleIcon,
	GroupWorkIcon
} = ChatBoxModel.uiFrameworkComponents;
const {
	React,
	Component,
	i18next,
	SplitPane,
	withTranslation,
	reject,
	find
} = ChatBoxModel.libraries;
const { Wrapper, Tabs } = ChatBoxModel.components;
const { ChatStyles } = ChatBoxModel.styles;

type iModalForm = 'createGroupForm' | 'settingsForm';

class Chat extends Component<IChatProps, IChatState> {
	state = {
		opened: false,
		currentChat: '',
		createGroupForm: false,
		settingsForm: false
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
				if (objDiv && objDiv.scrollHeight) {
					objDiv.scrollTop = objDiv.scrollHeight;
				}
			}, 1);
		}
	};

	modalOpen = (modalForm: iModalForm) => this.setState({ [modalForm]: true });

	modalHandleClose = (modalForm: iModalForm) =>
		this.setState({ [modalForm]: false });

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

	handleCreateGroup = (value, callback) => {
		console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
		setTimeout(() => callback && callback(), 2000); // just an example in real world can be your XHR call
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
			githubUserData,
			title,
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
							<List style={{ paddingTop: 0 }}>
								{userData.map((contact: IContact, index) => (
									<ListItem
										style={{
											borderBottom: 'solid 1px #e0e0e0'
										}}
										key={`ListItem-${contact.id}`}
										button
									>
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
							<List style={{ paddingTop: 0 }}>
								{groupData.map((groupVal: any, index) => (
									<ListItem
										style={{
											borderBottom: 'solid 1px #e0e0e0'
										}}
										key={`ListItem-${groupVal.id}`}
										button
									>
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
				<AppHeaderComponent title={title} />
				<Grid
					container
					spacing={0}
					justify={'center'}
					className={classes.header}
				>
					<Grid item xs={11} sm={11} md={10} lg={9}>
						<Card>
							<div className={classes.root}>
								<ChatHeaderComponent
									classes={classes}
									t={t}
									handleCreateGroup={this.handleCreateGroup}
									modalOpen={this.modalOpen}
									currentUsername={currentUsername}
									githubUserData={githubUserData}
									oppositeAvatarUrl={oppositeAvatarUrl}
									oppositeDescription={oppositeDescription}
									oppositeUserName={oppositeUserName}
									createGroupForm={this.state.createGroupForm}
									settingsForm={this.state.settingsForm}
									modalHandleClose={this.modalHandleClose}
									handleDrawerToggle={this.handleDrawerToggle}
								/>
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
										<ChatSideBarComponent
											classes={classes}
											menu={menu}
											SharedComponent={SharedComponent}
											handleDrawerToggle={this.handleDrawerToggle}
											opened={opened}
										/>
										<ChatMainComponent
											chats={chats}
											classes={classes}
											githubUserData={githubUserData}
											t={t}
											renderSubmitChatBox={this.renderSubmitChatBox}
										/>
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
