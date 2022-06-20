import React from 'react';
import {Pressable, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import commonStyles from '../../styles/commonStyle';

const MenuTopFirst = ({navigation}) => {
  return (
    <>
      <View>
        <Pressable
          onPress={() => {
            // navigation.navigate('MenuStore');
          }}
          style={{
            height: 400,
            width: 300,
            backgroundColor: 'orange',
            margin: 20,
          }}></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'orange',
            margin: 20,
          }}></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'orange',
            margin: 20,
          }}></Pressable>
      </View>
      <View style={{flex: 1}}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'orange',
            margin: 20,
          }}></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'orange',
            margin: 20,
          }}></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'orange',
            margin: 20,
          }}></Pressable>
      </View>
      <View style={{flex: 1}}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'orange',
            margin: 20,
          }}></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'orange',
            margin: 20,
          }}></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'orange',
            margin: 20,
          }}></Pressable>
      </View>
    </>
  );
};
export default MenuTopFirst;
