import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Header = ({title, navigation}) => {
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: 50,
        backgroundColor: 'gray',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Pressable
        hitSlop={15}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('~/assets/btn_top_left.png')}
          style={{height: 50}}
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
    </SafeAreaView>
  );
};

export default Header;
