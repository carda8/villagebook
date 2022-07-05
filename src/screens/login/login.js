import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import AutoLogin from '../../component/loginScreen/AutoLogin';
import Input from '../../component/loginScreen/Input';
import TextMedium from '../../component/text/TextMedium';
import TextRegular from '../../component/text/TextRegular';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyle';

const Login = ({navigation}) => {
  const layout = useWindowDimensions();
  const Divider = () => {
    return (
      <View style={{width: 1, height: 20, backgroundColor: colors.colorE3}} />
    );
  };
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <ScrollView>
        <FastImage
          style={{width: '100%', height: layout.height * 0.4}}
          source={require('../../assets/login_img.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
        <AutoLogin />
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: 22,
            paddingTop: 13,
          }}>
          <Input />
          <Pressable
            onPress={() => {
              navigation.navigate('Main');
            }}
            style={{
              width: '100%',
              height: 50,
              borderRadius: 5,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 13,
            }}>
            <TextMedium style={{fontSize: 17, color: 'white'}}>
              로그인
            </TextMedium>
          </Pressable>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginBottom: 70,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => {}}>
              <TextRegular style={{fontSize: 16}}>아이디 찾기</TextRegular>
            </Pressable>
            <Divider />
            <Pressable onPress={() => {}}>
              <TextRegular style={{fontSize: 16}}>비밀번호 찾기</TextRegular>
            </Pressable>
            <Divider />
            <Pressable onPress={() => {}}>
              <TextRegular style={{fontSize: 16}}>회원가입</TextRegular>
            </Pressable>
          </View>

          <Pressable
            style={{
              width: '100%',
              height: 20,
              alignItems: 'center',
              marginBottom: 26,
            }}>
            <TextMedium
              style={{
                fontSize: 16,
                textAlign: 'center',
              }}>
              SNS 계정으로 로그인
            </TextMedium>
          </Pressable>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 1,
              marginBottom: 20,
            }}>
            {/* 네이버 */}
            <Pressable
              onPress={() => {}}
              style={{
                ...style.snsButton,
              }}>
              <Image
                source={require('../../assets/sns_naver.png')}
                style={{...style.snsImage}}
                resizeMode={'contain'}></Image>
            </Pressable>
            {/* 페이스북 */}
            <Pressable
              onPress={() => {}}
              style={{
                ...style.snsButton,
              }}>
              <Image
                source={require('../../assets/sns_facebook.png')}
                style={{...style.snsImage}}
                resizeMode={'contain'}></Image>
            </Pressable>
            {/* 카카오 */}
            <Pressable
              onPress={() => {}}
              style={{
                ...style.snsButton,
              }}>
              <Image
                source={require('../../assets/sns_kakao.png')}
                style={{...style.snsImage}}
                resizeMode={'contain'}></Image>
            </Pressable>
            {/* 애플 */}
            {Platform.OS === 'ios' && (
              <Pressable
                onPress={() => {}}
                style={{
                  ...style.snsButton,
                }}>
                <Image
                  source={require('../../assets/sns_apple.png')}
                  style={{...style.snsImage}}
                  resizeMode={'contain'}></Image>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const style = StyleSheet.create({
  snsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 60,
    marginRight: 6,
  },
  snsImage: {
    width: '100%',
    height: '100%',
  },
});