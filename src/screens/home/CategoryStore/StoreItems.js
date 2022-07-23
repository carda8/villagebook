import {
  Image,
  Pressable,
  SectionList,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
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

// 2.1 : 1
const StoreItems = ({navigation, route}) => {
  const routeData = route.params;
  // console.log('roueteData', routeData);
  const [storeList, setStoreList] = useState('');

  const _fliterList = data => {
    return data.filter((item, index) => item !== null);
  };

  const mutateGetStoreList = useMutation(mainAPI._getStoreList, {
    onSuccess: e => {
      console.log('ee', e);
      console.log('eee', e.data.arrItems);
      const temp = _fliterList(e.data.arrItems);
      console.log('temp e', temp);
      setStoreList(temp);
      // setCategoryData(e.data.arrItems);
    },
  });

  const _init = code => {
    console.log('storeitem', routeData);
    const data = {
      mb_ca_code: route.params.ca_code,
      item_count: '0',
      limit_count: '10',
      mb_jumju_type:
        routeData.category === 'lifestyle' ? 'food' : routeData.category,
      mb_ca_sort: '0',
    };
    console.log('data', data);
    mutateGetStoreList.mutate(data);
  };

  useEffect(() => {
    _init();
  }, [routeData]);

  useEffect(() => {
    console.log('storeList', storeList);
  }, [storeList]);

  const layout = useWindowDimensions();
  const IMG_CONTAINER = layout.width * 0.66; //레이아웃 높이
  const IMG_HEIGHT = IMG_CONTAINER * 0.64; //이미지
  const dispatch = useDispatch();

  //368 88 279
  const renderItem = item => {
    console.log('itemssss', item);
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
          navigation.navigate('MenuDetail', {
            jumju_id: storeInfo.mb_id,
            jumju_code: storeInfo.mb_jumju_code,
            mb_company: storeInfo.mb_company,
          });
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
              backgroundColor: 'gray',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              overflow: 'hidden',
            }}>
            {!item?.section?.isOpen && <ImageCover />}
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
              {!item?.section?.isOpen && <ImageCover />}
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
              {!item?.section?.isOpen && <ImageCover />}
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
              </View>
              <ReviewSimple
                star={storeInfo.stars}
                review={storeInfo.store_review}
              />
            </View>
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
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <TextRegular style={{color: colors.fontColorA2}}>
                  최소 주문{' '}
                </TextRegular>
                <TextRegular>{replaceString(storeInfo.minPrice)}원</TextRegular>
              </View>
            </View>
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

  if (!storeList) return <Loading />;
  // storeList[0] !== null && storeList[1] !== null ? storeList : []
  console.log('storeligttt', storeList);
  return (
    <View style={{flex: 1}}>
      <SectionList
        sections={storeList}
        ListEmptyComponent={() => (
          <View>
            <TextBold>검색결과가 없습니다</TextBold>
          </View>
        )}
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

      {/* <FlatList
        data={dummy}
        showsVerticalScrollIndicator={false}
        renderItem={item => renderItem(item)}
        keyExtractor={(item, index) => index}
        onEndReached={() => {}}
      /> */}
    </View>
  );
};

export default StoreItems;
