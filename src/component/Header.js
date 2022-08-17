import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Linking,
  Pressable,
  Share,
  Text,
  View,
} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {useCustomMutation} from '../hooks/useCustomMutation';
import colors from '../styles/colors';
import TextBold from './text/TextBold';
import TextMedium from './text/TextMedium';

const Header = ({
  title,
  fadeTitle,
  navigation,
  style,
  showLogo,
  showCart,
  showLike,
  showNoti,
  showShare,
  iconColor,
  category,
  categoryMain,
  isOption,
  isPayment,
  isSummit,
  storeInfo,
}) => {
  const {currentCategory} = useSelector(state => state.categoryReducer);
  const {optionHeader} = useSelector(state => state.menuReducer);
  const {currentStoreCode, savedItem} = useSelector(state => state.cartReducer);
  const {userInfo} = useSelector(state => state.authReducer);
  const {mutateSetLikeStore} = useCustomMutation();
  const [like, setLike] = useState();

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const _setLikeStore = () => {
    const data = {
      mt_id: userInfo.mt_id,
      jumju_id: storeInfo.mb_id,
      jumju_code: storeInfo.mb_jumju_code,
    };
    console.log('data', data);
    mutateSetLikeStore.mutate(data, {
      onSuccess: e => {
        console.log('ee', e);
      },
    });
  };

  const _share = async () => {
    try {
      const link = await dynamicLinks().buildShortLink({
        // link: `https://www.dongnaebook.com/?code=${storeInfo.mb_jumju_code}&mb_id=${storeInfo.mb_id}&category=${category}`,
        // link: `https://www.dongnaebook.com/${category}`,
        link: `https://www.dongnaebook.com/${categoryMain}/${storeInfo.mb_id}/${storeInfo.mb_jumju_code}`,
        domainUriPrefix: 'https://dongnaebook.page.link',
        android: {
          packageName: 'com.dmonster.dongnaebook',
        },
      });

      console.log('Current Store ::', storeInfo);

      console.log('Link::', link);

      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('activityType!');
        } else {
          console.log('Share!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (storeInfo) setLike(storeInfo.isWish);
  }, [storeInfo]);

  useEffect(() => {
    if (isOption) {
      if (optionHeader) fadeIn();
      if (!optionHeader) fadeOut();
    }
    // console.log('optionHeader', optionHeader);
  }, [optionHeader]);

  return (
    <>
      {fadeTitle && (
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: 57,
            backgroundColor: 'white',
            opacity: fadeAnim,
            zIndex: 100,
            justifyContent: 'center',
          }}>
          <TextBold style={{marginLeft: 70}}>{fadeTitle}</TextBold>
        </Animated.View>
      )}

      <View
        style={[
          {
            width: '100%',
            height: 57,
            backgroundColor: `rgba(255,255,255,0)`,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 22,
          },
          style,
        ]}>
        <Pressable
          hitSlop={15}
          onPress={() => {
            if (isSummit) {
              navigation.navigate('MenuDetail', {
                jumju_id: currentStoreCode.jumju_id,
                jumju_code: currentStoreCode.code,
              });
            } else {
              if (!showLogo && navigation.canGoBack()) navigation.goBack();
              else navigation.navigate('Home');
            }
          }}>
          {showLogo ? (
            <Image
              source={require('~/assets/logo.png')}
              style={{height: 23, width: 94}}
              resizeMode={'contain'}
            />
          ) : (
            <Image
              source={
                isPayment
                  ? require('~/assets/pop_close.png')
                  : require('~/assets/top_ic_history.png')
              }
              style={{
                height: 30,
                width: 30,
                tintColor: iconColor ? iconColor : null,
              }}
              resizeMode={'contain'}
            />
          )}
        </Pressable>

        {/* 타이틀 */}
        {title ? (
          <View
            style={{
              flex: 1,
              marginLeft: 18,
            }}>
            <TextMedium
              style={{
                fontSize: 17,
                color: colors.fontColor2,
              }}>
              {title}
            </TextMedium>
          </View>
        ) : null}
        {category && (
          <View
            style={{
              flex: 1,
              marginLeft: 18,
            }}>
            <TextMedium
              style={{
                fontSize: 17,
                color: colors.fontColor2,
              }}>
              {currentCategory}
            </TextMedium>
          </View>
        )}

        <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
          {(showNoti || showLike) && (
            <Pressable
              hitSlop={10}
              onPress={() => {
                if (showNoti) navigation.navigate('PushList');
                if (showLike) {
                  if (like === 'Y') setLike('N');
                  if (like === 'N') setLike('Y');
                  _setLikeStore();
                }
              }}>
              <Image
                source={
                  showNoti
                    ? require('~/assets/top_ball.png')
                    : require('~/assets/top_heart.png')
                }
                style={{
                  height: 30,
                  width: 30,
                  marginRight: 10,
                  tintColor:
                    storeInfo && like === 'Y'
                      ? colors.primary
                      : iconColor
                      ? iconColor
                      : null,
                  // tintColor: iconColor
                  //   ? iconColor
                  //   : like === 'Y'
                  //   ? 'red'
                  //   : null,
                }}
                resizeMode={'contain'}
              />
            </Pressable>
          )}

          {(showCart || showShare) && (
            <Pressable
              hitSlop={10}
              onPress={() => {
                if (showCart) navigation.navigate('SummitOrder');
                if (!showCart) _share();
              }}>
              {showCart && (
                <>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: -1,
                      right: -3,
                      width: 16,
                      height: 16,
                      borderRadius: 16 / 2,
                      backgroundColor: colors.primary,
                      zIndex: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TextBold
                      style={{
                        color: 'white',
                        includeFontPadding: false,
                        fontSize: 11,
                      }}>
                      {savedItem.savedItems.length > 9
                        ? '9+'
                        : savedItem.savedItems.length}
                    </TextBold>
                  </View>
                </>
              )}
              <Image
                source={
                  showCart
                    ? require('~/assets/top_cart.png')
                    : require('~/assets/top_share_w.png')
                }
                style={{
                  height: 30,
                  width: 30,
                  tintColor: iconColor ? iconColor : null,
                }}
                resizeMode={'contain'}
              />
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

export default Header;
