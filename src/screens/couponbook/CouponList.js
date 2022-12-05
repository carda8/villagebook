import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MainBanner from '../../component/MainBanner';
import BannerList from '../../config/BannerList';
import {FlatList} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import TextMedium from '../../component/text/TextMedium';
import TextBold from '../../component/text/TextBold';
import TextLight from '../../component/text/TextLight';
import colors from '../../styles/colors';

const CouponList = ({navigation, route, couponData}) => {
  const layout = useWindowDimensions();
  console.log('route', route);
  console.log('navigation', navigation);
  const renderItem = item => {
    return (
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
                기마상회{item.item}
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
              50% 할인쿠폰{item.item}
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
            <TextLight style={{fontSize: 12}}>
              {item.index + 1}개 남음
            </TextLight>
          </View>
        </Pressable>
      </Shadow>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
      }}>
      <FlatList
        data={couponData ? couponData : [1, 2, 3, 4, 5, 1, 2, 3, 4, 56]}
        // data={[]}
        keyExtractor={(item, index) => index}
        renderItem={item => renderItem(item)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{width: layout.width, paddingHorizontal: 12}}
        ListEmptyComponent={
          <Image
            source={require('~/assets/coupon_ready.png')}
            style={{height: layout.width * 1.2, width: layout.width}}
            resizeMode="contain"
          />
        }
        ListHeaderComponent={
          <></>
          // <MainBanner
          //   navigation={navigation}
          //   style={{
          //     marginBottom: 17,
          //   }}
          //   position={BannerList['lifestyle']}
          // />
        }
      />
    </View>
  );
};

export default CouponList;
