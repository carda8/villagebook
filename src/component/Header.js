import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Header = ({title, navigation, style}) => {
  return (
    <View
      style={[
        {
          width: '100%',
          height: 30,
          backgroundColor: 'rgba(52, 52, 52, 0.0)',
          alignItems: 'center',
          flexDirection: 'row',
        },
        style,
      ]}>
      <Pressable
        hitSlop={15}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('~/assets/btn_top_left.png')}
          style={{height: 30}}
          resizeMode={'contain'}
        />
      </Pressable>
      <View
        style={{
          flex: 1,
          left: 0,
          right: 0,
          position: 'absolute',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;
