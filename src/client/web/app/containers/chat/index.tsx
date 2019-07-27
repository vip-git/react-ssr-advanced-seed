// Internal
import { ChatModel } from './chat.model';

// Types
import { ICreateChatPayload } from '@omega-web-components/chat-box/types';

const { React, Component, connect } = ChatModel.libraries;

class ChatContainer extends Component<any, any> {
	handleErrorClose = () => this.props.dispatchProcessErrorChatResponse(false);

	render() {
	  const { dispatchReadAllUsersAndChats, dispatchCreateChat } = this.props;
	  const { ChatComponent, ContentComponent, DialogComponent } = ChatModel.components;
	  const { chatData, userData, error } = this.props.chats;
	  return (
			<React.Fragment>
				<ChatComponent
					sharedComponent={() => <ContentComponent />}
					submitChat={(payload: ICreateChatPayload) => dispatchCreateChat(payload)}
					readUsersAndChat={() => dispatchReadAllUsersAndChats()}
					title={this.props.title}
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
	  );
	}
}

export default connect(
  ChatModel.reduxState,
  ChatModel.reduxActions,
)(ChatContainer);
