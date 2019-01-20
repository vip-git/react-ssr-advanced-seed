// Internal
import { ChatModel } from './chat.model';
const { React, Component, connect } = ChatModel.libraries;

class ChatContainer extends Component {
  componentDidMount() {
    this.props.dispatchReadAllUsersAndChats();
  }

  render() {
    const { ChatComponent } = ChatModel.components;
    const { defaultChats, defaultUsers } = this.props.chats;
    return <ChatComponent title={this.props.title} defaultChats={defaultChats} defaultUsers={defaultUsers} />;
  }
}

export default connect(
  ChatModel.reduxState,
  ChatModel.reduxActions,
)(ChatContainer);
