import React, { PureComponent } from 'react';
import InputText from '../components/InputText';
import { View, Text, Image, Button, TouchableOpacity, Platform } from 'react-native';
import { withGestureEnable } from '../hoc/withGestureEnable.js';
import { connect } from 'react-redux';
import { writeTrackedEvents } from '../services/dbService.js';

export class EventDetail extends PureComponent {
  renderScreen = () => {
    const { route } = this.props;
    const { params } = route || {};
    const { data } = params || {};
    const { eventName, thumbNail, location, entryType } = data || {};
    return(
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', paddingHorizontal: 30, paddingVertical: 50}}>
        <Image source={thumbNail} style={{height: 100, width: 100}}/>
        <View style={{paddingTop: 50, paddingBottom: 50}}>
          <Text style={{fontSize: 20}}> Name: {eventName} </Text>
          <Text style={{fontSize: 20}}> Location: {location} </Text>
          <Text style={{fontSize: 20}}> Entry Type: {entryType} </Text>
        </View>
        <View style={{borderWidth: 1}}>
          <Button title='Track this event' onPress={async () => {
            this.props.addToTrackedEvents(data);
            const allTrackedItems = Object.keys(this.props.trackedEvents);
            writeTrackedEvents(this.props.username, [...allTrackedItems, data.id]);
          }}/>
        </View>
      </View>
    );
  };

  render() {
    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity style={{flex: 1}}>
          {this.renderScreen()}
        </TouchableOpacity>
      );
    } else {
      return this.renderScreen();
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  username: state.userName,
  trackedEvents: state.trackedEvents,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addToTrackedEvents: (event) => {
    dispatch({type: 'TRACKED_EVENTS', payload: event});
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (withGestureEnable(EventDetail));
