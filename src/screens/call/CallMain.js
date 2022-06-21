import React from 'react';
import {Pressable, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import commonStyles from '../../styles/commonStyle';

const CallMain = ({navigation}) => {
  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <View style={{flex: 1}}>
        <Pressable
          onPress={() => {
            navigation.navigate('MenuStore');
          }}
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 20,
          }}
        ></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 20,
          }}
        ></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 20,
          }}
        ></Pressable>
      </View>
      <View style={{flex: 1}}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 20,
          }}
        ></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 20,
          }}
        ></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 20,
          }}
        ></Pressable>
      </View>
      <View style={{flex: 1}}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 20,
          }}
        ></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 20,
          }}
        ></Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            margin: 20,
          }}
        ></Pressable>
      </View>
    </View>
  );
};

export default CallMain;
