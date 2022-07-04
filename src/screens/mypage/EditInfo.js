import {View, Text, SafeAreaView, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import commonStyles from '../../styles/commonStyle';
import TextBold from '../../component/text/TextBold';
import TextMedium from '../../component/text/TextMedium';
import colors from '../../styles/colors';
import TextRegular from '../../component/text/TextRegular';

const EditInfo = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'개인정보수정'} navigation={navigation} showCart={true} />
      <View style={{}}>
        <View
          style={{
            height: 50,
            backgroundColor: colors.inputBoxBG,
            justifyContent: 'center',
            paddingHorizontal: 22,
          }}>
          <TextBold style={{color: colors.fontColor2, fontSize: 16}}>
            정보
          </TextBold>
        </View>
        <View
          style={{
            paddingHorizontal: 22,
            height: 220,
            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'space-evenly'}}>
            <TextMedium style={{color: colors.fontColorA}}>닉네임</TextMedium>
            <TextMedium style={{color: colors.fontColorA}}>이메일</TextMedium>
            <TextMedium style={{color: colors.fontColorA}}>
              휴대폰번호
            </TextMedium>
            <TextMedium style={{color: colors.fontColorA}}>비밀번호</TextMedium>
          </View>
          <View
            style={{justifyContent: 'space-evenly', marginLeft: 40, flex: 1}}>
            <TextMedium style={{color: colors.fontColor2}}>닉네임</TextMedium>
            <TextMedium style={{color: colors.fontColor2}}>이메일</TextMedium>
            <TextMedium style={{color: colors.fontColor2}}>
              휴대폰번호
            </TextMedium>
            <TextMedium style={{color: colors.fontColor2}}>비밀번호</TextMedium>
          </View>
          <View style={{justifyContent: 'space-evenly', width: 40}}>
            <Pressable
              onPress={() => {
                navigation.navigate('');
              }}
              hitSlop={10}
              style={{
                ...styles.btnEdit,
              }}>
              <TextMedium style={{color: colors.fontColor2, fontSize: 12}}>
                변경
              </TextMedium>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('');
              }}
              hitSlop={10}
              style={{
                ...styles.btnEdit,
              }}>
              <TextMedium style={{color: colors.fontColor2, fontSize: 12}}>
                변경
              </TextMedium>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('');
              }}
              hitSlop={10}
              style={{
                ...styles.btnEdit,
              }}>
              <TextMedium style={{color: colors.fontColor2, fontSize: 12}}>
                변경
              </TextMedium>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('');
              }}
              hitSlop={10}
              style={{
                ...styles.btnEdit,
              }}>
              <TextMedium style={{color: colors.fontColor2, fontSize: 12}}>
                변경
              </TextMedium>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            height: 25,
            backgroundColor: colors.inputBoxBG,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginTop: 20,
            paddingHorizontal: 22,
          }}>
          <Pressable onPress={() => {}} style={{marginRight: 20}}>
            <TextRegular style={{fontSize: 12, color: colors.fontColorA2}}>
              로그아웃
            </TextRegular>
          </Pressable>
          <Pressable onPress={() => {}} style={{marginRight: 20}}>
            <TextRegular style={{fontSize: 12, color: colors.fontColorA2}}>
              회원탈퇴
            </TextRegular>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditInfo;

const styles = StyleSheet.create({
  btnEdit: {
    height: 20,
    backgroundColor: colors.couponBG,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});
