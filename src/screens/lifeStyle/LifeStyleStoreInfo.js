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

const LifeStyleStoreInfo = ({navigation, route}) => {
  const {mutateGetLifeStyleStoreInfo} = useCustomMutation();
  const {userInfo} = useSelector(state => state.authReducer);
  const [lifeInfo, setLifeInfo] = useState();
  const routeData = route.params;
  const dispatch = useDispatch();
  const layout = useWindowDimensions();

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
    }
    dispatch(setIsLifeStyle(true));

    const data = {
      jumju_id: routeData.jumju_id,
      jumju_code: routeData.jumju_code,
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

  useEffect(() => {
    _init();
  }, []);

  if (!lifeInfo) return <Loading />;

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header
        navigation={navigation}
        // showLike={true}
        showShare={true}
        iconColor={'white'}
        title={''}
        storeInfo={lifeInfo}
        categoryMain={routeData.category}
        style={{
          backgroundColor: 'rgba(0,0,0,0)',
          position: 'absolute',
          zIndex: 100,
        }}
      />
      <ScrollView
        stickyHeaderIndices={[3]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        alwaysBounceVertical={false}
        // contentOffset={{x: 0, y: 100}}
        // scrollEnabled={false}
        contentContainerStyle={{paddingBottom: 60}}>
        <ImageSwipe images={lifeInfo.store_image} />
        <MenuDesc info={lifeInfo} />
        <MiniMap lat={lifeInfo.mb_lat} lng={lifeInfo.mb_lng} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LifeStyleStoreInfo;
