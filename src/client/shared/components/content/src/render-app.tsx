// Library
import React, { ReactType } from 'react';

// Interface
import { ISharedComponentProps } from './shared-component.interface';

export default class App extends React.Component<ISharedComponentProps, {}> {
  render() {
    const { View, Text } = this.props.api;
    const { style } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'skyblue',
          ...style
        }}
      >
        <Text style={{ textAlign: 'center' }}>This is Shared Component!</Text>
      </View>
    );
  }
}
