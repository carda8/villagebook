import React, {useEffect, useState} from 'react';
import {
  Alert,
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
import Input from '../../component/loginScreen/Input';
import TextMedium from '../../component/text/TextMedium';
import TextRegular from '../../component/text/TextRegular';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyle';
import {_reqAPI} from '../../api/apiModule';
import loginConfig from './loginConfig';
import {useMutation} from 'react-query';
import authAPI from '../../api/modules/authAPI';
import Loading from '../../component/Loading';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '../../store/reducers/AuthReducer';
import {useFormik} from 'formik';
import * as yup from 'yup';
import localStorageConfig from '../../store/localStorage/localStorageConfig';
import AuthStorageModuel from '../../store/localStorage/AuthStorageModuel';
import SNSLogin from './SNSLogin';

const Login = ({navigation}) => {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const [logading, setLoading] = useState(false);

  const mutate = useMutation(authAPI._login, {
    onSuccess: async e => {
      if (e.result === 'false') {
        Alert.alert(
          '로그인 실패',
          '아이디 혹은 비밀번호가 일치하지 않습니다.',
          [
            {
              text: '확인',
              onPress: () => {
                setLoading(false);
                navigation.reset({
                  routes: [{name: 'Login'}],
                });
              },
            },
          ],
        );
      } else {
        console.log('login e', e);
        await AuthStorageModuel._setItemAutoLogin(
          localStorageConfig.state.true,
        );
        await AuthStorageModuel._setItemUserToken(e.data.arrItems.mt_app_token);
        await AuthStorageModuel._setItemUserId(e.data.arrItems.mt_id);

        dispatch(setUserInfo(e.data.arrItems));
        navigation.reset({
          routes: [{name: 'Main'}],
        });
      }
    },
  });

  const _login = async e => {
    const data = {
      mt_id: e.mt_id,
      mt_pwd: e.mt_pwd,
    };
    mutate.mutate(data);
  };

  const Divider = () => {
    return (
      <View style={{width: 1, height: 20, backgroundColor: colors.colorE3}} />
    );
  };

  const fm = useFormik({
    initialValues: {
      mt_id: '',
      mt_pwd: '',
    },
    validationSchema: yup.object({
      mt_id: yup.string().required('아이디를 입력해주세요.'),
      mt_pwd: yup.string().required('비밀번호를 입력해주세요.'),
    }),
    onSubmit: info => handleSubmit(info),
  });

  const handleSubmit = e => {
    setLoading(true);
    _login(e);
  };

  if (logading) return <Loading />;
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FastImage
          style={{width: '100%', height: layout.height * 0.4}}
          source={require('../../assets/login_img.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
        {/* <AutoLogin /> */}
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: 22,
            paddingTop: 33,
          }}>
          <Input fm={fm} />
          <Pressable
            onPress={() => {
              if (Object.keys(fm.errors).length === 0) fm.handleSubmit();
              else Alert.alert('알림', fm.errors[Object.keys(fm.errors)[0]]);
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
            <Pressable
              onPress={() => {
                navigation.navigate('FindUserAccount', {
                  target: loginConfig.target.findId,
                });
              }}>
              <TextRegular style={{fontSize: 16}}>아이디 찾기</TextRegular>
            </Pressable>
            <Divider />
            <Pressable
              onPress={() => {
                navigation.navigate('FindUserAccount', {
                  target: loginConfig.target.findPW,
                });
              }}>
              <TextRegular style={{fontSize: 16}}>비밀번호 찾기</TextRegular>
            </Pressable>
            <Divider />
            <Pressable
              onPress={() => {
                navigation.navigate('CheckTerms');
              }}>
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
              onPress={() => SNSLogin._KakaoLogin()}
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
