// Library
import React from 'react';

// Interface
import { ISharedComponentProps } from './shared-component.interface';

export default class App extends React.Component<ISharedComponentProps, {}> {
  render() {
    const { api } = this.props;
    const { View, Text } = api;
    const { style } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'skyblue',
          ...style
        }}
      >
        <Text 
          style={{
            textAlign: 'center',
            fontSize: '1.2em',
            width: '75%',
          }}
        >
          This is a Shared Component Built using React Native Web!
        </Text>
      </View>
    );
  }
}
