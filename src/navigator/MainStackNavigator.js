import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../screens/home/Main';
import CallTopNavigator from './CallTopNavigator';
import MenuStroe from '../screens/menu/MenuStore';
import MenuDetail from '../screens/menu/MenuDetail';
import Map from '../screens/map/Map';
import Test from '../Test';
import AddressSearch from '../screens/map/AddressSearch';
import Login from '../screens/login/login';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="CallTopNavigator" component={CallTopNavigator} />
        <Stack.Screen name="MenuStore" component={MenuStroe} />
        <Stack.Screen name="MenuDetail" component={MenuDetail} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="AddressSearch" component={AddressSearch} />
        {/* <Stack.Screen name="Test" component={Test} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
