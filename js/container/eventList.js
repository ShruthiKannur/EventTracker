import React, { PureComponent } from 'react';
import { View, Button, Modal, Text, Platform, TouchableOpacity } from 'react-native';
import PickList from '../components/Picker';
import ListView from '../components/ListView';
import GridView from '../components/GridView';
import { withGestureEnable } from '../hoc/withGestureEnable.js';
import { connect } from 'react-redux';

export class EventList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedVal: 'Grid',
      showPicker: false,
    }
  };

  handleValueChange = (val) => {
    this.setState({selectedVal: val, showPicker: false});
  };

  onPress = (item) => {
    const { navigation } = this.props;
    navigation.navigate('EventDetail', {
      data: item
    });
  }

  renderScreen = () => {
    const { availableEvents } = this.props;
    const padding = Platform.OS === 'android' ? 0 : 30;
    return (
      <View>
        <View style={{alignItems: 'flex-end', paddingBottom: 20}}>
          <Button title='Change View' onPress={() => this.setState({showPicker: true})} />
        </View>
        <Modal
          animated
          animationType="slide"
          visible={this.state.showPicker}
          transparent
        >
          <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: padding, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <View style={{flex: 0.3, backgroundColor: 'white', flexDirection: 'column'}}>
              <PickList selectedVal={this.state.selectedVal} handleValueChange={this.handleValueChange} pickerValues={['List', 'Grid']}/>
            </View>
          </View>
        </Modal>
        {this.state.selectedVal === 'List' && <ListView onPress={this.onPress} events={availableEvents}/>}
        {this.state.selectedVal === 'Grid' && <GridView onPress={this.onPress} events={availableEvents}/>}
      </View>
    );
  }

  render() {
    if (Platform.OS === 'android') {
      return (<TouchableOpacity style={{flex: 1}}>
        {this.renderScreen()}
      </TouchableOpacity>);
    } else {
      return this.renderScreen();
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  availableEvents: state.availableEvents
});

export default connect(mapStateToProps) (withGestureEnable(EventList));
