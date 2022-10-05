import {View, Text, useWindowDimensions, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../component/Loading';
import {ScrollView} from 'react-native';
import ImageSwipe from '../../component/menuDetail/ImageSwipe';
import MenuDesc from '../../component/menuDetail/MenuDesc';
import MiniMap from '../map/MiniMap';
import {setIsLifeStyle} from '../../store/reducers/CategoryReducer';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {hasNotch} from 'react-native-device-info';

const LifeStyleStoreInfo = ({navigation, route}) => {
  const {mutateGetLifeStyleStoreInfo} = useCustomMutation();
  const {userInfo} = useSelector(state => state.authReducer);
  const {isLifeStyle} = useSelector(state => state.categoryReducer);
  const [lifeInfo, setLifeInfo] = useState();
  const routeData = route.params;
  const dispatch = useDispatch();

  const _init = () => {
    // if (!userInfo) {
    //   Alert.alert('알림', '로그인이 필요합니다.', [
    //     {
    //       text: '로그인 하러 가기',
    //       onPress: () =>
    //         navigation.reset({
    //           routes: [{name: 'Login'}],
    //         }),
    //     },
    //   ]);
    //   return;
    // }
    const data = {
      jumju_id: routeData.jumju_id,
      jumju_code: routeData.jumju_code,
      mt_id: userInfo.mt_id,
    };
    console.log('route', route.params);

    mutateGetLifeStyleStoreInfo.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true') {
          setLifeInfo(e.data.arrItems);
          console.log('e', e);
        }
      },
    });
  };

  if (routeData?.link) {
    useFocusEffect(
      useCallback(() => {
        // dispatch(setIsLifeStyle(true));
        // _init();
        dispatch(setIsLifeStyle(true));
        if (isLifeStyle) {
          _init();
        }
      }, [isLifeStyle]),
    );
  } else {
    useEffect(() => {
      _init();
    }, []);
  }

  // useEffect(() => {
  //   dispatch(setIsLifeStyle(true));
  //   if (isLifeStyle) {
  //     _init();
  //   }
  // }, [isLifeStyle]);

  if (!lifeInfo) return <Loading />;
  // console.warn('lifeinfo', lifeInfo);

  return (
    <SafeAreaView
      style={{...commonStyles.safeAreaStyle}}
      edges={['left', 'right']}
    >
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <Header
          navigation={navigation}
          showLike={true}
          showShare={true}
          iconColor={'white'}
          title={''}
          storeInfo={lifeInfo}
          categoryMain={routeData.category}
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            zIndex: 100,
            marginTop: hasNotch() ? '9%' : null,
            position: 'absolute',
          }}
        />
        <ImageSwipe images={lifeInfo.store_image} />
        <MenuDesc
          info={lifeInfo}
          likeCount={lifeInfo.mb_zzim_count}
          categoryMain={routeData.category}
          navigation={navigation}
        />
        <MiniMap lat={lifeInfo.mb_lat} lng={lifeInfo.mb_lng} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LifeStyleStoreInfo;
