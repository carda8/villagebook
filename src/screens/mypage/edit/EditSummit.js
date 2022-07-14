import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../../../component/Header';
import colors from '../../../styles/colors';
import TextRegular from '../../../component/text/TextRegular';
import TextBold from '../../../component/text/TextBold';
import EditConfig from './EditConfig';
import TextMedium from '../../../component/text/TextMedium';

const EditSummit = ({navigation, route}) => {
  const routeData = route.params?.target;
  const NickNameEmail = () => {
    return (
      <>
        <View style={{padding: 22}}>
          <TextRegular style={{color: colors.fontColor2}}>
            닉네임 변경
          </TextRegular>

          <TextInput
            style={{
              height: 50,
              marginTop: 5,
              marginBottom: 20,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: colors.borderColor,
              paddingHorizontal: 10,
            }}
            placeholder="닉네임을 입력하세요"
          />

          <TextRegular style={{color: colors.fontColor2}}>
            이메일 변경
          </TextRegular>

          <TextInput
            style={{
              height: 50,
              marginTop: 5,
              marginBottom: 20,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: colors.borderColor,
              paddingHorizontal: 10,
            }}
            placeholder="이메일을 입력하세요"
          />

          <TextRegular style={{color: colors.fontColor2}}>
            프로필 사진
          </TextRegular>
          <Pressable style={{marginTop: 10}}>
            <Image
              source={require('~/assets/no_use_img.png')}
              style={{width: 100, height: 100, borderRadius: 10}}
            />
          </Pressable>

          <Pressable
            style={{
              height: 50,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              borderRadius: 10,
            }}>
            <TextBold style={{color: 'white'}}>내정보수정</TextBold>
          </Pressable>
        </View>
      </>
    );
  };

  const Phone = () => {
    return (
      <>
        <View style={{padding: 22}}>
          <TextRegular style={{color: colors.fontColor2}}>
            휴대폰 인증
          </TextRegular>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              marginBottom: 5,
            }}>
            <TextInput
              style={{
                flex: 1,
                height: 50,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: colors.borderColor,
                paddingHorizontal: 10,
                marginRight: 10,
              }}
              placeholder="휴대폰 번호를 입력하세요"
            />
            <Pressable onPress={() => {}}>
              <View
                style={{
                  width: 100,
                  height: 50,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextMedium style={{color: colors.fontColor2}}>
                  인증번호
                </TextMedium>
              </View>
            </Pressable>
          </View>

          <TextInput
            style={{
              flex: 1,
              height: 50,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: colors.borderColor,
              paddingHorizontal: 10,
            }}
            placeholder="인증번호를 입력하세요"
          />

          <Pressable
            style={{
              height: 50,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              borderRadius: 10,
            }}>
            <TextBold style={{color: 'white'}}>휴대폰번호 변경</TextBold>
          </Pressable>
        </View>
      </>
    );
  };

  const Password = () => {
    return (
      <>
        <View style={{padding: 22}}>
          <TextRegular style={{color: colors.fontColor2}}>
            새로운 비밀번호
          </TextRegular>

          <TextInput
            style={{
              flex: 1,
              height: 50,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: colors.borderColor,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 10,
            }}
            placeholder="새 비밀번호를 입력해주세요"
          />

          <TextInput
            style={{
              flex: 1,
              height: 50,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: colors.borderColor,
              paddingHorizontal: 10,
            }}
            placeholder="새 비밀번호를 다시 입력해주세요"
          />

          <Pressable
            style={{
              height: 50,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              borderRadius: 10,
            }}>
            <TextBold style={{color: 'white'}}>비밀번호 변경</TextBold>
          </Pressable>
        </View>
      </>
    );
  };

  return (
    <View>
      <Header title={'정보 수정'} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {(routeData === EditConfig.target.email ||
          routeData === EditConfig.target.nickname) && <NickNameEmail />}
        {routeData === EditConfig.target.phone && <Phone />}
        {routeData === EditConfig.target.password && <Password />}
      </ScrollView>
    </View>
  );
};

export default EditSummit;
