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
		const {
			ChatComponent,
			ContentComponent,
			DialogComponent
		} = ChatModel.components;
		const { chats, title } = this.props;
		const { chatData, userData, error } = chats;
		return (
			<ApolloConsumer>
				{apolloClient => (
					<React.Fragment>
						<ChatComponent
							sharedComponent={() => <ContentComponent />}
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
									data: {}
								})
							}
							title={title}
							chatData={chatData}
							userData={userData}
						/>
						<DialogComponent
							show={error && error.error}
							content={error && error.message}
							title={error && error.title}
							handleClose={this.handleErrorClose}
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
