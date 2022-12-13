import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useEffect, useRef} from 'react';
import {FlatList, Text} from 'react-native';
import {Animated} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Header from '../../component/Header';
import FilterView from '../home/CategoryStore/FilterView';
import React from 'react';
import commonStyles from '../../styles/commonStyle';
import colors from '../../styles/colors';
import CouponList from './CouponList';
import CouponFilterView from './CouponFilterView';
import {Pressable} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {Image} from 'react-native';
import {useState} from 'react';
import {Shadow} from 'react-native-shadow-2';
import TextSBold from '../../component/text/TextSBold';
import TextRegular from '../../component/text/TextRegular';
import {NavigationContainer} from '@react-navigation/native';
import {naviRef} from '../../navigator/MainStackNavigator';
import MainBanner from '../../component/MainBanner';
import BannerList from '../../config/BannerList';
import {useSelector} from 'react-redux';
import TextMedium from '../../component/text/TextMedium';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import TextBold from '../../component/text/TextBold';
import TextLight from '../../component/text/TextLight';

const Tab = createMaterialTopTabNavigator();

const CouponBookMy = ({navigation, route}) => {
  const {mttCpbMy} = useCustomMutation();
  const [tabIndex, setTabIndex] = useState('1');
  const {userInfo} = useSelector(state => state.authReducer);
  const [myCpn, setMyCpn] = useState([]);
  const layout = useWindowDimensions();

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

  useEffect(() => {
    _getMyCBList();
  }, [tabIndex]);

  const renderItem = item => {
    const element = item.item;
    const elementIdx = item.index;
    // console.log('element', element);
    return (
      <Shadow
        distance={5}
        offset={[0, 2]}
        style={{width: '100%'}}
        containerStyle={{marginTop: elementIdx === 0 ? 14 : 0}}>
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
          <View
            style={{width: 55, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('~/assets/down_coupon.png')}
              style={{width: 45, height: 45}}
              resizeMode="contain"
            />
            <TextLight style={{fontSize: 12}}>
              {element.cp_coupon_download_txt}
            </TextLight>
          </View>
        </Pressable>
      </Shadow>
    );
  };

  return (
    <SafeAreaView
      edges={['left', 'right', 'top']}
      style={{...commonStyles.safeAreaStyle}}>
      <View style={{zIndex: 2000}}>
        <Header navigation={navigation} title="내 쿠폰함" />
      </View>
      <View
        style={{
          height: 40,
          flexDirection: 'row',
          // borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: colors.borderColor,
        }}>
        <Pressable
          onPress={() => {
            setTabIndex('1');
          }}
          style={{
            flex: 1,
            backgroundColor: tabIndex === '1' ? colors.primary : 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextMedium
            style={{
              color: tabIndex === '1' ? 'white' : colors.fontColorA2,
              fontSize: 15,
            }}>
            보유쿠폰
          </TextMedium>
        </Pressable>
        <Pressable
          onPress={() => {
            setTabIndex('2');
          }}
          style={{
            flex: 1,
            backgroundColor: tabIndex === '2' ? colors.primary : 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextMedium
            style={{
              color: tabIndex === '2' ? 'white' : colors.fontColorA2,
              fontSize: 15,
            }}>
            완료 쿠폰
          </TextMedium>
        </Pressable>
      </View>

      <FlatList
        data={myCpn}
        keyExtractor={(item, index) => index}
        renderItem={item => renderItem(item)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{width: layout.width, paddingHorizontal: 12}}
        ListEmptyComponent={
          <Image
            source={require('~/assets/coupon_ready.png')}
            style={{
              height: layout.width * 1.2,
              width: layout.width,
              marginTop: '20%',
            }}
            resizeMode="contain"
          />
        }
      />
    </SafeAreaView>
  );
};

export default CouponBookMy;
