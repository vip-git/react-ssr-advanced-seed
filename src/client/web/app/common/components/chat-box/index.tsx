/* eslint-env browser */
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
	find
} = ChatBoxModel.libraries;
const { Wrapper, Tabs } = ChatBoxModel.components;
const { ChatStyles } = ChatBoxModel.styles;

type iModalForm = 'createGroupForm' | 'settingsForm';

class Chat extends Component<IChatProps, IChatState> {
	constructor(props) {
		super(props);
		this.state = {
			opened: false,
			currentChat: '',
			createGroupForm: false,
			settingsForm: false
		};
	}

	componentDidMount() {
		const { readUsersAndChat  } = this.props;
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
		readUsersAndChat();
	}

	handleDrawerToggle = () => {
		const { opened } = this.state; 
		this.setState({ opened: !opened });
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

	sendChat = () => {
		const { currentChat } = this.state;
		const { submitChat, githubUserData, groupId } = this.props;
		return (
			currentChat !== '' &&
			submitChat({
				variables: {
					ownerId: githubUserData.id,
					groupId,
					message: currentChat,
					date: new Date().toISOString()
				},
				callBack: () => this.setState({ currentChat: '' })
			})
		);
		
	}

	handleKeyDown = e => {
		if (e.key === 'Enter') {
			this.sendChat();
		}
	};

	renderSubmitChatBox = () => {
		const {
			classes,
			chatData: { groupMembers, member, groupType },
			githubUserData
		} = this.props;
		const { currentChat } = this.state;
		let groupMemberData = false;
		if (groupType === 'group'){
			groupMemberData = find(groupMembers, [
				'member.githubUid',
				githubUserData.id
			]);
		}
 		else {	
			groupMemberData = member && member.id && true;
		}
		return groupMemberData ? (
			<div className='px-2'>
				<Grid container spacing={0} justify={'center'} alignItems={'center'}>
					<TextField
						label='Write a message'
						type='text'
						margin='normal'
						value={currentChat}
						onChange={(e: any) =>
							this.setState({ currentChat: e.target.value })}
						onKeyDown={this.handleKeyDown}
						className={classes.input}
					/>
					<Button
						onClick={() => this.sendChat()}
						disabled={currentChat.length === 0}
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

	renderTabs = () => {
		const {
			classes,
			userData,
			groupData,
			t,
			onSelectGroup,
			onSelectContact,
			githubUserData,
			submitCreateGroup
		} = this.props;
		return (
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
										onClick={() =>
											submitCreateGroup({
												variables: {
													ownerId: githubUserData.id,
													memberId: contact.githubUid,
													groupName: `${githubUserData.name ||
														 githubUserData?.login} (${
														githubUserData.realId
													}) - ${contact.name || contact.githubId} (${
														contact.id
													})`,
													groupDescription: 'private group',
													groupImage: 'none',
													groupType: 'personal',
													accessType: 'private',
													date: new Date()
												},
												callBack: groupId => onSelectContact(groupId)
											})}
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
							<List
								style={{ paddingTop: 0, maxHeight: 300, overflow: 'scroll' }}
							>
								{groupData.map((groupVal: any, index) => (
									<ListItem
										style={{
											borderBottom: 'solid 1px #e0e0e0'
										}}
										key={`ListItem-${groupVal.id}`}
										button
										onClick={() => onSelectGroup(groupVal.id)}
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
	}

	render() {
		const {
			classes,
			chatData: {
				chats,
				member,
				groupType,
				groupName,
				groupDescription,
				groupImage
			},
			submitCreateGroup,
			userData,
			SharedComponent,
			width,
			t,
			githubUserData,
			title
		} = this.props;
		const { opened, createGroupForm, settingsForm } = this.state;
		const currentUsername =
			githubUserData.name && githubUserData.name.indexOf(' ') === -1
				? githubUserData.name
				: (githubUserData.name && githubUserData.name.split(' ')[0]) ||
				   githubUserData?.login;
		const oppositeAvatarUrl = groupType === 'personal'
			? member.avatarUrl
			: groupImage;
		const oppositeUserName =
			groupType === 'personal' ? member.name || member.githubId : groupName;
		const oppositeDescription =
			groupType === 'personal' ? 'Online' : groupDescription;
		const SideBarConent = this.renderTabs();
		const createGroupMembers = userData.map(val =>
			val.name
				? { value: `${val.name} (${val.githubId})`, key: val.id }
				: { value: val.githubId, key: val.id }
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
									handleCreateGroup={submitCreateGroup}
									modalOpen={this.modalOpen}
									currentUsername={currentUsername}
									githubUserData={githubUserData}
									oppositeAvatarUrl={oppositeAvatarUrl}
									oppositeDescription={oppositeDescription}
									oppositeUserName={oppositeUserName}
									createGroupForm={createGroupForm}
									settingsForm={settingsForm}
									modalHandleClose={this.modalHandleClose}
									handleDrawerToggle={this.handleDrawerToggle}
									groupMembers={createGroupMembers}
									ownerRealId={githubUserData.realId}
								/>
								<div className={classes.wrapper}>
									<SplitPane
										split='vertical'
										defaultSize={isWidthUp('md', width) ? '27%' : 0}
										minSize={isWidthUp('md', width) ? 300 : 0}
										maxSize={
											isWidthUp('md', width)
												? window.innerWidth / 4
												: 0
										}
										allowResize={isWidthUp('md', width)}
									>
										<ChatSideBarComponent
											classes={classes}
											content={SideBarConent}
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
