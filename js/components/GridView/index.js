import React, { PureComponent } from 'react';
import { View, Image, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

export default class GridView extends PureComponent {
  render() {
    const { events = [] } = this.props;
    const width = (Dimensions.get('window').width)/2 - 10;
    const gridElements = events.map((item) => {
      const key = `${item.eventName}-${item.location}`;
      return (
        <TouchableOpacity onPress={() => this.props.onPress(item)} key={key}>
          <View style={{flexDirection: 'column', paddingVertical: 10, width: width, borderBottomWidth: 1}}>
            <Image source={item.thumbNail} style={{height: 200, width: width - 5}} />
            <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}> {item.eventName} </Text>
          </View>
        </TouchableOpacity>
      )
    });

    return (
      <ScrollView>
        <View style={{alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {gridElements}
        </View>
      </ScrollView>
    );
  }
}
