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

const FAQWrite = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'1:1문의'} navigation={navigation} showCart={true} />
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 22, marginTop: 20}}>
          <TextBold>제목</TextBold>
          <TextInput
            placeholder="제목을 입력하세요"
            style={{
              ...commonStyles.inputContainer,
              marginTop: 5,
              marginBottom: 20,
            }}></TextInput>
          <TextBold>문의내용</TextBold>
          <TextInput
            textAlignVertical="top"
            multiline
            maxLength={500}
            placeholder={'문의내용을 입력하세요(최대 500자)'}
            style={{
              ...commonStyles.inputContainer,
              marginTop: 5,
              marginBottom: 20,
              height: 200,
            }}></TextInput>
          <Pressable
            style={{
              height: 70,
              backgroundColor: colors.inputBoxBG,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('~/assets/btn_add.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: colors.fontColor2,
                marginRight: 10,
              }}
            />
            <TextBold
              style={{color: colors.fontColor2, includeFontPadding: false}}>
              문의사진을 등록해주세요. (최대 5개)
            </TextBold>
          </Pressable>

          <Pressable
            style={{
              height: 50,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.couponBG,
              borderRadius: 10,
            }}>
            <TextBold style={{color: colors.fontColor2}}>문의하기</TextBold>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQWrite;
