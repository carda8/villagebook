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

// 2.1 : 1
const StoreItems = ({navigation, route}) => {
  const routeData = route.params;
  const [storeList, setStoreList] = useState();
  const mutateGetStoreList = useMutation(mainAPI._getStoreList, {
    onSuccess: e => {
      const data = e.data.arrItems
      console.log('e', e);
      console.log('data', data)
      setStoreList(data)
      // setCategoryData(e.data.arrItems);
    },
  });

  const _init = async () => {
    const data = {
      mb_ca_code: routeData.ca_code,
      item_count: '0',
      limit_count: '10',
      mb_jumju_type: 'food',
      mb_ca_sort: '0',
    };
    console.log('data', data);
    mutateGetStoreList.mutate(data);
  };

  useEffect(() => {
    _init();
  }, []);

  const dummy = [
    {
      isOpen: true,
      data: [
        {
          name: '버거킹 부산대점',
          storeCode: 1,
          tip: 1000,
          review: 999,
        },
        {
          name: '롯데리아 부산대점',
          storeCode: 2,
          tip: 1000,
          review: 999,
        },
        {
          name: '맥도날드 부산대점',
          storeCode: 3,
          tip: 1000,
          review: 999,
        },
        {
          name: '인앤아웃 부산대점',
          storeCode: 4,
          tip: 1000,
          review: 999,
        },
        {
          name: '고든램지 버거',
          storeCode: 5,
          tip: 1000,
          review: 999,
        },
      ],
    },
    {
      isOpen: false,
      data: [
        {
          name: '버거킹 부산대점',
          storeCode: 6,
          tip: 1000,
          review: 999,
        },
        {
          name: '버거킹 구서점',
          storeCode: 7,
          tip: 1000,
          review: 999,
        },
        {
          name: 'KFC 구서점',
          storeCode: 8,
          tip: 1000,
          review: 999,
        },
        {
          name: '버거킹 부산대점',
          storeCode: 9,
          tip: 1000,
          review: 999,
        },
        {
          name: '버거킹 부산대점',
          storeCode: 10,
          tip: 1000,
          review: 999,
        },
      ],
    },
  ];

  console.log('dummy', dummy)
  const layout = useWindowDimensions();
  const IMG_CONTAINER = layout.width * 0.66; //레이아웃 높이
  const IMG_HEIGHT = IMG_CONTAINER * 0.64; //이미지
  const dispatch = useDispatch();

  //368 88 279
  const renderItem = item => {
    const storeCode = item.item.storeCode;
    // console.log('item', item);
    return (
      <Pressable
        onPress={() => {
          console.log('code', storeCode);
          dispatch(setCurrentStoreCode(storeCode));
          navigation.navigate('MenuDetail');
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
              source={require('~/assets/dummy/CK_tica114m19040077_l.jpg')}
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
                backgroundColor: 'teal',
                marginBottom: 1,
                overflow: 'hidden',
              }}>
              {!item?.section?.isOpen && <ImageCover />}
              <FastImage
                source={require('~/assets/dummy/CK_tica114m19040204_l.jpg')}
                resizeMode={FastImage.resizeMode.cover}
                style={{flex: 1}}
              />
            </View>
            <View
              style={{
                flex: 1,
                borderBottomRightRadius: 10,
                backgroundColor: 'orange',
                overflow: 'hidden',
              }}>
              {!item?.section?.isOpen && <ImageCover />}
              <FastImage
                source={require('~/assets/dummy/CK_tica114m19040043_l.jpg')}
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
                  {item.item.name} {route.params.cate}
                </Text>
              </View>
              <ReviewSimple />
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
                  0원~3,000원
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
                <TextRegular>8,000원</TextRegular>
              </View>
            </View>
          </View>
          <Chip coupon={true} newStore={true} takeout={true} />
        </View>
      </Pressable>
    );
  };
  console.log('keys', Object.values(storeList))
  return <Loading/>

  return (
    <View style={{flex: 1}}>
      <SectionList
        sections={storeList}
        keyExtractor={(item, index) => item + index}
        renderItem={item => renderItem(item)}
        renderSectionHeader={({section: {isOpen}}) =>
          !isOpen && <TextBold style={{fontSize: 20}}>준비중이에요</TextBold>
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
