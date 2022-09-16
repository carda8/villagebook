import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useState} from 'react';
import {Image, Linking, Platform, Pressable, Text, View} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {_guestAlert} from '../../config/utils/modules';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {setIsLifeStyle} from '../../store/reducers/CategoryReducer';
import colors from '../../styles/colors';
import {customAlert} from '../CustomAlert';
import Divider from '../Divider';
import DividerL from '../DividerL';
import Loading from '../Loading';
import ReviewSimple2 from '../reviews/ReviewSimple2';
import TextBold from '../text/TextBold';
import TextLight from '../text/TextLight';
import TextNotoM from '../text/TextNotoM';
import TextRegular from '../text/TextRegular';
import LikeShare from './LikeShare';
import MenuDescTab from './MenuDescTab';

const MenuDesc = ({navigation, info, routeData, categoryMain, likeCount}) => {
  const {mutateGetStoreCoupon} = useCustomMutation();
  const {isLifeStyle} = useSelector(state => state.categoryReducer);
  const {isGuest} = useSelector(state => state.authReducer);

  const dispatch = useDispatch();
  const [moreInfo, setMoreInfo] = useState(false);
  const [more, setMore] = useState(false);
  const storeInfo = info?.data?.arrItems ?? info;
  console.log('info', storeInfo);
  // return <Loading />;

  const _getCoupon = () => {
    const data = {
      jumju_id: storeInfo.mb_id,
      jumju_code: storeInfo.mb_jumju_code,
    };
    console.log('data', data);
    mutateGetStoreCoupon.mutate(data, {
      onSettled: e => {
        navigation.navigate('PaymentMethod', {
          useCoupon: true,
          storeCoupon: e.data.arrItems ?? [],
          download: true,
          storeInfo: storeInfo,
        });

        console.log('e', e);
      },
    });
  };

  const _copyAdd = async str => {
    Clipboard.setString(str);
    customAlert('알림', '주소가 복사되었습니다.');
    // ToastAndroid.show('주소가 복사되었습니다.', ToastAndroid.SHORT);
  };
  return (
    <>
      <View
        style={{
          top: -40,
          height: 81,
          marginHorizontal: 22,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Shadow distance={5}>
          <View
            style={{
              borderRadius: 30,
              borderWidth: 2,
              borderColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.storeIcon,
            }}>
            <Image
              source={{uri: storeInfo.store_logo}}
              resizeMode="contain"
              style={{width: 81, height: 81, borderRadius: 30}}
            />
          </View>
        </Shadow>
        <View style={{alignSelf: 'flex-end'}}>
          <LikeShare
            storeInfo={storeInfo}
            categoryMain={categoryMain}
            likeCount={likeCount}
            navigation={navigation}
          />
        </View>
      </View>

      <View style={{top: -27}}>
        <View
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: 22,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1}}>
              <TextBold style={{fontSize: 26}}>
                {storeInfo.mb_biz_name ?? storeInfo.mb_company}
              </TextBold>
            </View>
          </View>

          {!isLifeStyle && <ReviewSimple2 info={storeInfo} />}
        </View>
        {isLifeStyle && (
          <>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 22,
              }}>
              <Pressable
                onPress={() => {
                  Linking.openURL(`tel:${storeInfo.mb_tel}`);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.couponBG,
                  borderWidth: 1,
                  borderColor: colors.borderColor,
                  height: 50,
                  borderRadius: 8,
                  marginTop: 7,
                  marginBottom: 20,
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1.6, alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: colors.primary,
                    }}>
                    전화하기
                  </Text>
                </View>
                <View style={{flex: 2}}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: colors.primary,
                    }}>
                    동네북보고 전화했어요.{'\n'}라고 말하면 문의가 빨라요
                  </Text>
                </View>
              </Pressable>
              {/* <View style={{flexDirection: 'row', marginBottom: 11}}>
                <View style={{width: 100}}>
                  <TextRegular style={{color: colors.fontColor99}}>
                    대표장명
                  </TextRegular>
                </View>
                <View style={{flex: 1}}>
                  <TextRegular style={{color: colors.fontColor3}}>
                    {storeInfo.mb_name}
                  </TextRegular>
                </View>
              </View> */}

              <View style={{flexDirection: 'row', marginBottom: 11}}>
                <View style={{width: 100}}>
                  <TextRegular style={{color: colors.fontColor99}}>
                    주소
                  </TextRegular>
                </View>
                <View style={{flex: 1}}>
                  <TextRegular style={{color: colors.fontColor3}}>
                    {storeInfo?.mb_addr1} {storeInfo?.mb_addr2}
                  </TextRegular>
                </View>
                <Pressable
                  onPress={() =>
                    _copyAdd(storeInfo?.mb_addr1 + ' ' + storeInfo?.mb_addr2)
                  }
                  hitSlop={10}
                  style={{
                    width: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: colors.borderColor,
                  }}>
                  <TextRegular style={{color: colors.primary, fontSize: 12}}>
                    복사
                  </TextRegular>
                </Pressable>
              </View>

              <View style={{flexDirection: 'row', marginBottom: 11}}>
                <View style={{width: 100}}>
                  <TextRegular
                    style={{
                      color: colors.fontColor99,
                    }}>
                    연락처
                  </TextRegular>
                </View>
                <View style={{flex: 1}}>
                  <TextRegular style={{color: colors.fontColor3}}>
                    {storeInfo.mb_tel}
                  </TextRegular>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginBottom: 11}}>
                <View style={{width: 100}}>
                  <TextRegular style={{color: colors.fontColor99}}>
                    홈페이지
                  </TextRegular>
                </View>
                <View style={{flex: 1}}>
                  <Pressable
                    onPress={() => Linking.openURL(`${storeInfo.mb_homepage}`)}>
                    <TextRegular style={{color: colors.fontColor3}}>
                      {storeInfo?.mb_homepage ? storeInfo?.mb_homepage : '-'}
                    </TextRegular>
                  </Pressable>
                </View>
              </View>

              <View
                style={{
                  height: moreInfo ? 'auto' : 0,
                  flexDirection: 'row',
                  marginBottom: 11,
                }}>
                <View style={{width: 100}}>
                  <TextRegular
                    style={{
                      color: colors.fontColor99,
                    }}>
                    영업시간
                  </TextRegular>
                </View>
                <View style={{flex: 1}}>
                  <TextRegular style={{color: colors.fontColor3}}>
                    {storeInfo?.mb_opening_hours
                      ? storeInfo.mb_opening_hours
                      : '-'}
                  </TextRegular>
                </View>
              </View>

              <Pressable
                onPress={() => setMoreInfo(!moreInfo)}
                style={{
                  width: '100%',
                  height: 40,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('~/assets/btn_top_left.png')}
                  style={{
                    tintColor: colors.primary,
                    width: 30,
                    height: 30,
                    transform: [{rotate: moreInfo ? '90deg' : '270deg'}],
                  }}
                  resizeMode={'contain'}
                />
              </Pressable>
            </View>

            <DividerL />
            <View style={{padding: 22}}>
              <View style={{marginBottom: 20}}>
                <TextNotoM style={{fontSize: 18, color: colors.fontColor6}}>
                  소개
                </TextNotoM>
              </View>
              <View style={{minHeight: 80, height: more ? 'auto' : 80}}>
                <TextRegular style={{color: colors.fontColor2}}>
                  {storeInfo.mb_memo}
                </TextRegular>
              </View>
            </View>
            <Pressable
              onPress={() => setMore(!more)}
              style={{
                width: '100%',
                height: 40,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('~/assets/btn_top_left.png')}
                style={{
                  tintColor: colors.primary,
                  width: 30,
                  height: 30,
                  transform: [{rotate: more ? '90deg' : '270deg'}],
                }}
                resizeMode={'contain'}
              />
            </Pressable>
            <DividerL />
            <View style={{paddingHorizontal: 22, paddingTop: 22}}>
              <TextNotoM style={{fontSize: 18, color: colors.fontColor6}}>
                위치
              </TextNotoM>
            </View>
          </>
        )}

        {!isLifeStyle && (
          <>
            <Pressable
              onPress={() => {
                if (!isGuest) {
                  _getCoupon();
                } else {
                  _guestAlert(navigation);
                }
              }}
              style={{
                borderWidth: 1,
                borderColor: colors.borderColor,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.couponBG,
                marginHorizontal: 22,
                height: 50,
                borderRadius: 8,
                marginTop: 19,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: colors.primary,
                }}>
                이 매장의 할인 쿠폰받기
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                Linking.openURL(`tel:${storeInfo.mb_tel}`);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.couponBG,
                borderWidth: 1,
                borderColor: colors.borderColor,
                height: 50,
                borderRadius: 8,
                marginTop: 7,
                marginBottom: 20,
                flexDirection: 'row',
                marginHorizontal: 22,
              }}>
              <View style={{flex: 1.6, alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: colors.primary,
                  }}>
                  전화하기
                </Text>
              </View>
              <View style={{flex: 2}}>
                <Text
                  style={{
                    fontSize: 11,
                    color: colors.primary,
                  }}>
                  동네북보고 전화했어요.{'\n'}라고 말하면 문의가 빨라요
                </Text>
              </View>
            </Pressable>
            <MenuDescTab
              info={storeInfo}
              navigation={navigation}
              routeData={routeData}
            />
          </>
        )}
      </View>
    </>
  );
};

export default React.memo(MenuDesc);
