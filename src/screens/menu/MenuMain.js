import React from 'react';
import {Pressable, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import commonStyles from '../../styles/commonStyle';

const MenuMain = ({navigation}) => {
  return (
    <>
      <View style={{flexDirection: 'column', flex: 1}}>
        <Pressable
          onPress={() => {
            navigation.navigate('MenuDetail');
          }}
          style={{
            flex: 1,
            backgroundColor: 'gray',
            margin: 4,
          }}
        ></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 4,
          }}
        ></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 4,
          }}
        ></Pressable>
      </View>
      <View style={{flex: 1}}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 4,
          }}
        ></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 4,
          }}
        ></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 4,
          }}
        ></Pressable>
      </View>
    </>
  );
};

export default MenuMain;
