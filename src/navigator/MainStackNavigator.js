import React, {useEffect, useRef, useState} from 'react';

import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../screens/home/Main';
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
import LifeStyleStoreInfo from '../screens/lifeStyle/LifeStyleStoreInfo';
import AddressMain from '../screens/home/AddressMain';
import AddressSetDetail from '../screens/home/AddressSetDetail';
import SNSLogin from '../screens/login/SNSLogin';
import {customAlert} from '../component/CustomAlert';
import {useGeoLocation} from '../hooks/useGeoLocation';
import DeliveryTipInfo from '../screens/menu/DeliveryTipInfo';
import CouponSelect from '../screens/menu/orderDetail/CouponSelect';
import SearchView from '../screens/home/SearchView';
import {AppState, Linking, Platform} from 'react-native';
import AuthStorageModuel from '../store/localStorage/AuthStorageModuel';
import {setSaveItem, setStoreLogo} from '../store/reducers/CartReducer';
import SearchResult from '../screens/home/SearchResult';

import dynamicLinks from '@react-native-firebase/dynamic-links';
import MenuDetail2 from '../screens/menu/MenuDetail2';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const [initRoute, setInitRoute] = useState();
  const dispatch = useDispatch();
  const {mutateSNSlogin} = useCustomMutation();
  const cartStore = useSelector(state => state.cartReducer);
  const {_getCurrentLocation, _requestPermissions} = useGeoLocation();

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

  const _typeNumOfsns = async (loginTypeNum, token) => {
    let result;
    let data;
    switch (loginTypeNum) {
      case localStorageConfig.loginTypeNum.naver:
        result = await SNSLogin._NaverLogin(token);
        data = {
          mt_id: result.mt_id,
          mt_pwd: result.mt_pwd,
          mt_app_token: result.mt_app_token,
          mt_login_type: '2',
          mt_sns_url: result.mt_image1,
          mt_hp: result.mt_hp,
          mt_name: result.mt_name,
          mt_email: result.mt_email,
          mt_nickname: result.mt_nickname,
        };
        return data;
      case localStorageConfig.loginTypeNum.kakao:
        result = await SNSLogin._KakaoLogin(token);
        data = {
          mt_id: result.mt_id,
          mt_pwd: result.mt_pwd,
          mt_app_token: result.mt_app_token,
          mt_login_type: '3',
          mt_sns_url: result.mt_image1,
          mt_hp: result.mt_hp,
          mt_name: result.mt_name,
          mt_email: result.mt_email,
          mt_nickname: result.mt_nickname,
        };
        return data;
      case localStorageConfig.loginTypeNum.facebook:
        return;
      case localStorageConfig.loginTypeNum.apple:
        return;
      default:
        return customAlert('알림', '현재 sns 로그인을 사용 할 수 없습니다.');
    }
  };

  const _autoLogin = async (token, id, type, loginTypeNum) => {
    let data;
    if (type !== localStorageConfig.loginType.sns) {
      data = {
        mt_id: id,
        mt_app_token: token,
      };
    } else {
      //자동로그인시 해당 sns 계정 서버는 최초 1회 로그인시 경유
      //로그아웃 이후 재로그인 시 에도 경유
      //아래 주석 해제시 항상 서버 경유
      // data = await _typeNumOfsns(loginTypeNum, token);
      data = {
        mt_id: id,
        mt_app_token: token,
        mt_login_type: loginTypeNum,
      };
      console.log('## autoLogin data', data);

      // const result = await SNSLogin._KakaoLogin(token);
      // console.log('_KakaoLogin result', result);
      // data = {
      //   mt_id: result.mt_id,
      //   mt_pwd: result.mt_pwd,
      //   mt_app_token: result.mt_app_token,
      //   mt_login_type: '3',
      //   mt_sns_url: result.mt_image1,
      //   mt_hp: result.mt_hp,
      //   mt_name: result.mt_name,
      //   mt_email: result.mt_email,
      //   mt_nickname: result.mt_nickname,
      // };
    }

    if (type === localStorageConfig.loginType.sns) {
      mutateSNSlogin.mutate(data, {
        onSuccess: e => {
          const userInfo = e.data.arrItems;
          console.log('mutateSNSlogin result :::', e);
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
      const loginTypeNum = await AuthStorage._getItemLoginTypeNum();

      console.log('userId, loginType', userId, loginType, loginTypeNum);
      if (auto === localStorageConfig.state.true && token && userId)
        _autoLogin(token, userId, loginType, loginTypeNum);
      else setInitRoute('Login');
    } catch (err) {
      Errorhandler(err);
    }
  };

  const config = {
    initialRouteName: 'Main',
    screens: {
      Login: 'login',
      Main: 'main',
      MenuDetail: {
        path: '/food/:jumju_id/:jumju_code' || '/market/:jumju_id/:jumju_code',
        // parse: {
        //   category: String,
        // },
      },
      LifeStyleStoreInfo: {
        path: '/lifestyle/:jumju_id/:jumju_code',
      },
    },
  };

  // useEffect(() => {
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then(link => {
  //       console.log('link::::::::', link);
  //       if (link.url === 'https://invertase.io/offer') {
  //         // ...set initial route as offers screen
  //       }
  //     });
  // }, []);

  // MenuDetail;
  const linking = {
    prefixes: [
      'https://www.dongnaebook.com',
      'http://www.dongnaebook.com',
      'dongnaebook://',
      'applinks://',
      'applinks:',
    ],
    async getInitialURL() {
      if (Platform.OS === 'android') {
        const url = await Linking.getInitialURL();
        // console.log(1);
        if (url != null) {
          Linking.console.log('URLLLL:::', url);
          return url;
        }
        return;
      }
      if (Platform.OS === 'ios') {
        const link = await dynamicLinks()
          .getInitialLink()
          .then(link => {
            // console.log(2);
            if (link?.url != null) {
              console.log('link::::::::', link);
              return link.url;
            } else return null;
            // if (link.url === 'https://invertase.io/offer') {
            //   // ...set initial route as offers screen
            // }
          });
        if (link) {
          return link;
        } else {
          return null;
        }
      }
    },
    subscribe(listener) {
      // console.log('linking subscribe to ', listener);
      const onReceiveURL = event => {
        const {url} = event;
        console.log('link has url', url, event);
        return listener(url);
      };

      Linking.addEventListener('url', onReceiveURL);
      return () => {
        // console.log('linking unsubscribe to ', listener);
        Linking.removeAllListeners('url');
      };
    },
    config,
  };

  const _getLocalData = async () => {
    const cartData = await AuthStorageModuel._getCartData();
    console.log('::::::::::: MAIN DATA', JSON.parse(cartData));
    if (cartData) {
      const copyData = JSON.parse(cartData);
      delete cartData.logo;
      if (cartData) {
        dispatch(setSaveItem(JSON.parse(cartData)));
        dispatch(setStoreLogo(copyData.logo));
      }
    }
  };

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    console.log(' ::::::::::::: appState', appState);
    _getLocalData();
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        const cartData = await AuthStorageModuel._getCartData();
        console.log('::::::::::: MAIN DATA', JSON.parse(cartData));
        if (cartData) {
          const copyData = JSON.parse(cartData);
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            delete cartData.logo;
            if (cartData) {
              dispatch(setSaveItem(JSON.parse(cartData)));
              dispatch(setStoreLogo(copyData.logo));
            }
            // console.log('App has come to the foreground!');
          }
          appState.current = nextAppState;
          // setAppStateVisible(appState.current);
        }
      },
    );
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    _initRoute();
  }, []);

  if (!initRoute) return <Loading />;

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={initRoute}
        // initialRouteName={'Test'}
        screenOptions={{headerShown: false}}
      >
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
        <Stack.Screen name="SearchView" component={SearchView} />
        <Stack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{animation: 'slide_from_right'}}
        />

        <Stack.Screen name="AddressMain" component={AddressMain} />
        <Stack.Screen name="AddressSetDetail" component={AddressSetDetail} />

        <Stack.Screen name="CategoryView" component={CategoryView} />
        <Stack.Screen name="StoreList" component={StoreList} />
        <Stack.Screen name="LikeMain" component={LikeMain} />
        <Stack.Screen name="OrderList" component={OrderList} />
        <Stack.Screen name="WriteReview" component={WriteReview} />
        <Stack.Screen name="DiscountMain" component={DiscountMain} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="MenuDetail" component={MenuDetail} />
        <Stack.Screen name="MenuDetail2" component={MenuDetail2} />

        <Stack.Screen
          name="DeliveryTipInfo"
          component={DeliveryTipInfo}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="LifeStyleStoreInfo"
          component={LifeStyleStoreInfo}
        />
        <Stack.Screen name="OptionSelect" component={OptionSelect} />
        <Stack.Screen name="SummitOrder" component={SummitOrder} />
        <Stack.Screen name="WriteOrderForm" component={WriteOrderForm} />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen name="PaymentMain" component={PaymentMain} />
        <Stack.Screen
          name="CouponSelect"
          component={CouponSelect}
          options={{animation: 'slide_from_bottom'}}
        />

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
