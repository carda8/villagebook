import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import colors from '../../styles/colors';
import Divider from '../Divider';
import TextLight from '../text/TextLight';

const MenuSubs = () => {
  console.log('Menusubs rendered');
  return (
    <>
      <View
        style={{
          top: -40,
          width: 81,
          height: 81,
          borderRadius: 30,
          backgroundColor: colors.storeIcon,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('~/assets/ico_star_on.png')}
          resizeMode="contain"
          style={{flex: 1}}
        />
      </View>
      <View style={{top: -27}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{fontSize: 22}}>맛나버거 부산대점(test)</Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextLight style={{color: colors.fontColorA2}}>
                최근 리뷰 222
              </TextLight>
              <Divider style={{marginHorizontal: 8}} />
              <TextLight style={{color: colors.fontColorA2}}>
                최근 사장님댓글 222
              </TextLight>
            </View>
          </View>

          <View style={{}}>
            <Pressable
              onPress={() => {}}
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
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.couponBG,
            height: 50,
            borderRadius: 8,
            marginTop: 19,
          }}>
          <Text
            style={{fontWeight: 'bold', fontSize: 15, color: colors.primary}}>
            이 매장의 할인 쿠폰받기
          </Text>
        </Pressable>
        <View
          style={{
            flex: 1,
            height: 40,
          }}>
          <Text style={{fontSize: 20}}>COUPONE</Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 200,
          }}>
          <Text style={{fontSize: 20}}>DETAIL</Text>
        </View>
      </View>
    </>
  );
};

export default React.memo(MenuSubs);
