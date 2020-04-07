import React, { PureComponent } from 'react';
import InputText from '../components/InputText';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { withGestureEnable } from '../hoc/withGestureEnable.js';
import { getTrackedEvents } from '../services/dbService.js';
import { initDB } from '../services/dbService.js';
import { availableEvents } from '../metaData/eventData.js';

export class LoginContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reload: false,
    }
  };

  static getDerivedStateFromProps(preProps, newProps) {
    if (preProps.userName !== newProps.userName) {
      return {reload: true};
    }
  }

  initialiseDb = async () => {
    initDB(this.props.userName).then((res = '') => {
      const events = (res[0] || {}).eventInfo || '';
      if (events.length) {
        const ids = (events).split(',');
        const items = {};
        ids.forEach((id, i) => {
          availableEvents.find((item) => {
            if (item.id == id) {
              items[id] = item;
            }
          });
        });
        items && this.props.initialiseTrackedEvents(items);
      } else {
        this.state.reload && this.props.initialiseTrackedEvents();
        this.setState({reload: false});
      }
    });
  };

  onPress = async () => {
    if (this.props.userName) {
      await this.initialiseDb();
      const { navigation } = this.props;
      navigation.navigate('EventList');
    }
  };

  render() {
      return (
        <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 50}}>
          <View style={{flex: 0.9}}>
            <InputText label='Username' onChange={this.props.setUserName} val={this.props.userName}/>
          </View>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Button title='Go' onPress={this.onPress} />
          </View>
        </View>
      );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userName: state.userName,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setUserName: (name) => dispatch({type: 'USERNAME', payload: name}),
  initialiseTrackedEvents: (events) => dispatch({type: 'INITIALISE_TRACKED_EVENTS', payload: events}),
});

export default connect(mapStateToProps, mapDispatchToProps) (withGestureEnable(LoginContainer));
