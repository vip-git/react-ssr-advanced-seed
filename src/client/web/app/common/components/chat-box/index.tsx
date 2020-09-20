/* eslint-env browser */
// Model
import { ChatBoxModel } from './chat-box.model';

// Interfaces
import { IChatProps, IContact } from './types';

import './style.scss';

// Internal Components
import { AppHeaderComponent } from './functional-components/app-header.component';
import { ChatHeaderComponent } from './functional-components/chat-header.component';
import { ChatSideBarComponent } from './functional-components/chat-sidebar.component';
import { ChatMainComponent } from './functional-components/chat-main.component';

// Internals
const {
	isWidthUp,
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
	SplitPane,
	find,
	useTranslation
} = ChatBoxModel.libraries;
const { Wrapper, Tabs } = ChatBoxModel.components;
const { useChatStyles } = ChatBoxModel.styles;

type iModalForm = 'createGroupForm' | 'settingsForm';

const Chat: React.FunctionComponent<IChatProps> = ({
	chatData: {
		chats,
		member,
		groupType,
		groupName,
		groupDescription,
		groupMembers,
		groupImage
	},
	submitCreateGroup,
	userData,
	SharedComponent,
	width,
	githubUserData,
	groupId,
	submitChat,
	title,
	groupData,
	onSelectGroup,
	onSelectContact,
	readUsersAndChat,
 }) => {
	const { t, i18n } = useTranslation();
	const classes = useChatStyles({});
	const [opened, setOpened] = React.useState(false);
	const [currentChat, setCurrentChat] = React.useState('');
	const [createGroupForm, setCreateGroupForm] = React.useState(false);
	const [settingsForm, setSettingsForm] = React.useState(false);

	React.useEffect(() => {
		if (i18n && i18n.addResourceBundle) {
			i18n.addResourceBundle(
				'en-US',
				'translation',
				ChatBoxModel.i18nKeys['en-US']
			);
			i18n.addResourceBundle(
				'de-DE',
				'translation',
				ChatBoxModel.i18nKeys['de-DE']
			);
			i18n.addResourceBundle(
				'fr-FR',
				'translation',
				ChatBoxModel.i18nKeys['fr-FR']
			);
		}
		readUsersAndChat();
	}, []);

	const handleDrawerToggle = () => setOpened(!opened);

	const scrollToBottomChat = () => {
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

	const modalOpen = (modalForm: iModalForm) => {
		switch (modalForm) {
			case 'settingsForm':
				return setSettingsForm(true);
			case 'createGroupForm':
				return setCreateGroupForm(true);
			default:
				return '';
		}
	};

	const modalHandleClose = (modalForm: iModalForm) => {
		switch (modalForm) {
			case 'settingsForm':
				return setSettingsForm(false);
			case 'createGroupForm':
				return setCreateGroupForm(false);
			default:
				return '';
		}
	};

	const sendChat = () => {
		return (
			currentChat !== '' &&
			submitChat({
				variables: {
					ownerId: githubUserData?.id,
					groupId,
					message: currentChat,
					date: new Date().toISOString()
				},
				callBack: () => setCurrentChat('')
			})
		);

	}

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			sendChat();
		}
	};

	const renderSubmitChatBox = () => {
		let groupMemberData = false;
		if (groupType === 'group') {
			groupMemberData = find(groupMembers, [
				'member.githubUid',
				githubUserData?.id
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
						onChange={(e: any) => setCurrentChat(e.target.value)}
						onKeyDown={handleKeyDown}
						className={classes.input}
					/>
					<Button
						onClick={() => sendChat()}
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

	const renderTabs = () => (
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
												ownerId: githubUserData?.id,
												memberId: contact.githubUid,
												groupName: `${githubUserData?.name ||
													githubUserData?.login} (${
													githubUserData?.realId
													}) - ${contact.name || contact.githubId} (${
													contact.id
													})`,
												groupDescription: 'private group',
												groupImage: 'none',
												groupType: 'personal',
												accessType: 'private',
												date: new Date()
											},
											callBack: callbackGroupId => onSelectContact(callbackGroupId)
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
	
	const currentUsername =
		githubUserData?.name && githubUserData?.name.indexOf(' ') === -1
			? githubUserData?.name
			: (githubUserData?.name && githubUserData?.name.split(' ')[0]) ||
			githubUserData?.login;
	
			const oppositeAvatarUrl = groupType === 'personal'
		? member.avatarUrl
		: groupImage;
	
	const oppositeUserName =
		groupType === 'personal' ? member.name || member.githubId : groupName;
	
	const oppositeDescription =
		groupType === 'personal' ? 'Online' : groupDescription;
	
	const SideBarConent = renderTabs();
	
	const createGroupMembers = userData.map(val =>
		val.name
			? { value: `${val.name} (${val.githubId})`, key: val.id }
			: { value: val.githubId, key: val.id }
	);

	scrollToBottomChat();

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
								modalOpen={modalOpen}
								currentUsername={currentUsername}
								githubUserData={githubUserData}
								oppositeAvatarUrl={oppositeAvatarUrl}
								oppositeDescription={oppositeDescription}
								oppositeUserName={oppositeUserName}
								createGroupForm={createGroupForm}
								settingsForm={settingsForm}
								modalHandleClose={modalHandleClose}
								handleDrawerToggle={handleDrawerToggle}
								groupMembers={createGroupMembers}
								ownerRealId={githubUserData?.realId}
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
										handleDrawerToggle={handleDrawerToggle}
										opened={opened}
									/>
									<ChatMainComponent
										chats={chats}
										classes={classes}
										githubUserData={githubUserData}
										t={t}
										renderSubmitChatBox={renderSubmitChatBox}
									/>
								</SplitPane>
							</div>
						</div>
					</Card>
				</Grid>
			</Grid>
		</Wrapper>
	);
};

export default Chat;
