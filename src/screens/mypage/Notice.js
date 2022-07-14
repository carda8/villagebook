import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import colors from '../../styles/colors';
import {render} from 'react-dom';
import Divider from '../../component/Divider';
import TextRegular from '../../component/text/TextRegular';
import TextBold from '../../component/text/TextBold';
import DividerL from '../../component/DividerL';
import dayjs from 'dayjs';

const Notice = ({navigation}) => {
  const [input, setInput] = useState();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const renderItem = item => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('NoticeDetail', {boardIdx: 11});
        }}
        style={{
          height: 70,
          paddingHorizontal: 22,
          paddingVertical: 10,
          justifyContent: 'space-between',
        }}>
        <TextBold style={{color: colors.fontColor2}}>공지</TextBold>
        <TextRegular style={{fontSize: 11, color: colors.fontColorA2}}>
          {dayjs().format('YYYY-MM-DD')}
        </TextRegular>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'공지사항'} navigation={navigation} showCart={true} />
      <FlatList
        data={arr}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                paddingHorizontal: 22,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="제목으로 검색해주세요"
                style={{
                  flex: 1,
                  height: 50,
                  borderWidth: 1,
                  borderColor: colors.borderColor,
                  borderRadius: 7,
                  paddingLeft: 20,
                  paddingRight: 40,
                }}></TextInput>
              <Image
                source={require('~/assets/ico_search.png')}
                style={{
                  position: 'absolute',
                  right: 36,
                  width: 20,
                  height: 20,
                  tintColor: colors.fontColor2,
                }}
              />
            </View>
            <DividerL />
          </>
        )}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: colors.borderColor}}></View>
        )}
        renderItem={item => renderItem(item)}
        keyExtractor={(item, index) => index}
        onEndReached={() => {}}
      />
    </SafeAreaView>
  );
};

export default Notice;
