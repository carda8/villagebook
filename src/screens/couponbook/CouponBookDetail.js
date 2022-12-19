import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import colors from '../../styles/colors';
import CouponList from './CouponList';
import DividerL from '../../component/DividerL';
import TextBold from '../../component/text/TextBold';
import {Image} from 'react-native';
import TextMedium from '../../component/text/TextMedium';
import {ScrollView} from 'react-native';
import TextLight from '../../component/text/TextLight';
import {Shadow} from 'react-native-shadow-2';
import {Pressable} from 'react-native';
import MiniMap from '../map/MiniMap';
import TextRegular from '../../component/text/TextRegular';
import {useDispatch} from 'react-redux';
import {setIsLifeStyle} from '../../store/reducers/CategoryReducer';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useEffect} from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';

const CouponBookDetail = ({navigation, route}) => {
  const params = route?.params;
  console.log('params', params);
  const dispatch = useDispatch();
  const {mttCpnBookDtl, mttCpbUse, mttCpbSave, mttCpnBookMyBoxDtl} =
    useCustomMutation();
  const [cpnDetail, setCpnDetail] = useState();
  const {userInfo} = useSelector(state => state.authReducer);
  const [isSaved, setIsSaved] = useState(false);

  const _onPressInfo = () => {
    dispatch(setIsLifeStyle(true));
    navigation.navigate('LifeStyleStoreInfo', {
      jumju_id: cpnDetail?.cp_jumju_id
        ? cpnDetail?.cp_jumju_id
        : params?.cp_jumju_id,
      jumju_code: cpnDetail?.cp_jumju_code
        ? cpnDetail?.cp_jumju_code
        : params?.cp_jumju_code,
      mb_company: cpnDetail?.store_name
        ? cpnDetail?.store_name
        : params?.store_name,
      category: 'lifestyle',
      likeCount: '0',
    });
  };

  const _getDtl = () => {
    const data = {
      jumju_id: params.cp_jumju_id,
      jumju_code: params.cp_jumju_code,
      cp_no: params.cp_no,
      cp_id: params.cp_id,
      mt_id: userInfo.mt_id,
    };
    console.log('data', data);
    mttCpnBookDtl.mutate(data, {
      onSuccess: res => {
        console.log('res _getDtl ::', res.data.arrItems);
        setCpnDetail(res.data.arrItems);
        if (res.data.arrItems?.cp_exist === 'Y') setIsSaved(true);
      },
    });
  };

  const _getBoxDtl = () => {
    const data = {
      jumju_id: params.cp_jumju_id,
      jumju_code: params.cp_jumju_code,
      cp_no: params.cp_no,
      cp_id: params.cp_id,
      mt_id: userInfo.mt_id,
    };
    mttCpnBookMyBoxDtl.mutate(data, {
      onSuccess: res => {
        console.log('res _getDtl ::', res.data.arrItems);
        setCpnDetail(res.data.arrItems);
        if (res.data.arrItems?.cp_exist === 'Y') setIsSaved(true);
      },
    });
  };

  const _onPressUse = () => {
    const data = {
      jumju_id: params.cp_jumju_id,
      jumju_code: params.cp_jumju_code,
      mt_id: userInfo.mt_id,
      coupon_id: params.cp_id,
    };
    mttCpbUse.mutate(data, {
      onSuccess: res => {
        console.log('userInfo ::', userInfo);
        if (res.data.resultItem.result === 'true') {
          Alert.alert('쿠폰북', '쿠폰북 사용 성공');
          _getDtl();
        } else {
          Alert.alert('쿠폰북', '중복 사용은 불가능합니다');
        }
      },
    });
    console.log('## PRESS ::', data);
  };
  // 쿠폰 받고 이미지 변경

  const _onPressSave = () => {
    // console.log('element', element);
    const data = {
      jumju_id: params.cp_jumju_id,
      jumju_code: params.cp_jumju_code,
      mt_id: userInfo.mt_id,
      coupon_id: params.cp_id,
    };
    console.log('data', data);
    mttCpbSave.mutate(data, {
      onSuccess: res => {
        if (res.data.resultItem.result === 'true') {
          Alert.alert('쿠폰북', '쿠폰북 다운로드 성공');
          _getDtl();
          setIsSaved(true);
        } else Alert.alert('쿠폰북', '중복 다운로드는 할 수 없습니다');
      },
    });
  };

  useEffect(() => {
    if (params.isMyBox) {
      _getBoxDtl();
    } else {
      _getDtl();
    }

    console.log('route ::', route.params);
  }, [isSaved]);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <Header
          navigation={navigation}
          title={'쿠폰 상세보기'}
          style={{
            borderBottomWidth: 1,
            borderColor: colors.borderColor,
            marginBottom: 15,
          }}
        />
        {/* 상단 쿠폰 */}
        {cpnDetail && (
          <View style={{marginHorizontal: 14}}>
            <Shadow distance={5} offset={[0, 2]} style={{width: '100%'}}>
              <Pressable
                onPress={() => {
                  // navigation.navigate('CouponBookDetail');
                }}
                style={{
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: 10,
                  height: 100,
                  marginBottom: 15,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                }}>
                <Image
                  source={
                    cpnDetail?.store_logo
                      ? {uri: cpnDetail.store_logo}
                      : require('~/assets/no_img.png')
                  }
                  style={{height: 80, width: 80}}
                  resizeMode="cover"
                />
                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextMedium
                      style={{color: colors.fontColor3, flex: 1}}
                      numberOfLines={1}>
                      {cpnDetail?.store_name}
                    </TextMedium>
                    <TextLight
                      style={{
                        color: colors.fontColorA,
                        fontSize: 11,
                        marginRight: 5,
                      }}>
                      {cpnDetail?.cp_end_txt}
                    </TextLight>
                  </View>
                  <TextBold
                    style={{fontSize: 16, color: colors.fontColor2}}
                    numberOfLines={2}>
                    {cpnDetail?.cp_subject}
                  </TextBold>
                  <TextBold
                    style={{fontSize: 13, color: colors.fontColorA2}}
                    numberOfLines={2}>
                    {cpnDetail?.cp_memo}
                  </TextBold>
                </View>
                <View
                  style={{
                    width: 1,
                    height: 60,
                    backgroundColor: colors.primary,
                    alignSelf: 'center',
                    marginRight: 5,
                  }}
                />
                {console.log('::::::::: ', cpnDetail.cp_exist, isSaved)}
                {cpnDetail.cp_exist === 'N' || !isSaved ? (
                  <Pressable
                    onPress={() => {
                      _onPressSave();
                    }}
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      source={require('~/assets/down_coupon.png')}
                      style={{width: 45, height: 45}}
                      resizeMode="contain"
                    />
                    <TextLight style={{fontSize: 12}}>
                      {cpnDetail?.cp_coupon_download_txt}
                    </TextLight>
                  </Pressable>
                ) : (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      source={require('~/assets/down_complet.png')}
                      style={{width: 45, height: 45}}
                      resizeMode="contain"
                    />
                    <TextLight style={{fontSize: 12, color: colors.fontColor6}}>
                      {'받기완료'}
                    </TextLight>
                  </View>
                )}
              </Pressable>
            </Shadow>
          </View>
        )}
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: colors.borderColor,
          }}
        />

        {/* 오시는 길, 주소, 지도 */}
        <View style={{padding: 14}}>
          <TextBold>오시는 길</TextBold>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Image
              source={require('~/assets/ico_map_book.png')}
              style={{
                width: 20,
                height: 20,
                marginRight: 5,
                tintColor: colors.primary,
              }}
              resizeMode="contain"
            />
            <TextMedium>{cpnDetail?.store_address}</TextMedium>
          </View>
          {/* 지도 */}
          <View
            style={{
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <MiniMap
              canUseZoom={true}
              height={240}
              isStore
              lat={params?.store_lat ? params?.store_lat : undefined}
              lng={params?.store_lng ? params?.store_lng : undefined}
              // width={200}
            />
          </View>
        </View>
        {/* 안내사항  */}
        <View
          style={{
            padding: 14,
            marginTop: 10,
            borderTopWidth: 1,
            // borderBottomWidth: 1,
            borderColor: colors.borderColor,
          }}>
          <TextBold>안내사항</TextBold>
          <TextRegular>{cpnDetail?.store_memo}</TextRegular>
          <Pressable
            onPress={() => {
              _onPressInfo();
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: '100%',
              backgroundColor: colors.borderColor,
              borderRadius: 10,
              marginTop: 30,
            }}>
            <TextBold style={{color: colors.fontColor6, fontSize: 16}}>
              매장 정보 더보기
            </TextBold>
          </Pressable>
        </View>
      </ScrollView>
      {cpnDetail?.cp_exist === 'Y' && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderColor: colors.borderColor,
            bottom: 0,
            paddingBottom: 10,
          }}>
          <View style={{marginHorizontal: 14}}>
            <View style={{marginVertical: 10}}>
              <TextRegular style={{color: colors.fontColor3}}>
                쿠폰을 사용한 후{'<사용완료>'}버튼을 꼭 눌러주세요.
              </TextRegular>
            </View>
            <Pressable
              onPress={() =>
                cpnDetail?.cp_use === 'N'
                  ? _onPressUse()
                  : Alert.alert('쿠폰북', '이미 사용완료된 쿠폰입니다')
              }
              style={{
                height: 50,
                backgroundColor:
                  cpnDetail?.cp_use === 'N' ? colors.primary : '#E3E3E3',
                borderRadius: 22,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextBold style={{color: 'white', fontSize: 18}}>
                {/* {cpnDetail?.cp_use === 'N' ? :'사용완료'} */}
                사용완료
              </TextBold>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CouponBookDetail;
