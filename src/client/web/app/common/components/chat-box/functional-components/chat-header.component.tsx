/* eslint-disable no-undef */
// Model
import { ChatBoxModel } from '../chat-box.model';

const {
	AppBar,
	Toolbar,
	List,
	ListItem,
	ListItemText,
	Avatar,
	Hidden,
	Button,
	IconButton,
	MenuIcon,
} = ChatBoxModel.uiFrameworkComponents;

const {
	React,
} = ChatBoxModel.libraries;

const {
	OptionsBar,
	ModalForm,
	CreateGroupForm,
	SettingsForm
} = ChatBoxModel.components;

// Types
interface ChatHeaderProps {
	classes: any;
    t: any;
	handleDrawerToggle: () => void;
    oppositeAvatarUrl: string;
    oppositeUserName: string;
    oppositeDescription: string;
    githubUserData: any;
	currentUsername: string;
	ownerRealId: Number;
    createGroupForm: boolean;
	settingsForm: boolean;
	groupMembers: Array<string>;
	handleCreateGroup: (payload: any) => void;
    modalOpen: (stateName: string) => void;
    modalHandleClose: (stateName: string) => void;
}

export const ChatHeaderComponent: React.FunctionComponent<ChatHeaderProps> = ({
					classes,
					handleDrawerToggle,
					oppositeAvatarUrl,
					oppositeUserName,
					oppositeDescription,
					githubUserData,
					currentUsername,
					createGroupForm,
					settingsForm,
					modalHandleClose,
					handleCreateGroup,
					groupMembers,
					ownerRealId,
					modalOpen,
					t
				}) => (
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
									onClick={() => handleDrawerToggle()}
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
										src={githubUserData?.avatar_url}
										className={classes.avatar}
									/>
									<ListItemText primary={currentUsername} secondary='Online' />
								</ListItem>
							</List>
							<span className='flexSpacer' />
							<OptionsBar
								menuItems={[
									{
										menuName: 'Create Group',
										callback: () => modalOpen('createGroupForm')
									},
									{
										menuName: 'Settings',
										callback: () => modalOpen('settingsForm')
									},
									{
										menuName: 'Logout',
										callback: () => console.log('called for logout')
									}
								]}
							/>
							<ModalForm
								open={createGroupForm}
								modalTitle={t('create-group-title')}
								modalDescription={t('create-group-description')}
								modalContent={() => (
									<CreateGroupForm
										groupMembers={groupMembers}
										ownerId={githubUserData?.id}
										ownerRealId={ownerRealId}
										onSubmit={handleCreateGroup}
										closeForm={() => modalHandleClose('createGroupForm')}
									/>
								)}
								modalActions={() => {
									return (
										<>
											<Button
												color='primary'
												onClick={() => modalHandleClose('createGroupForm')}
											>
												Cancel
											</Button>
											<Button
												color='primary'
												variant={'contained'}
												onClick={() => {
													if (typeof document !== 'undefined') {
														const createGroupButton: any = document.querySelector(
															'#materialForm > div > fieldset + div > button + button'
														);
														if (createGroupButton) {
															createGroupButton.click();
														}
													}
												}}
											>
												Create
											</Button>
										</>
									);
								}}
								handleClose={() => modalHandleClose('createGroupForm')}
							/>
							<ModalForm
								open={settingsForm}
								modalTitle={t('settings-title')}
								modalDescription={t('settings-description')}
								modalContent={() => <SettingsForm />}
								modalActions={() => {
									return (
										<Button
											color='primary'
											onClick={() => modalHandleClose('settingsForm')}
										>
											Create
										</Button>
									);
								}}
								handleClose={() => modalHandleClose('settingsForm')}
							/>
						</Toolbar>
					</AppBar>
				);
