import React, {useEffect, useRef} from 'react';
import {Animated, Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
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
  isOption,
  isPayment,
}) => {
  const {currentCategory} = useSelector(state => state.categoryReducer);
  const {optionHeader} = useSelector(state => state.menuReducer);

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
            if (!showLogo) navigation.goBack();
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
            <Pressable hitSlop={10} onPress={() => {}}>
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
                  tintColor: iconColor ? iconColor : null,
                }}
                resizeMode={'contain'}
              />
            </Pressable>
          )}

          {(showCart || showShare) && (
            <Pressable hitSlop={10} onPress={() => {}}>
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
