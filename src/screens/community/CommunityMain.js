import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import colors from '../../styles/colors';
import {Pressable} from 'react-native';
import TextRegular from '../../component/text/TextRegular';
import {FlatList} from 'react-native';

const CommunityMain = ({navigation}) => {
  const dummyTopMenu = [
    '동네모임',
    '동네정보',
    '동네소식',
    '동네모임',
    '동네정보',
    '동네소식',
  ];
  const renderItem = item => {
    const element = item.item;
    return (
      <View style={{marginRight: 15, alignItems: 'center'}}>
        <View
          style={{
            width: 60,
            height: 60,

            borderRadius: 10,
            backgroundColor: colors.borderColor,
          }}></View>
        <TextRegular>{element}</TextRegular>
      </View>
    );
  };
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header navigation={navigation} showLogo={true} />
      <Pressable
        onPress={() => {}}
        style={{
          marginHorizontal: 14,
          height: 50,
          borderWidth: 2,
          borderColor: colors.primary,
          borderRadius: 10,
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
        <TextRegular style={{color: '#c7c7c7'}}>
          동네북을 펄쳐주세요
        </TextRegular>
      </Pressable>
      <FlatList
        horizontal
        data={dummyTopMenu}
        renderItem={item => renderItem(item)}
        contentContainerStyle={{paddingHorizontal: 14, marginTop: 20}}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default CommunityMain;
