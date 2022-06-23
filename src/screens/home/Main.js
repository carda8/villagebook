import React from 'react';
import {Text, View} from 'react-native';
import {Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import commonStyles from '../../styles/commonStyle';

const Main = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'메인'} navigation={navigation} />
      <Pressable
        onPress={() => {
          navigation.navigate('Map');
        }}
        style={{
          width: '100%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Text style={{fontSize: 25}}>주소 검색</Text>
      </Pressable>
      <View
        style={{
          height: 200,
          padding: 10,
          paddingBottom: 20,
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={() => {}}
          style={{
            flex: 1,
            backgroundColor: 'orange',
            marginRight: 10,
          }}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('CallTopNavigator', {routeIdx: 'Call2'});
          }}
          style={{flex: 1, backgroundColor: 'tomato'}}
        />
      </View>
      <View
        style={{
          height: 200,
          padding: 10,
          paddingBottom: 20,
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('CallTopNavigator', {routeIdx: 'Call5'});
          }}
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            marginRight: 10,
          }}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('CallTopNavigator', {routeIdx: 'Call6'});
          }}
          style={{flex: 1, backgroundColor: 'tomato'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Main;
