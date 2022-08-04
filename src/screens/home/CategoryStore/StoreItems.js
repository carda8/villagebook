import {
  FlatList,
  Image,
  Pressable,
  SectionList,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import Chip from '../../../component/Chip';
import Dot from '../../../component/Dot';
import ImageCover from '../../../component/ImageCover';
import ReviewSimple from '../../../component/reviews/ReviewSimple';
import TextBold from '../../../component/text/TextBold';
import TextRegular from '../../../component/text/TextRegular';
import {setCurrentStoreCode} from '../../../store/reducers/CartReducer';
import colors from '../../../styles/colors';
import {useMutation} from 'react-query';
import Loading from '../../../component/Loading';
import mainAPI from '../../../api/modules/mainAPI';
import {replaceString} from '../../../config/utils/Price';
import DividerL from '../../../component/DividerL';
import {useCustomMutation} from '../../../hooks/useCustomMutation';
import {Errorhandler} from '../../../config/ErrorHandler';
import {setIsLifeStyle} from '../../../store/reducers/CategoryReducer';

// 2.1 : 1
const StoreItems = ({navigation, route}) => {
  const routeData = route.params;
  const dispatch = useDispatch();
  const {currentLocation} = useSelector(state => state.locationReducer);
  const {currentFilter} = useSelector(state => state.categoryReducer);

  // console.log('roueteData', routeData);
  const [storeList, setStoreList] = useState();
  const {mutateGetLifeStyle} = useCustomMutation();

  const _fliterList = data => {
    return data.filter((item, index) => item !== null);
  };

  const mutateGetStoreList = useMutation(mainAPI._getStoreList, {
    onSuccess: e => {
      if (e.result === 'true') {
        console.log('mutateGetStoreList', e.data.arrItems);
        const temp = _fliterList(e.data.arrItems);
        setStoreList(temp);
      }
      // console.log('temp e', temp);
      // setCategoryData(e.data.arrItems);
    },
  });

  useEffect(() => {
    console.log('curfilter', currentFilter);
  }, [currentFilter]);

  const itemLimit = useRef(0);

  const _init = more => {
    // console.log('storeitem', routeData);
    if (more) itemLimit.current += 20;
    const data = {
      mb_ca_code: routeData.ca_code,
      item_count: more ? itemLimit.current : 0,
      limit_count: 30,
      mb_jumju_type: routeData.category,
      mb_ca_sort: currentFilter + 1,
      mb_lat: currentLocation.lat,
      mb_lng: currentLocation.lon,
    };
    console.log('mutateGetStoreList ::', data);

    if (routeData.category === 'lifestyle') {
      delete data.mb_ca_sort;
      mutateGetLifeStyle.mutate(data, {
        onSuccess: e => {
          if (e.result === 'true') {
            console.log('ee', e);
            const temp = _fliterList(e.data.arrItems);
            console.log('temp', temp);
            setStoreList(temp);
          } else setStoreList([]);
        },
      });
    } else {
      mutateGetStoreList.mutate(data);
    }
  };

  useEffect(() => {
    _init();
  }, [route.parma, currentFilter]);

  useEffect(() => {
    console.log('storeList', storeList);
  }, [storeList]);

  const layout = useWindowDimensions();
  const IMG_CONTAINER = layout.width * 0.66; //레이아웃 높이
  const IMG_HEIGHT = IMG_CONTAINER * 0.64; //이미지

  //368 88 279
  const renderItem = item => {
    // console.log('itemssss', item);
    const storeCode = item.item.storeCode;
    const storeInfo = item.item;
    return (
      <Pressable
        onPress={() => {
          console.log('code', storeInfo.mb_jumju_code);
          // dispatch(
          //   setCurrentStoreCode({
          //     code: storeInfo.mb_jumju_code,
          //     jumju_id: storeInfo.mb_id,
          //     storeName: storeInfo.mb_company,
          //   }),
          // );
          if (routeData.category === 'lifestyle') {
            dispatch(setIsLifeStyle(true));
            navigation.navigate('LifeStyleStoreInfo', {
              jumju_id: storeInfo.mb_id,
              jumju_code: storeInfo.mb_jumju_code,
              mb_company: storeInfo.mb_company,
            });
          } else {
            dispatch(setIsLifeStyle(false));
            navigation.navigate('MenuDetail', {
              jumju_id: storeInfo.mb_id,
              jumju_code: storeInfo.mb_jumju_code,
              mb_company: storeInfo.mb_company,
            });
          }
        }}
        style={{
          flex: 1,
          // height: IMG_CONTAINER,
          marginVertical: 23,
        }}>
        <View
          style={{
            height: IMG_HEIGHT,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              marginRight: 1,
              backgroundColor: colors.inputBoxBG,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              overflow: 'hidden',
            }}>
            {!item?.section?.isOpen && routeData.category !== 'lifestyle' && (
              <ImageCover />
            )}

            <FastImage
              source={{uri: item.item.store_image[0]}}
              resizeMode={FastImage.resizeMode.cover}
              style={{flex: 1}}
            />
          </View>

          <View
            style={{
              width: layout.width * 0.24,
            }}>
            <View
              style={{
                flex: 1,
                borderTopRightRadius: 10,
                marginBottom: 1,
                overflow: 'hidden',
              }}>
              {!item?.section?.isOpen && routeData.category !== 'lifestyle' && (
                <ImageCover />
              )}

              <FastImage
                source={
                  storeInfo.store_image[1]
                    ? {uri: storeInfo.store_image[1]}
                    : require('~/assets/no_img.png')
                }
                resizeMode={FastImage.resizeMode.cover}
                style={{flex: 1}}
              />
            </View>

            <View
              style={{
                flex: 1,
                borderBottomRightRadius: 10,
                overflow: 'hidden',
              }}>
              {!item?.section?.isOpen && routeData.category !== 'lifestyle' && (
                <>
                  <ImageCover />
                </>
              )}
              <FastImage
                source={
                  storeInfo.store_image[2]
                    ? {uri: storeInfo.store_image[2]}
                    : storeInfo.store_image[2] ?? require('~/assets/no_img.png')
                }
                resizeMode={FastImage.resizeMode.cover}
                style={{flex: 1}}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginTop: 22,
          }}>
          <View style={{marginBottom: 9}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 1}} clip>
                <Text
                  style={{fontFamily: 'Pretendard-Medium', fontSize: 16}}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {storeInfo.mb_company}
                </Text>
                {routeData.category === 'lifestyle' && (
                  <Text
                    style={{
                      fontFamily: 'Pretendard-Medium',
                      fontSize: 12,
                      color: colors.fontColorA,
                    }}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {storeInfo?.mb_addr1} {storeInfo?.mb_addr2}
                  </Text>
                )}
              </View>
              {routeData.category !== 'lifestyle' && (
                <ReviewSimple
                  star={storeInfo.stars}
                  review={storeInfo.store_review}
                />
              )}
            </View>
            {routeData.category !== 'lifestyle' && (
              <View
                style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 9}}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TextRegular style={{color: colors.fontColorA2}}>
                    배달팁{' '}
                  </TextRegular>
                  <TextRegular style={{color: colors.fontColor6}}>
                    {replaceString(storeInfo.tipFrom)}원~
                    {replaceString(storeInfo.tipTo)}원
                  </TextRegular>
                  <Dot />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('~/assets/time.png')}
                    style={{width: 14, height: 14}}
                  />
                  <TextRegular> 30분~</TextRegular>
                  <TextRegular>40분</TextRegular>
                  <Dot />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <TextRegular style={{color: colors.fontColorA2}}>
                      최소 주문{' '}
                    </TextRegular>
                    <TextRegular>
                      {replaceString(storeInfo.minPrice)}원
                    </TextRegular>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <TextRegular style={{color: colors.fontColorA2}}>
                      거리 {storeInfo.distance}
                    </TextRegular>
                  </View>
                </View>
              </View>
            )}
          </View>
          <Chip
            coupon={storeInfo.coupon}
            newStore={storeInfo.new}
            takeout={storeInfo.wrap}
          />
        </View>
      </Pressable>
    );
  };

  if (
    mutateGetStoreList.isLoading ||
    mutateGetLifeStyle.isLoading ||
    !storeList
  )
    return <Loading />;
  // storeList[0] !== null && storeList[1] !== null ? storeList : []
  // console.log('storeligttt', storeList);
  return (
    <View style={{flex: 1}}>
      {routeData.category === 'lifestyle' ? (
        <FlatList
          data={storeList}
          keyExtractor={(item, index) => item + index}
          renderItem={item => renderItem(item)}
          ListEmptyComponent={() => (
            <View>
              <TextBold>검색결과가 없습니다</TextBold>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <SectionList
          sections={storeList}
          ListEmptyComponent={
            <View>
              <TextBold>검색결과가 없습니다</TextBold>
            </View>
          }
          keyExtractor={(item, index) => item + index}
          renderItem={item => renderItem(item)}
          renderSectionHeader={({section: {isOpen}}) =>
            !isOpen && (
              <>
                <DividerL style={{marginBottom: 20}} />
                <TextBold style={{fontSize: 20}}>준비중이에요</TextBold>
              </>
            )
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default StoreItems;
