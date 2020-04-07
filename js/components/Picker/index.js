import React, { PureComponent } from 'react';
import { Picker, View } from 'react-native';

export default class PickList extends PureComponent {
  render() {
    return (
        <Picker
          selectedValue={this.props.selectedVal}
          onValueChange={this.props.handleValueChange}
          mode='dropdown'
        >
          <Picker.Item label='List' value='List' />
          <Picker.Item label='Grid' value='Grid' />
        </Picker>
    );
  }
}
