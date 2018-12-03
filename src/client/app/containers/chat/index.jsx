// Library
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Internal
import { ChatComponent } from './components';
import { ChatModel } from './chat.model';

class ChatContainer extends Component {
  componentDidMount() {
    this.props.dispatchReadAllUsersAndChats();
  }

  render() {
    const { defaultChats, defaultUsers } = this.props.chats;
    return <ChatComponent defaultChats={defaultChats} defaultUsers={defaultUsers} />;
  }
}

export default connect(
  ChatModel.reduxState,
  ChatModel.reduxActions,
)(ChatContainer);
