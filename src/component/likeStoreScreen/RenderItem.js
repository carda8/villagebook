import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import TextMedium from '../text/TextMedium';
import colors from '../../styles/colors';
import {customAlert} from '../CustomAlert';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useSelector} from 'react-redux';

const RenderItem = ({item, remove, navigation}) => {
  const [temp, setTemp] = useState(false);
  const {mutateSetLikeStore} = useCustomMutation();
  const {userInfo} = useSelector(state => state.authReducer);

  const _setLikeStore = () => {
    const data = {
      mt_id: userInfo.mt_id,
      jumju_id: item.item.jumju_id,
      jumju_code: item.item.jumju_code,
    };
    console.log('data', data);
    mutateSetLikeStore.mutate(data, {
      onSuccess: e => {
        console.log('ee', e);
      },
    });
  };

  console.log('item', item);
  const data = item.item;
  return (
    <View
      key={item.idx}
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        paddingVertical: 25,
        borderBottomColor: colors.borderColor,
        marginBottom: 10,
        borderRadius: 12,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={{flexDirection: 'row', flex: 1}}
          onPress={() => {
            navigation.navigate('MenuDetail', {
              jumju_id: data.jumju_id,
              jumju_code: data.jumju_code,
              mb_company: data.mb_company,
            });
          }}>
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
              source={
                data.store_logo
                  ? {uri: data.store_logo}
                  : require('~/assets/no_img.png')
              }
              resizeMode={FastImage.resizeMode.cover}
              style={{flex: 1}}
            />
          </View>
          <View style={{flex: 1}}>
            <TextMedium style={{fontSize: 17, color: colors.fontColor2}}>
              {data.mb_company}
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
                {data.stars}
              </TextMedium>
            </View>
            <TextMedium style={{fontSize: 14, color: colors.fontColor8}}>
              {'최소주문 ' + data.minPrice}
            </TextMedium>
            <TextMedium style={{fontSize: 14, color: colors.fontColor8}}>
              {'배달팁' + data.tipFrom + '~' + data.tipTo + '원'}
            </TextMedium>
          </View>
          <Pressable
            hitSlop={10}
            onPress={() => {
              customAlert(
                '찜 삭제',
                '단골찜에서 삭제하시겠습니까?',
                '확인',
                () => {
                  _setLikeStore();
                },
                '취소',
                () => {},
              );
            }}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('~/assets/top_heart_w.png')}
              style={{width: 30, height: 30, tintColor: colors.primary}}
            />
          </Pressable>
        </Pressable>
      </View>
    </View>
  );
};

export default RenderItem;
