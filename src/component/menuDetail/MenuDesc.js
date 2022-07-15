import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import colors from '../../styles/colors';
import Divider from '../Divider';
import ReviewSimple2 from '../reviews/ReviewSimple2';
import TextLight from '../text/TextLight';
import MenuDescTab from './MenuDescTab';

const MenuDesc = ({info}) => {
  const storeInfo = info.data.arrItems;

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
            <Text style={{fontSize: 22}}>{storeInfo.mb_biz_name}</Text>
            <ReviewSimple2 info={storeInfo} />
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

        <Pressable
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
            style={{fontWeight: 'bold', fontSize: 15, color: colors.primary}}>
            이 매장의 할인 쿠폰받기
          </Text>
        </Pressable>
        <MenuDescTab info={storeInfo} />
      </View>
    </>
  );
};

export default React.memo(MenuDesc);
