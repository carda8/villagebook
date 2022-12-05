import {View, Text} from 'react-native';
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

const CouponBookDetail = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <ScrollView>
        <Header
          title={'쿠폰 상세보기'}
          style={{
            borderBottomWidth: 1,
            borderColor: colors.borderColor,
            marginBottom: 15,
          }}
        />
        {/* 상단 쿠폰 */}
        <View style={{marginHorizontal: 14}}>
          <Shadow distance={5} offset={[0, 2]} style={{width: '100%'}}>
            <Pressable
              onPress={() => {
                navigation.navigate('CouponBookDetail');
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
                source={require('~/assets/no_img.png')}
                style={{height: 80, width: 80}}
                resizeMode="center"
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
                    기마상회
                  </TextMedium>
                  <TextLight
                    style={{
                      color: colors.fontColorA,
                      fontSize: 11,
                      marginRight: 5,
                    }}>
                    {'2022년 12월 31일까지'}
                  </TextLight>
                </View>
                <TextBold
                  style={{fontSize: 16, color: colors.fontColor2}}
                  numberOfLines={2}>
                  50% 할인쿠폰
                </TextBold>
                <TextBold
                  style={{fontSize: 13, color: colors.fontColorA2}}
                  numberOfLines={2}>
                  {'첫, 방문 고객 한정 쿠폰 사용가능'}
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
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('~/assets/down_coupon.png')}
                  style={{width: 45, height: 45}}
                  resizeMode="contain"
                />
                <TextLight style={{fontSize: 12}}>{1}개 남음</TextLight>
              </View>
            </Pressable>
          </Shadow>
        </View>
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
            <TextMedium>서울 서댑문구 연회로 138-12</TextMedium>
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
              lat={35.1795543}
              lng={129.0756416}
              // width={200}
            />
          </View>
        </View>
        {/* 안내사항  */}
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.borderColor,
            marginTop: 10,
            padding: 14,
          }}>
          <TextBold>안내사항</TextBold>
          <TextRegular>
            백색소음의 시그니처 파스타 알리오올리오 파스타 50% 할인쿠폰입니다 ^^
            백색소음의 시그니처 파스타 알리오올리오 파스타 50% 할인쿠폰입니다 ^^
          </TextRegular>
          <Pressable
            onPress={() => {}}
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
    </SafeAreaView>
  );
};

export default CouponBookDetail;
