// Internal
import { ChatModel } from './chat.model';
const { React, Component, connect } = ChatModel.libraries;

class ChatContainer extends Component<any, any> {
  componentDidMount() {
    this.props.dispatchReadAllUsersAndChats();
  }

  handleErrorClose = () => {
    return this.props.dispatchProcessErrorChatResponse(false);
  }

  render() {
    const { ChatComponent, ContentComponent, DialogComponent } = ChatModel.components;
    const { defaultChats, defaultUsers, error } = this.props.chats;
    return (
      <React.Fragment>
        <ChatComponent
          sharedComponent={() => <ContentComponent />}
          title={this.props.title}
          defaultChats={defaultChats}
          defaultUsers={defaultUsers} />
        <DialogComponent
          show={error && error.error}
          content={error && error.message}
          title={error && error.title}
          handleClose={this.handleErrorClose} />
      </React.Fragment>
    );
  }
}

export default connect(
  ChatModel.reduxState,
  ChatModel.reduxActions,
)(ChatContainer);
