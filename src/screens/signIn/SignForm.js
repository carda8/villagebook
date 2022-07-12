import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import TextBold from '../../component/text/TextBold';
import colors from '../../styles/colors';
import TextRegular from '../../component/text/TextRegular';
import {Input} from '../../component/Input';
import {Button} from '../../component/Button';

const SignForm = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'회원가입'} navigation={navigation} />
      <ScrollView>
        <View style={{paddingHorizontal: 22}}>
          <TextBold>아이디</TextBold>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Input flex={1} />
            <Button text={'중복확인'} />
          </View>

          <View style={{marginTop: 20}}>
            <TextBold>비밀번호</TextBold>
            <Input marginTop={10} secureTextEntry />
            <Input marginTop={7} secureTextEntry />
          </View>

          <View style={{marginTop: 20}}>
            <TextBold>휴대폰 번호</TextBold>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Input flex={1} secureTextEntry />
              <Button text={'인증번호 발송'} />
            </View>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <Input flex={1} secureTextEntry />
              <Button borderWidth={1} text={'인증확인'} />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <TextBold>닉네임</TextBold>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Input flex={1} />
              <Button text={'중복확인'} />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <TextBold>이메일</TextBold>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Input flex={1} />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <TextBold>프로필사진</TextBold>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginTop: 10,
                backgroundColor: colors.inputBoxBG,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('~/assets/ico_plus.png')}
                style={{width: 30, height: 30}}
              />
            </View>
          </View>

          <Button flex={1} marginTop={30} marginBottom={30} text={'가입완료'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignForm;

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
  },
});
