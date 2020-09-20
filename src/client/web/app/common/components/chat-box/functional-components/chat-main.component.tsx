
// Model
import { ChatBoxModel } from '../chat-box.model';

// Types
import { IChat } from '../types';

// UI-Framework component
const { Divider, Avatar, Typography,  } = ChatBoxModel.uiFrameworkComponents;

// Libraries
const { React, classNames, distanceInWordsToNow } = ChatBoxModel.libraries;

// Types
interface ChatMainProps {
	classes: any;
    t: any;
    chats: IChat[];
    githubUserData: any;
    renderSubmitChatBox: () => void;
}

export const ChatMainComponent: React.FunctionComponent<
					ChatMainProps
				> = ({ classes, t, chats, githubUserData, renderSubmitChatBox }) => (
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
												chat.ownerId === githubUserData?.id
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
														chat.ownerId === githubUserData?.id
															? 'none'
															: 'block'
												}}
											/>
											<div
												className={classNames(
													classes.body,
													chat.ownerId === githubUserData?.id
														? classes.bodySent
														: classes.bodyReceived
												)}
											>
												<Typography color='inherit'>{chat.message}</Typography>
												<Typography
													variant='caption'
													className={classNames(
														classes.date,
														chat.ownerId === githubUserData?.id
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
												src={githubUserData?.avatar_url}
												style={{
													float: 'right',
													order: 2,
													marginLeft: 10,
													top: 25,
													display:
														chat.ownerId === githubUserData?.id
															? 'block'
															: 'none'
												}}
											/>
										</div>
									))}
							</div>
							<Divider />
							{renderSubmitChatBox()}
						</main>
					</div>
				);
