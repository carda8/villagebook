import React, {useEffect, useState} from 'react';
import {Image, Linking, Platform, Pressable, Text, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {setIsLifeStyle} from '../../store/reducers/CategoryReducer';
import colors from '../../styles/colors';
import Divider from '../Divider';
import DividerL from '../DividerL';
import Loading from '../Loading';
import ReviewSimple2 from '../reviews/ReviewSimple2';
import TextLight from '../text/TextLight';
import TextNotoM from '../text/TextNotoM';
import TextRegular from '../text/TextRegular';
import MenuDescTab from './MenuDescTab';

const MenuDesc = ({navigation, info}) => {
  const {mutateGetStoreCoupon} = useCustomMutation();
  const {isLifeStyle} = useSelector(state => state.categoryReducer);
  const dispatch = useDispatch();
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
  return (
    <>
      <View
        style={{
          top: -40,
          width: 81,
          height: 81,
          marginHorizontal: 22,
          borderRadius: 30,
          borderWidth: 2,
          borderColor: 'white',
          backgroundColor: colors.storeIcon,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          ...Platform.select({
            ios: {
              shadowColor: '#00000029',
              shadowRadius: 5,
              shadowOpacity: 0.6,
              shadowOffset: {
                height: 6,
                width: 0,
              },
            },
            android: {
              elevation: 6,
            },
          }),
        }}>
        <Image
          source={{uri: storeInfo.store_logo}}
          resizeMode="contain"
          style={{width: 81, height: 81}}
        />
      </View>
      <View style={{top: -27}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 22,
          }}>
          <View>
            <Text style={{fontSize: 22}}>
              {storeInfo.mb_biz_name ?? storeInfo.mb_company}
            </Text>
            {!isLifeStyle && <ReviewSimple2 info={storeInfo} />}
          </View>

          <View style={{}}>
            <Pressable
              onPress={() => {
                Linking.openURL(`tel:${storeInfo.mb_tel}`);
              }}
              style={{
                width: 51,
                height: 51,
                borderRadius: 51 / 2,
                borderWidth: 1,
                borderColor: colors.colorE3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('~/assets/ico_call.png')}
                resizeMode="contain"
                style={{width: 25, height: 25}}
              />
            </Pressable>
          </View>
        </View>
        {isLifeStyle && (
          <>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 22,
                paddingTop: 20,
              }}>
              <View style={{flexDirection: 'row', marginBottom: 11}}>
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
              </View>

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
                      {storeInfo.mb_homepage}
                    </TextRegular>
                  </Pressable>
                </View>
              </View>
              {storeInfo.mb_opening_hours ? (
                <View style={{flexDirection: 'row', marginBottom: 11}}>
                  <View style={{width: 100}}>
                    <TextRegular
                      style={{
                        color: colors.fontColor99,
                      }}>
                      영업 시간
                    </TextRegular>
                  </View>
                  <View style={{flex: 1}}>
                    <TextRegular style={{color: colors.fontColor3}}>
                      {storeInfo.mb_opening_hours}
                    </TextRegular>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>

            <DividerL />
            <View style={{padding: 22}}>
              <View style={{marginBottom: 20}}>
                <TextNotoM style={{fontSize: 18, color: colors.fontColor2}}>
                  소개
                </TextNotoM>
              </View>
              <View style={{height: more ? null : 80}}>
                <TextRegular>{storeInfo.mb_memo}</TextRegular>
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
            <View style={{padding: 22}}>
              <View style={{marginBottom: 20}}>
                <TextNotoM style={{fontSize: 18, color: colors.fontColor2}}>
                  위치
                </TextNotoM>
              </View>
            </View>
          </>
        )}

        {!isLifeStyle && (
          <>
            <Pressable
              onPress={() => {
                _getCoupon();
              }}
              style={{
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
                  fontSize: 15,
                  color: colors.primary,
                }}>
                이 매장의 할인 쿠폰받기
              </Text>
            </Pressable>
            <MenuDescTab info={storeInfo} navigation={navigation} />
          </>
        )}
      </View>
    </>
  );
};

export default React.memo(MenuDesc);
