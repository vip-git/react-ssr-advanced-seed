// Library
import React, { Component } from 'react';
import { View, Text } from 'react-native';

// Internal
import App from './render-app';

// Interface
import { ISharedComponentProps } from './shared-component.interface';

export default class SharedComponent extends Component<
  ISharedComponentProps,
  {}
> {
  render() {
    return <App api={{ View, Text }} {...this.props} />;
  }
}
