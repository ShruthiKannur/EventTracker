import React, { PureComponent } from 'react';
import { TextInput, View, Text } from 'react-native';

export default class InputText extends PureComponent {
  render() {
    const { label = '', onChange, val = '' } = this.props;
    return (
      <View style={{flex: 1}}>
        <TextInput style={{ height: 40, borderWidth: 1 }}
          value={val}
          placeholder="Enter username"
          showSoftInputOnFocus={true}
          onChangeText={onChange}
        />
      </View>
    );
  }
}
