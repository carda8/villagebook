import React from 'react';
import {View} from 'react-native';
import {Pressable, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import commonStyles from '../../styles/commonStyle';

const Main = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'메인'} navigation={navigation} />
      <View
        style={{
          height: 200,
          padding: 10,
          paddingBottom: 20,
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('CallTopNavigator');
          }}
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            marginRight: 10,
          }}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('CallMain');
          }}
          style={{flex: 1, backgroundColor: 'tomato'}}
        />
      </View>
      <View style={{backgroundColor: 'gray'}}>
        <Text>hihihihihi</Text>
      </View>
    </SafeAreaView>
  );
};

export default Main;
