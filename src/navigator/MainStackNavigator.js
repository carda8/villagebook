import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../screens/home/Main';
import CallMain from '../screens/call/CallMain';
import CallDetail from '../screens/call/CallDetail';
import CallTopNavigator from './CallTopNavigator';
import MenuStroe from '../screens/menu/MenuStore';
import MenuDetail from '../screens/menu/MenuDetail';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="CallTopNavigator" component={CallTopNavigator} />
        <Stack.Screen name="MenuStore" component={MenuStroe} />
        <Stack.Screen name="MenuDetail" component={MenuDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
