import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Alert,
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
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useMutation} from 'react-query';
import authAPI from '../../api/modules/authAPI';

const SignForm = ({navigation}) => {
  const mutateCheckId = useMutation(authAPI._checkId, {
    onSuccess: e => {
      Alert.alert('알림', `${e.msg}`);
    },
  });
  const mutateSendCode = useMutation(authAPI._sendCode, {
    onSuccess: e => {
      Alert.alert('알림', `인증번호가 발송 되었습니다.`);
      console.log('e', e);
      fm.setFieldValue('mt_certify_check', e.data.arrItems.certno);
    },
  });

  const fm = useFormik({
    initialValues: {
      mt_id: '',
      mt_pwd: '',
      mt_pwd_re: '',
      mt_hp: '',
      mt_certify: '',
      mt_certify_check: '',
      mt_nickname: '',
      mt_email: '',
    },

    validationSchema: yup.object({
      mt_id: yup.string().required('아이디를 입력해주세요.'),
      mt_pwd: yup.string().required('비밀번호를 입력해주세요.'),
      mt_pwd_re: yup.string().required('비밀번호를 입력해주세요.'),
      mt_hp: yup.string().required('휴대폰번호를 입력해주세요.'),
      mt_certify: yup
        .string()
        .required('인증번호를 입력해주세요.')
        .oneOf(
          [yup.ref('mt_certify_check'), null],
          '인증번호가 일치하지 않습니다.',
        ),
      mt_nickname: yup.string().required('닉네임을 입력해주세요.'),
      mt_email: yup.string().email().required('이메일을 입력해주세요.'),
    }),
    onSubmit: info => handleSubmit(info),
  });

  const handleSubmit = () => {
    console.log('summited');
  };

  const _checkId = () => {
    const data = {mt_id: fm.values.mt_id};
    mutateCheckId.mutate(data);
  };

  const _sendCode = () => {
    const data = {mt_hp: fm.values.mt_hp};
    mutateSendCode.mutate(data);
  };

  const _vaildateCode = () => {
    console.log('certify', fm.values.mt_certify_check);
    if (
      fm.values.mt_certify_check &&
      fm.values.mt_certify === fm.values.mt_certify_check
    )
      Alert.alert('휴대폰인증', '휴대폰인증이 완료되었습니다.');
    else Alert.alert('휴대폰인증', '인증번호가 일치하지 않습니다.');
  };

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'회원가입'} navigation={navigation} />
      <ScrollView>
        <View style={{paddingHorizontal: 22}}>
          <TextBold>아이디</TextBold>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Input formik={fm} value={'mt_id'} flex={1} />
            <Button
              text={'중복확인'}
              onPress={() => {
                _checkId();
              }}
            />
          </View>

          {/* {console.log(fm.errors)} */}
          <View style={{marginTop: 20}}>
            <TextBold>비밀번호</TextBold>
            <Input
              formik={fm}
              marginTop={10}
              marginBottom={7}
              secureTextEntry
              value={'mt_pwd'}
            />
            <TextBold>비밀번호 재입력</TextBold>
            <Input
              formik={fm}
              value={'mt_pwd_re'}
              marginTop={7}
              secureTextEntry
            />
          </View>

          <View style={{marginTop: 20}}>
            <TextBold>휴대폰 번호</TextBold>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Input
                value={'mt_hp'}
                formik={fm}
                flex={1}
                placeholder={'휴대폰 번호를 입력해주세요.'}
              />
              <Button text={'인증번호 발송'} onPress={() => _sendCode()} />
            </View>
            {/* 인증번호 작성 */}
            <View style={{flexDirection: 'row', marginTop: 7}}>
              {/* <TextInput keyboardType='numeric'></TextInput> */}
              <Input
                formik={fm}
                value={'mt_certify'}
                flex={1}
                keyboardType={'numeric'}
                placeholder={'인증번호를 입력해주세요.'}
              />
              <Button
                borderWidth={1}
                text={'인증확인'}
                onPress={() => _vaildateCode()}
              />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <TextBold>닉네임</TextBold>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Input formik={fm} value={'mt_nickname'} flex={1} />
              <Button text={'중복확인'} />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <TextBold>이메일</TextBold>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Input formik={fm} value={'mt_email'} flex={1} />
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
