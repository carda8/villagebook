import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useRef} from 'react';
import {FlatList, Text} from 'react-native';
import {Animated} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Header from '../../component/Header';
import FilterView from '../home/CategoryStore/FilterView';
import React from 'react';
import commonStyles from '../../styles/commonStyle';
import Category from '../../config/Category';
import StoreItems from '../home/CategoryStore/StoreItems';
import colors from '../../styles/colors';
import {
  setcurrentCategory,
  setcurrentFilter,
} from '../../store/reducers/CategoryReducer';
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

const Tab = createMaterialTopTabNavigator();

const CouponBookMy = ({navigation, route}) => {
  const {couponbookData} = useSelector(state => state.couponReducer);
  const data = couponbookData;
  const [tabIndex, setTabIndex] = useState('1');

  const [filterCate, setFilterCate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const _onPressCate = item => {
    setFilterCate(item.ca_name);
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
      <View style={{paddingBottom: 100}}>
        <CouponList navigation={navigation} isMy />
      </View>
    </SafeAreaView>
  );
};

export default CouponBookMy;
