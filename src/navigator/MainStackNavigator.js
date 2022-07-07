import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../screens/home/Main';
import CallTopNavigator from './CallTopNavigator';
import MenuStroe from '../screens/menu/MenuStore';
import MenuDetail from '../screens/menu/MenuDetail';
import Map from '../screens/map/Map';
import Test from '../Test';
import AddressSearch from '../screens/map/AddressSearch';
import Login from '../screens/login/login';
import LikeMain from '../screens/likeStore/LikeMain';
import OrderList from '../screens/orderList/OrderList';
import DiscountMain from '../screens/discount/DiscountMain';
import MyPage from '../screens/mypage/MyPage';
import CategoryView from '../screens/home/CategoryView';
import StoreList from '../screens/home/CategoryStore/StoreList';
import EditInfo from '../screens/mypage/EditInfo';
import Notice from '../screens/mypage/Notice';
import FAQ from '../screens/mypage/FAQ';
import PointCoupon from '../screens/mypage/PointCoupon';
import Review from '../screens/mypage/Review';
import PushSetting from '../screens/mypage/PushSetting';
import NoticeDetail from '../screens/mypage/NoticeDetail';
import FAQWrite from '../screens/mypage/FAQWrite';
import FAQDetail from '../screens/mypage/FAQDetail';
import EventBoard from '../screens/mypage/EventBoard';
import EventDetail from '../screens/mypage/EventDetail';
import OptionSelect from '../screens/menu/OptionSelect';
import CartMain from '../screens/menu/cart/CartMain';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CartMain"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="CategoryView" component={CategoryView} />
        <Stack.Screen name="StoreList" component={StoreList} />
        <Stack.Screen name="LikeMain" component={LikeMain} />
        <Stack.Screen name="OrderList" component={OrderList} />
        <Stack.Screen name="DiscountMain" component={DiscountMain} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="CallTopNavigator" component={CallTopNavigator} />
        <Stack.Screen name="MenuStore" component={MenuStroe} />
        <Stack.Screen name="MenuDetail" component={MenuDetail} />
        <Stack.Screen name="OptionSelect" component={OptionSelect} />
        <Stack.Screen name="CartMain" component={CartMain} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="AddressSearch" component={AddressSearch} />

        <Stack.Screen name="EditInfo" component={EditInfo} />
        <Stack.Screen name="Notice" component={Notice} />
        <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="FAQDetail" component={FAQDetail} />
        <Stack.Screen name="FAQWrite" component={FAQWrite} />
        <Stack.Screen name="PointCoupon" component={PointCoupon} />
        <Stack.Screen name="EventBoard" component={EventBoard} />
        <Stack.Screen name="EventDetail" component={EventDetail} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="PushSetting" component={PushSetting} />

        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
