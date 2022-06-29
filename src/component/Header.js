import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../styles/colors';
import TextMedium from './text/TextMedium';

const Header = ({
  title,
  navigation,
  style,
  showLogo,
  showCart,
  showLike,
  showNoti,
  showShare,
  iconColor,
}) => {
  return (
    <View
      style={[
        {
          width: '100%',
          height: 57,
          backgroundColor: 'rgba(0,0,0,0.0)',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
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
            source={require('~/assets/top_ic_history.png')}
            style={{
              height: 30,
              width: 30,
              tintColor: iconColor ? iconColor : null,
            }}
            resizeMode={'contain'}
          />
        )}
      </Pressable>

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

      {/* 중간 타이틀 */}
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
    </View>
  );
};

export default Header;
