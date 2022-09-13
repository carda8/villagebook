import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import colors from '../../styles/colors';
import TextRegular from '../../component/text/TextRegular';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentAdd, setPostData} from '../../store/reducers/AddressReducer';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {customAlert} from '../../component/CustomAlert';
import TextBold from '../../component/text/TextBold';

const AddressMainRenderItem = ({data}) => {
  const dispatch = useDispatch();
  const {postData} = useSelector(state => state.addressReducer);
  const {userInfo} = useSelector(state => state.authReducer);
  const {mutateSetMainAddr} = useCustomMutation();
  // console.log('postData', postData);
  // console.log('data', data);

  const _setAdd = () => {
    _setMainAddr();
    if (data.isRoad) {
      dispatch(
        setPostData({
          addrId: data.ad_id,
          addrMain: data.ad_addr1,
          addrSub: data.ad_addr2 + data.ad_addr3,
          zipCode: data.ad_zip,
        }),
      );
    } else {
      dispatch(
        setPostData({
          addrId: data.ad_id,
          addrMain: data.ad_jibeon,
          addrSub: data.ad_addr2 + data.ad_addr3,
          zipCode: data.ad_zip,
        }),
      );
    }
  };

  const _setMainAddr = () => {
    const info = {
      mt_id: userInfo.mt_id,
      ad_id: data.ad_id,
      mt_app_token: userInfo.mt_app_token,
    };
    console.log('data _setMainAddr', info);

    mutateSetMainAddr.mutate(info, {
      onSuccess: e => {
        if (e.result === 'true')
          return customAlert('알림', '배송지 변경이 완료되었습니다.');
        console.log('e', e);
      },
    });
  };

  return (
    <Pressable
      onPress={() => {
        _setAdd();
      }}
      style={{
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: postData.addrId === data.ad_id ? colors.mainBG3 : null,
        paddingHorizontal: 22,
      }}>
      <View style={{marginRight: 20}}>
        <Image
          source={require('~/assets/ico_location.png')}
          style={{width: 20, height: 20}}
        />
      </View>
      <View style={{flex: 1, minHeight: 50, justifyContent: 'space-between'}}>
        <TextBold style={{fontSize: 13, color: colors.fontColor2}}>
          [{data.ad_zip}] {data.ad_addr1} {data.ad_addr2} {data.ad_addr3}
        </TextBold>
        <TextRegular style={{fontSize: 12, color: colors.fontColor2}}>
          [{data.ad_zip}] {data.ad_jibeon} {data.ad_addr2} {data.ad_addr3}
        </TextRegular>
      </View>
    </Pressable>
  );
};

export default React.memo(AddressMainRenderItem);
