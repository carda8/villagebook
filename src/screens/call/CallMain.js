import React from 'react';
import {Pressable, View} from 'react-native';

const CallMain = ({navigation}) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14];
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Pressable
          onPress={() => {
            navigation.navigate('MenuStore', {routeIdx: 'Menu1'});
          }}
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 10,
          }}></Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('MenuStore', {routeIdx: 'Menu2'});
          }}
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 10,
          }}></Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('MenuStore', {routeIdx: 'Menu4'});
          }}
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 10,
          }}></Pressable>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 10,
          }}></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 10,
          }}></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 10,
          }}></Pressable>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 10,
          }}></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 10,
          }}></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 10,
          }}></Pressable>
      </View>
    </View>
  );
};

export default CallMain;
