import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import ImageSwipe from '../../component/menuDetail/ImageSwipe';
import MenuDesc from '../../component/menuDetail/MenuDesc';
import commonStyles from '../../styles/commonStyle';
import colors from '../../styles/colors';
import TextRegular from '../../component/text/TextRegular';
import Dot from '../../component/Dot';
import FastImage from 'react-native-fast-image';
import TextMedium from '../../component/text/TextMedium';
import TextBold from '../../component/text/TextBold';
import TextNotoM from '../../component/text/TextNotoM';
import TextNotoR from '../../component/text/TextNotoR';
import TextNotoB from '../../component/text/TextNotoB';
import DividerL from '../../component/DividerL';
import {Slider} from '@miblanchard/react-native-slider';
import Loading from '../../component/Loading';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {customAlert} from '../../component/CustomAlert';
import {replaceString} from '../../config/utils/Price';
import {useSelector} from 'react-redux';
import MenuReview from './MenuReview';
import MiniMap from '../map/MiniMap';
import Caution from '../../component/Caution';
import AuthStorageModuel from '../../store/localStorage/AuthStorageModuel';
import {Shadow} from 'react-native-shadow-2';
import {FlatList} from 'react-native';

const MenuDetail2 = ({navigation, route}) => {
  const {
    mutateTopMenu,
    mutateStoreInfo,
    mutateAllMunu,
    mutateServiceTime,
    mutateGetStoreService,
  } = useCustomMutation();
  const {savedItem} = useSelector(state => state.cartReducer);
  const cartStore = useSelector(state => state.cartReducer);
  const {userInfo} = useSelector(state => state.authReducer);

  const routeData = route.params;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [temp, setTemp] = useState();
  const [headerTrigger, setHeaderTrigger] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [selected, setSelected] = useState({idx: '', isScrolling: false});

  const scrollRef = useRef();
  const scrollRefSub = useRef();
  const focusTarget = useRef([]);
  const chipTarget = useRef([]);

  const _init = () => {
    if (!userInfo) {
      Alert.alert('알림', '로그인이 필요합니다.', [
        {
          text: '로그인 하러 가기',
          onPress: () =>
            navigation.reset({
              routes: [{name: 'Login'}],
            }),
        },
      ]);
      return;
    }
    console.log('_init data1', routeData);
    const data = {
      jumju_id: routeData.jumju_id,
      jumju_code: routeData.jumju_code,
      mt_id: userInfo.mt_id,
    };
    console.log('_init data', data);
    mutateStoreInfo.mutate(data);
  };

  //Menu 데이터 임시
  //API 개발 완료시 수정 필요
  const _getTopMenu = () => {
    const data = {
      jumju_id: routeData.jumju_id,
      jumju_code: routeData.jumju_code,
    };
    mutateTopMenu.mutate(data);
  };

  const _getAllMenu = () => {
    const data = {
      jumju_id: routeData.jumju_id,
      jumju_code: routeData.jumju_code,
    };
    mutateAllMunu.mutate(data);
  };

  const _getServiceTime = () => {
    const data = {
      jumju_id: routeData.jumju_id,
      jumju_code: routeData.jumju_code,
    };
    mutateServiceTime.mutate(data);
  };

  const _getStoreService = () => {
    const data = {
      jumju_id: routeData.jumju_id,
      jumju_code: routeData.jumju_code,
    };
    mutateGetStoreService.mutate(data, {
      onSuccess: e => {
        console.log('## service', e);
      },
    });
  };

  const _calcTotalPrice = () => {
    let temp = 0;
    savedItem.savedItems.map((item, index) => {
      temp += item.totalPrice;
    });
    return temp;
  };

  useEffect(() => {
    _init();
    _getTopMenu();
    _getAllMenu();
    _getServiceTime();
    _getStoreService();
  }, [route.params]);

  useEffect(() => {
    if (chipTarget.current[selected.idx]) {
      chipTarget.current[selected.idx].measureLayout(
        scrollRefSub.current,
        (left, top, width, height) => {
          scrollRefSub.current.scrollTo({
            x: left - layout.width / 3 - 10,
            y: 0,
            animated: true,
          });
        },
      );
    }
  }, [selected]);

  const _cartStorage = async () => {
    let temp = savedItem;
    temp = {
      ...temp,
      logo: cartStore.storeLogoUrl,
      // totalPrice,
    };
    await AuthStorageModuel._setCartData(temp);
  };

  useEffect(() => {
    _cartStorage();
  }, [cartStore]);

  // console.log('store', savedItem);
  if (
    mutateStoreInfo.isLoading ||
    mutateTopMenu.isLoading ||
    mutateAllMunu.isLoading ||
    mutateGetStoreService.isLoading ||
    !mutateStoreInfo.data ||
    !mutateTopMenu.data ||
    !mutateAllMunu.data ||
    !mutateGetStoreService.data
  )
    return <Loading />;

  const StoreInfo = mutateStoreInfo.data.data.arrItems;
  const StoreAllMenu = mutateAllMunu.data.data.arrItems;
  const StoreTopMenu = mutateTopMenu.data.data.arrItems;
  const StoreServiceTime = mutateServiceTime?.data?.data?.arrItems;
  const StoreService = mutateGetStoreService.data.data.arrItems;

  // console.log('StoreInfo', StoreInfo);
  // console.log('StoreTopMenu', StoreTopMenu);
  // console.log('StoreTopMenu', StoreAllMenu);

  const _pressMenu = item => {
    if (StoreInfo.isOpen === 'N')
      return customAlert('알림', '현재 가게는 오픈 준비중 입니다.');
    navigation.navigate('OptionSelect', {
      it_id: item.it_id,
      jumju_id: routeData.jumju_id,
      jumju_code: routeData.jumju_code,
      mb_company: routeData.mb_company,
      it_img1: item.it_img1,
      store_logo: StoreInfo.store_logo,
      category: routeData.category,
    });
  };

  const data = [
    {key: 0, title: 'title1', data: [1]},
    {key: 1, title: 'title2', data: [21]},
  ];

  const renderItem = item => {
    console.log('ITEM::', item);
    return (
      <View
        style={{
          flex: 1,
          height: 1000,
          backgroundColor: item.index % 2 === 1 ? 'teal' : 'tomato',
        }}>
        <Text>{item.item}</Text>
      </View>
    );
  };

  const sectionHeader = section => {
    if (section.key !== 0) return <></>;
    return (
      <View style={{width: '100%', height: 50, backgroundColor: 'linen'}}>
        <Text>{section.title}</Text>
      </View>
    );
  };
  const TempComp = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'teal',
        }}></View>
    );
  };

  return (
    <>
      <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
        {/* <Header
          // title={'TEST'}
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            position: 'absolute',
            zIndex: 100,
          }}
        /> */}
        {/* <View
          style={{
            width: '100%',
            height: 50,
            // backgroundColor: 'pink',
            position: 'absolute',
            zIndex: 100,
          }}>
          <Image
            source={require('~/assets/top_ic_history.png')}
            style={{width: 40, height: 40}}
          />
        </View> */}
        <SectionList
          sections={data}
          stickySectionHeadersEnabled={true}
          keyExtractor={(item, index) => item.key}
          renderItem={item => renderItem(item)}
          renderSectionHeader={({section}) => sectionHeader(section)}
          onViewableItemsChanged={item => console.log('Changed', item)}
        />
      </SafeAreaView>
    </>
  );
};

export default MenuDetail2;

const styles = StyleSheet.create({
  titleTakout: {
    color: colors.fontColor99,
    marginVertical: 11,
  },
  subTitleTakeout: {
    color: colors.fontColor3,
  },
});
