import React, { PureComponent, Component } from 'react';
import { View, Text, FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import ListView from '../components/ListView';
import { withGestureEnable } from '../hoc/withGestureEnable.js';

export class TrackedEvents extends Component {
  onPress = (item) => {
    const { navigation } = this.props;
    navigation.navigate('EventDetail', {
      data: item
    });
  };

  onRemove = (item) => {
    this.props.removeEvent(item);
  };

  render() {
    return (
      <ListView events={this.props.trackedEvents || []} onPress={this.onPress} allowDelete onRemove={this.onRemove}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  trackedEvents: (() => {
    const events = state.trackedEvents || [];
    return Object.keys(events).map((key) => state.trackedEvents[key]);
  })(),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeEvent: (id) => dispatch({type: 'REMOVE_EVENT', payload: id})
});

const Comp = Platform.OS === 'android' ? withGestureEnable(TrackedEvents) : TrackedEvents;
export default connect(mapStateToProps, mapDispatchToProps) (Comp);
