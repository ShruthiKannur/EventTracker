import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginContainer from '../container/loginContainer.js';
import EventList from '../container/eventList.js';
import EventDetail from '../container/eventDetail.js';
import TrackedEvents from '../container/trackedEvents.js';
import reducers from '../container/actions.js';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const store = createStore(reducers);

function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="trackedEvents" drawerType="permanent">
      <Drawer.Screen name="trackedEvents" component={TrackedEvents} />
    </Drawer.Navigator>
  );
}

function MainApp() {
  return (
    <Provider store={store}>
      <NavigationContainer initialRouteScreen="Home" >
        <Stack.Navigator>
          <Stack.Screen name="Home" component={LoginContainer} options={{title: 'Welcome Screen'/*, gestureEnabled: true*/}} />
          <Stack.Screen name="EventList" component={EventList} options={{title: 'Events'/*, gestureEnabled: true*/}} />
          <Stack.Screen name="EventDetail" component={EventDetail} options={{title: 'EventDetail'/*, gestureEnabled: true*/}} />
          <Stack.Screen name="TrackedEvents" component={TrackedEvents} options={{title: 'TrackedEvents'/*, gestureEnabled: true*/}} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default MainApp;
