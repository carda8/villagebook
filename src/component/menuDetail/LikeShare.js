import {View, Text, Pressable, Image, Share} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const LikeShare = ({storeInfo, categoryMain}) => {
  const {userInfo} = useSelector(state => state.authReducer);
  const {mutateSetLikeStore} = useCustomMutation();
  const [like, setLike] = useState();

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

  const _onPressLike = () => {
    if (like === 'Y') setLike('N');
    if (like === 'N') setLike('Y');
    _setLikeStore();
  };

  const _share = async () => {
    try {
      const link = await dynamicLinks().buildShortLink({
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

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Pressable
        hitSlop={10}
        onPress={() => {
          _onPressLike();
        }}>
        <Image
          source={
            like === 'Y'
              ? require('~/assets/top_heart_on.png')
              : require('~/assets/top_heart.png')
          }
          style={{width: 30, height: 30, marginRight: 20}}
        />
      </Pressable>

      <Pressable
        hitSlop={10}
        onPress={() => {
          _share();
        }}>
        <Image
          source={require('~/assets/top_share_w.png')}
          style={{width: 30, height: 30, tintColor: 'black'}}
        />
      </Pressable>
    </View>
  );
};

export default LikeShare;
