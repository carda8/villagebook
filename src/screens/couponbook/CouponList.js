import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {Pressable} from 'react-native';
import {FlatList} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import TextMedium from '../../component/text/TextMedium';
import TextBold from '../../component/text/TextBold';
import TextLight from '../../component/text/TextLight';
import colors from '../../styles/colors';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useEffect} from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';

const CouponList = ({navigation, route, couponData, isMy}) => {
  const layout = useWindowDimensions();
  const routeData = route?.params;
  const [couponData2, setCouponData] = useState([]);
  const {couponBoolFilterIndex} = useSelector(state => state.couponReducer);
  const {mutateGetCouponBookList, mttCpbSave, mttCpbMy} = useCustomMutation();
  const {userInfo} = useSelector(state => state.authReducer);

  const _getBookList = () => {
    const data = {
      item_count: 0,
      limit_count: 10,
      ca_code: routeData?.ca_code,
      ca_sort: couponBoolFilterIndex,
    };
    console.log('## data', data);
    // return;
    mutateGetCouponBookList.mutate(data, {
      onSuccess: res => {
        console.log('## res', res.data);
        if (res.data.arrItems.length > 0) {
          setCouponData(res.data.arrItems);
        }
      },
    });
  };

  const _getMyCBList = () => {
    const data = {
      item_count: '0',
      // limit_count: '10',
      mt_id: userInfo.mt_id,
      // N 미사용, Y 사용 완료
      cp_use: tabIndex === '1' ? 'N' : 'Y',
    };
    mttCpbMy.mutate(data, {
      onSuccess: res => {
        console.log('res', res.data.arrItems);
        setMyCpn(res.data.arrItems);
      },
    });
    console.log('data ::', data);
  };

  // const

  useEffect(() => {
    _getBookList();
  }, [couponBoolFilterIndex]);

  const _onPressSave = element => {
    // console.log('element', element);
    const data = {
      jumju_id: element.cp_jumju_id,
      jumju_code: element.cp_jumju_code,
      mt_id: userInfo.mt_id,
      coupon_id: element.cp_id,
    };
    console.log('data', data);
    mttCpbSave.mutate(data, {
      onSuccess: res => {
        if (res.data.resultItem.result === 'true')
          Alert.alert('쿠폰북', '쿠폰북 다운로드 성공');
        else Alert.alert('쿠폰북', '중복 다운로드는 할 수 없습니다');
        console.log('res', res.data.resultItem.result === 'true');
      },
    });
  };

  const renderItem = item => {
    const element = item.item;
    const elementIdx = item.index;
    // console.log('element', element);
    return (
      <Shadow
        distance={5}
        offset={[0, 2]}
        style={{width: '100%'}}
        containerStyle={{marginTop: elementIdx === 0 && isMy ? 14 : 0}}>
        <Pressable
          onPress={() => {
            navigation.navigate('CouponBookDetail', {...element});
          }}
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: 10,
            height: 100,
            marginBottom: 15,
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection: 'row',
            backgroundColor: 'white',
          }}>
          <Image
            source={
              element.store_logo
                ? {uri: element.store_logo}
                : require('~/assets/no_img.png')
            }
            style={{height: 80, width: 80}}
            resizeMode="cover"
          />
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextMedium
                style={{color: colors.fontColor3, flex: 1}}
                numberOfLines={1}>
                {element.store_name}
              </TextMedium>
              <TextLight
                style={{
                  color: colors.fontColorA,
                  fontSize: 11,
                  marginRight: 5,
                }}>
                {element.cp_end_txt}
              </TextLight>
            </View>
            <TextBold
              style={{fontSize: 16, color: colors.fontColor2}}
              numberOfLines={2}>
              {element.cp_subject}
            </TextBold>
            <TextBold
              style={{fontSize: 13, color: colors.fontColorA2}}
              numberOfLines={2}>
              {element.cp_memo}
            </TextBold>
          </View>
          <View
            style={{
              width: 1,
              height: 60,
              backgroundColor: colors.primary,
              alignSelf: 'center',
              marginRight: 5,
            }}
          />
          <Pressable
            onPress={() => {
              _onPressSave(element);
            }}
            style={{width: 55, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('~/assets/down_coupon.png')}
              style={{width: 45, height: 45}}
              resizeMode="contain"
            />
            <TextLight style={{fontSize: 12}}>
              {element.cp_coupon_download_txt}
            </TextLight>
          </Pressable>
        </Pressable>
      </Shadow>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
      }}>
      <FlatList
        data={couponData2}
        // data={[]}
        keyExtractor={(item, index) => index}
        renderItem={item => renderItem(item)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{width: layout.width, paddingHorizontal: 12}}
        ListEmptyComponent={
          <Image
            source={require('~/assets/coupon_ready.png')}
            style={{height: layout.width * 1.2, width: layout.width}}
            resizeMode="contain"
          />
        }
        ListHeaderComponent={
          <></>
          // <MainBanner
          //   navigation={navigation}
          //   style={{
          //     marginBottom: 17,
          //   }}
          //   position={BannerList['lifestyle']}
          // />
        }
      />
    </View>
  );
};

export default CouponList;
