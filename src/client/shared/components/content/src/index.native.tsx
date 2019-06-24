// Library
import React, { Component } from 'react';
import { View, Text } from 'react-native';

// Internal
import App from './render-app';

export default class SharedComponent extends Component {
  render() {
    return (
        <App api={{ View, Text }} {...this.props} />
    );
  }
}
