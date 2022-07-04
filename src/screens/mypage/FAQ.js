import {View, Text, SafeAreaView, FlatList, Pressable} from 'react-native';
import React from 'react';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import colors from '../../styles/colors';
import TextBold from '../../component/text/TextBold';
import Divider from '../../component/Divider';
import DividerL from '../../component/DividerL';
import dayjs from 'dayjs';
import TextRegular from '../../component/text/TextRegular';
import TextLight from '../../component/text/TextLight';
import TextMedium from '../../component/text/TextMedium';

const FAQ = ({navigation}) => {
  const arr = [
    {
      title: '답변대기',
      date: dayjs().format('YYYY-MM-DD'),
      type: '1:1 고객 문의',
    },
    {
      title: '답변완료',
      date: dayjs().format('YYYY-MM-DD'),
      type: '1:1 고객 문의',
    },
    {
      title: '답변대기',
      date: dayjs().format('YYYY-MM-DD'),
      type: '고객 문의',
    },
    {
      title: '답변대기',
      date: dayjs().format('YYYY-MM-DD'),
      type: '고객 문의',
    },
    {
      title: '답변대기',
      date: dayjs().format('YYYY-MM-DD'),
      type: '고객 문의',
    },
    {
      title: '답변대기',
      date: dayjs().format('YYYY-MM-DD'),
      type: '고객 문의',
    },
    {
      title: '답변대기',
      date: dayjs().format('YYYY-MM-DD'),
      type: '고객 문의',
    },
    {
      title: '답변대기',
      date: dayjs().format('YYYY-MM-DD'),
      type: '고객 문의',
    },
  ];

  const renderItem = item => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('FAQWrite', {boardIndex: item.index});
        }}
        style={{
          height: 70,
          paddingHorizontal: 22,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderColor,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <TextRegular>{item.item.title}</TextRegular>
          <TextLight style={{fontSize: 12, marginLeft: 10}}>
            {item.item.date}
          </TextLight>
        </View>
        <TextMedium>{item.item.type}</TextMedium>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'1:1문의'} navigation={navigation} showCart={true} />
      <FlatList
        data={arr}
        ListHeaderComponent={() => (
          <>
            <Pressable
              onPress={() => {
                navigation.navigate('FAQWrite');
              }}
              style={{
                height: 55,
                marginVertical: 10,
                backgroundColor: colors.couponBG,
                marginHorizontal: 22,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 7,
              }}>
              <TextBold style={{color: colors.fontColor2}}>문의하기</TextBold>
            </Pressable>
            <DividerL />
          </>
        )}
        renderItem={item => renderItem(item)}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default FAQ;
