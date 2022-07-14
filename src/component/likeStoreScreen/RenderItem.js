import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import TextMedium from '../text/TextMedium';
import colors from '../../styles/colors';

const RenderItem = ({item, remove, navigation}) => {
  const [temp, setTemp] = useState(false);
  return (
    <View
      key={item.idx}
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        paddingVertical: 10,
        borderBottomColor: colors.borderColor,
        marginBottom: 10,
        borderRadius: 12,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={{flexDirection: 'row', flex: 1}}
          onPress={() => {
            if (remove) setTemp(!temp);
            if (!remove) navigation.navigate('MenuDetail');
          }}>
          {remove && (
            <Image
              source={
                temp
                  ? require('~/assets/top_ic_map_on.png')
                  : require('~/assets/top_ic_map_off.png')
              }
              style={{width: 20, height: 20, marginRight: 5}}
            />
          )}

          <View
            style={{
              width: 100,
              height: 100,
              borderWidth: 1,
              borderRadius: 10,
              marginRight: 15,
              borderColor: colors.borderColor,
              overflow: 'hidden',
            }}>
            <FastImage
              source={require('~/assets/dummy/CK_tica114m19040204_l.jpg')}
              resizeMode={FastImage.resizeMode.cover}
              style={{flex: 1}}
            />
          </View>
          <View style={{flex: 1}}>
            <TextMedium style={{fontSize: 17, color: colors.fontColor2}}>
              {'백종원 짬뽕'}
            </TextMedium>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('~/assets/ico_star_on.png')}
                style={{width: 15, height: 15}}
              />
              <TextMedium style={{fontSize: 14, color: colors.fontColor8}}>
                {'(4.7)'}
              </TextMedium>
            </View>
            <TextMedium style={{fontSize: 14, color: colors.fontColor8}}>
              {'최소주문 10,000 배달팁 4,000원'}
            </TextMedium>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default RenderItem;
