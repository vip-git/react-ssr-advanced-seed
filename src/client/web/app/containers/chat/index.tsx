/* eslint-disable react/jsx-fragments */
// Types
import {
	ICreateChatPayload,
	ICreateGroupPayload
} from '@omega-web-components/chat-box/types';

// Internal
import { ChatModel } from './chat.model';

const { React, Component, connect, ApolloConsumer, JWTDecode } = ChatModel.libraries;

class ChatContainer extends Component<any, any> {
	handleErrorClose = () => {
		const { dispatchProcessErrorChatResponse } = this.props;
		return dispatchProcessErrorChatResponse(false);
	};

	render() {
		const {
			dispatchReadAllUsersAndChats,
			dispatchCreateChat,
			dispatchCreateGroup
		} = this.props;
		const { ChatComponent, ContentComponent } = ChatModel.components;
		const { chats, title, idToken } = this.props;
		const { chatData, userData, groupData } = chats;
		const ChatComponentTyped: any = ChatComponent;
		let githubUserData: any = {};
		try {
			githubUserData = JWTDecode(idToken);
		}
 		catch(err) {
			githubUserData = null;
		}
		return (
			<ApolloConsumer>
				{apolloClient => (
					<React.Fragment>
						<ChatComponentTyped
							SharedComponent={() => <ContentComponent />}
							submitChat={(payload: ICreateChatPayload) =>
								dispatchCreateChat({
									apolloClient,
									data: payload?.variables,
									callBack: () => payload.callBack()
								})}
							onSelectContact={(groupId: number) =>
								dispatchReadAllUsersAndChats({
									apolloClient,
									data: {
										chatPayload: {
											filters: {
												where: {
													id: groupId
												}
											}
										},
										groupPayload: {
											filters: {
												take: 100,
												where: {
													accessType: 'public',
													groupType: 'group'
												}
											}
										},
										profilePayload: {
											filters: {
												not: {
													githubId: githubUserData?.login
												}
											}
										}
									},
									idToken
								})}
							onSelectGroup={(groupId: number) =>
								dispatchReadAllUsersAndChats({
									apolloClient,
									data: {
										chatPayload: {
											filters: {
												where: {
													id: groupId
												}
											}
										},
										groupPayload: {
											filters: {
												take: 100,
												where: {
													accessType: 'public',
													groupType: 'group'
												}
											}
										},
										profilePayload: {
											filters: {
												not: {
													githubId:  githubUserData?.login
												}
											}
										}
									},
									idToken
								})}
							readUsersAndChat={() =>
								dispatchReadAllUsersAndChats({
									apolloClient,
									data: {
										chatPayload: {
											filters: {
												where: {
													id: 1
												}
											}
										},
										groupPayload: {
											filters: {
												take: 100,
												where: {
													accessType: 'public',
													groupType: 'group'
												}
											}
										},
										profilePayload: {
											filters: {
												not: {
													githubId: githubUserData?.login
												}
											}
										}
									},
									idToken
								})}
							submitCreateGroup={(payload: ICreateGroupPayload) =>
								dispatchCreateGroup({
									apolloClient,
									data: payload?.variables,
									callBack: id => payload.callBack(id)
								})}
							githubUserData={githubUserData}
							groupId={chatData.id || 1}
							title={title}
							chatData={chatData}
							userData={userData}
							groupData={groupData}
						/>
					</React.Fragment>
				)}
			</ApolloConsumer>
		);
	}
}

export default connect(
	ChatModel.reduxState,
	ChatModel.reduxActions
)(ChatContainer);
