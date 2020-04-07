import React, { PureComponent } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, Button } from 'react-native';

export default class ListView extends PureComponent {
  renderItem = (item) => {
    const key = `${item.item.eventName}-${item.item.location}`;
    return (
      <TouchableOpacity style={{flex: 1}} onPress={() => this.props.onPress(item.item)} key={key}>
        <View style={{flexDirection:'row', borderBottomWidth: 1}}>
          <Image style={{height: 40, width: 40}} source={item.item.thumbNail} />
          <Text style={{flex: 2}}> {item.item.eventName} </Text>
          <Text style={{flex: 2}}> {item.item.location} </Text>
          <Text style={{flex: 1}}> {item.item.entryType} </Text>
          {this.props.allowDelete && <Button title='Remove' onPress={() => this.props.onRemove(item.item.id)} />}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
        <FlatList
          data={this.props.events}
          renderItem={this.renderItem}
          key={(item) => `${item.id}`}
        />
    );
  }
}
