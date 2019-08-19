// Types
import { ICreateChatPayload } from '@omega-web-components/chat-box/types';

// Internal
import { ChatModel } from './chat.model';

const { React, Component, connect, ApolloConsumer } = ChatModel.libraries;

class ChatContainer extends Component<any, any> {
	handleErrorClose = () => {
		const { dispatchProcessErrorChatResponse } = this.props;
		return dispatchProcessErrorChatResponse(false);
	};

	render() {
		const { dispatchReadAllUsersAndChats, dispatchCreateChat } = this.props;
		const { ChatComponent, ContentComponent } = ChatModel.components;
		const { chats, title, idToken } = this.props;
		const { chatData, userData, error } = chats;
		const ChatComponentTyped: any = ChatComponent;
		return (
			<ApolloConsumer>
				{apolloClient => (
					<React.Fragment>
						<ChatComponentTyped
							SharedComponent={() => <ContentComponent />}
							submitChat={(payload: ICreateChatPayload) =>
								dispatchCreateChat({
									apolloClient,
									data: payload.variables,
									callBack: () => payload.callBack()
								})
							}
							readUsersAndChat={() =>
								dispatchReadAllUsersAndChats({
									apolloClient,
									data: {},
									idToken
								})
							}
							idToken={idToken}
							title={title}
							chatData={chatData}
							userData={userData}
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
