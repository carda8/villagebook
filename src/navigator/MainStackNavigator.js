import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../screens/home/Main';
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
import EditInfo from '../screens/mypage/edit/EditInfo';
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
import SummitOrder from '../screens/menu/cart/SummitOrder';
import WriteOrderForm from '../screens/menu/orderDetail/WriteOrderForm';
import PaymentMethod from '../screens/menu/orderDetail/PaymentMethod';
import OrderSumary from '../screens/menu/orderDetail/OrderSumary';
import OrderFinish from '../screens/menu/orderDetail/OrderFinish';
import WriteReview from '../screens/orderList/WriteReview';
import Cart from '../screens/menu/cart/Cart';
import EditSummit from '../screens/mypage/edit/EditSummit';
import PushList from '../screens/home/PushList';
import CheckTerms from '../screens/signIn/CheckTerms';
import SignForm from '../screens/signIn/SignForm';
import Policy from '../screens/signIn/Policy';
import FindUserAccount from '../screens/login/FindUserAccount';
import ResetAccount from '../screens/login/ResetAccount';
import AuthStorage from '../store/localStorage/AuthStorageModuel';
import localStorageConfig from '../store/localStorage/localStorageConfig';
import Loading from '../component/Loading';
import {useMutation} from 'react-query';
import authAPI from '../api/modules/authAPI';
import {useDispatch, useSelector} from 'react-redux';
import {setFcmToken, setUserInfo} from '../store/reducers/AuthReducer';
import PaymentMain from '../screens/payment/PaymentMain';
import messaging from '@react-native-firebase/messaging';
import {Errorhandler} from '../config/ErrorHandler';
import UseInfo from '../screens/policy/UseInfo';
import {useCustomMutation} from '../hooks/useCustomMutation';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const [initRoute, setInitRoute] = useState();
  const dispatch = useDispatch();
  const {mutateSNSlogin} = useCustomMutation();

  const _getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      console.log('fcm', fcmToken);
      if (fcmToken) {
        dispatch(setFcmToken(fcmToken));
        return fcmToken;
      }
    } catch (err) {
      Errorhandler(err);
    }
  };

  const mutateAutoLogin = useMutation(authAPI._autoLogin, {
    onSuccess: e => {
      const userInfo = e.data.arrItems;
      if (userInfo) {
        dispatch(setUserInfo(userInfo));
        setInitRoute('Main');
      } else setInitRoute('Login');
    },
  });

  const _autoLogin = (token, id, type) => {
    const data = {
      mt_id: id,
      mt_app_token: token,
    };
    if (type === localStorageConfig.loginType.sns) {
      mutateSNSlogin.mutate(data, {
        onSuccess: e => {
          const userInfo = e.data.arrItems;
          if (userInfo) {
            dispatch(setUserInfo(userInfo));
            setInitRoute('Main');
          } else setInitRoute('Login');
        },
      });
    } else mutateAutoLogin.mutate(data);
  };

  const _initRoute = async () => {
    try {
      const fcmToken = await _getFcmToken();
      const auto = await AuthStorage._getItemAutoLogin();
      const token = await AuthStorage._getItemUserToken();
      const userId = await AuthStorage._getItemUserId();
      const loginType = await AuthStorage._getItemLoginType();

      if (auto === localStorageConfig.state.true && token && userId)
        _autoLogin(token, userId, loginType);
      else setInitRoute('Login');
    } catch (err) {
      Errorhandler(err);
    }
  };

  useEffect(() => {
    _initRoute();
  }, []);

  if (!initRoute) return <Loading />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initRoute}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CheckTerms" component={CheckTerms} />
        <Stack.Screen
          name="Policy"
          component={Policy}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen name="SignForm" component={SignForm} />
        <Stack.Screen name="FindUserAccount" component={FindUserAccount} />
        <Stack.Screen name="ResetAccount" component={ResetAccount} />

        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="CategoryView" component={CategoryView} />
        <Stack.Screen name="StoreList" component={StoreList} />
        <Stack.Screen name="LikeMain" component={LikeMain} />
        <Stack.Screen name="OrderList" component={OrderList} />
        <Stack.Screen name="WriteReview" component={WriteReview} />
        <Stack.Screen name="DiscountMain" component={DiscountMain} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="MenuStore" component={MenuStroe} />
        <Stack.Screen name="MenuDetail" component={MenuDetail} />
        <Stack.Screen name="OptionSelect" component={OptionSelect} />
        <Stack.Screen name="SummitOrder" component={SummitOrder} />
        <Stack.Screen name="WriteOrderForm" component={WriteOrderForm} />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen name="PaymentMain" component={PaymentMain} />

        <Stack.Screen name="OrderSumary" component={OrderSumary} />
        <Stack.Screen name="OrderFinish" component={OrderFinish} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="PushList" component={PushList} />

        <Stack.Screen
          name="UseInfo"
          component={UseInfo}
          options={{animation: 'slide_from_bottom'}}
        />

        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="AddressSearch" component={AddressSearch} />
        <Stack.Screen name="EditInfo" component={EditInfo} />
        <Stack.Screen name="EditSummit" component={EditSummit} />

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
