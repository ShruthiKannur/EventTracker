import React, { PureComponent } from 'react';
import { Picker, View } from 'react-native';

export default class PickList extends PureComponent {
  render() {
    const pickerItems = this.props.pickerValues.map((item) => {
      return (<Picker.Item label={item} value={item} key={item}/>);
    })
    return (
        <Picker
          selectedValue={this.props.selectedVal}
          onValueChange={this.props.handleValueChange}
          mode='dropdown'
        >
          {pickerItems}
        </Picker>
    );
  }
}
