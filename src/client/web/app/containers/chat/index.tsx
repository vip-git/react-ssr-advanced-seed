// Internal
import { ChatModel } from './chat.model';
const { React, Component, connect } = ChatModel.libraries;

class ChatContainer extends Component<any, any> {
  componentDidMount() {
    this.props.dispatchReadAllUsersAndChats();
  }

  render() {
    const { ChatComponent, ContentComponent } = ChatModel.components;
    const { defaultChats, defaultUsers } = this.props.chats;
    return (
      <ChatComponent
        sharedComponent={() => <ContentComponent />}
        title={this.props.title}
        defaultChats={defaultChats}
        defaultUsers={defaultUsers} />
    );
  }
}

export default connect(
  ChatModel.reduxState,
  ChatModel.reduxActions,
)(ChatContainer);
