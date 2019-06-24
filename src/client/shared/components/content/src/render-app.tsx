// Library
import React from 'react';

export default class App extends React.Component<any, any> {
  render() {
    const { View, Text } = this.props.api;
    const { style } = this.props;
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'skyblue', ...style }}>
          <Text style={{ textAlign: 'center' }}>This is Shared Component!</Text>
        </View>
    );
  }
}
