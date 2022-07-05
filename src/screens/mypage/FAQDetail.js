import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import TextBold from '../../component/text/TextBold';
import Header from '../../component/Header';
import colors from '../../styles/colors';
import TextRegular from '../../component/text/TextRegular';

const FAQDetail = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'1:1문의'} navigation={navigation} showCart={true} />
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 22, marginTop: 20}}>
          <TextBold>제목</TextBold>
          <View
            style={{
              ...commonStyles.inputContainer,
              marginTop: 5,
              marginBottom: 20,
              justifyContent: 'center',
            }}>
            <TextRegular>제목</TextRegular>
          </View>

          <TextBold>문의내용</TextBold>
          <View
            style={{
              ...commonStyles.inputContainer,
              paddingTop: 10,
              marginTop: 5,
              marginBottom: 20,
              height: 200,
            }}>
            <TextRegular>123</TextRegular>
          </View>

          <Pressable
            style={{
              height: 50,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.couponBG,
              borderRadius: 10,
            }}>
            <TextBold style={{color: colors.fontColor2}}>수정</TextBold>
          </Pressable>
          <Pressable
            style={{
              height: 50,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.inputBoxBG,
              borderRadius: 10,
            }}>
            <TextBold style={{color: colors.fontColor2}}>삭제</TextBold>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQDetail;
