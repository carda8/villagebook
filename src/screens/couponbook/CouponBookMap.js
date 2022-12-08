import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import NaverMapView from 'react-native-nmap';
import {Pressable} from 'react-native';
import colors from '../../styles/colors';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
import CouponFilterView from './CouponFilterView';
import {FlatList} from 'react-native';
import TextRegular from '../../component/text/TextRegular';
import {Shadow} from 'react-native-shadow-2';
import TextSBold from '../../component/text/TextSBold';
import {useWindowDimensions} from 'react-native';
import {useRef} from 'react';
import {Marker} from 'react-native-nmap';
import {Align} from 'react-native-nmap';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import TextMedium from '../../component/text/TextMedium';
import TextBold from '../../component/text/TextBold';
import TextLight from '../../component/text/TextLight';

const CouponBookMap = ({navigation}) => {
  const {currentLocation} = useSelector(state => state.locationReducer);
  const {couponbookData} = useSelector(state => state.couponReducer);
  const layout = useWindowDimensions();
  const [center, setCenter] = useState();
  const [cpbList, setCpbList] = useState([]);
  const [slctdCpb, setSlctdCpd] = useState();

  // 선택된 카테고리 필터
  const [pickedFilter, setPickedFilter] = useState(
    couponbookData ? '전체' : undefined,
  );

  // 펼치기 토글
  const [isOpen, setIsOpen] = useState(false);

  // flat ref
  const flatRef = useRef(null);

  const {mutateGetCouponBookList} = useCustomMutation();

  const _getBookList = () => {
    const data = {
      item_count: 0,
      limit_count: 10,
      ca_code: pickedFilter !== '전체' ? pickedFilter : '',
      ca_sort: '1',
    };
    console.log('## data', data);
    // return;
    mutateGetCouponBookList.mutate(data, {
      onSuccess: res => {
        console.log('## res', res.data);
        if (res.data.arrItems.length > 0) {
          setCpbList(res.data.arrItems);
        }
      },
    });
  };

  useEffect(() => {
    _getBookList();
  }, [pickedFilter]);

  useEffect(() => {
    console.log('couponbookData', couponbookData);
    if (currentLocation) {
      console.log('## USER LOCATION', currentLocation);
      setCenter({
        latitude: Number(currentLocation.lat),
        longitude: Number(currentLocation.lon),
        zoom: 13,
      });
    }
  }, []);

  const _sliceText = str => {
    let temp = str;
    // if (str.length > 6) {
    //   temp = temp.slice(0, 12);
    //   temp = temp.trim();
    //   temp = temp;
    // } else {
    temp = temp.slice(0, 7);
    temp = temp.trim();
    temp = temp;
    // }
    return temp;
  };

  const renderItem = item => {
    let element = item.item;
    const elementIdx = item.index;
    return (
      <Pressable
        onPress={() => {
          if (element?.ca_code) setPickedFilter(element?.ca_code);
          else setPickedFilter('전체');
        }}
        hitSlop={5}
        style={{
          height: 25,
          backgroundColor:
            element.ca_code === pickedFilter || element.ca_name === pickedFilter
              ? colors.primary
              : 'white',
          borderWidth: 1,
          borderColor:
            element.ca_code === pickedFilter || element.ca_name === pickedFilter
              ? colors.primary
              : colors.fontColorA2,
          marginRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          paddingHorizontal: 15,
        }}>
        <TextRegular
          style={{
            color:
              element.ca_code === pickedFilter ||
              element.ca_name === pickedFilter
                ? 'white'
                : colors.fontColor2,
          }}>
          {element?.ca_name}
        </TextRegular>
      </Pressable>
    );
  };

  const renderOpenItem = item => {
    const element = item.item;
    const elementIdx = item.index;
    // console.log('element', element);
    return (
      <Pressable
        hitSlop={3}
        onPress={() => {
          //   _onPressCate(element);
          if (element?.ca_code) setPickedFilter(element?.ca_code);
          else setPickedFilter('전체');
          setIsOpen(!isOpen);
          if (flatRef?.current) {
            flatRef.current.scrollToIndex({animated: true, index: elementIdx});
          }
          //   naviRef.current.navigate(element.ca_name);
          //   setInit(element.ca_name);
        }}
        style={{
          // flex: windo,
          width: layout.width / 4.6,
          height: 25,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 3,
          borderWidth: 1,
          borderColor:
            element.ca_code === pickedFilter || element.ca_name === pickedFilter
              ? colors.primary
              : colors.colorE3,
          backgroundColor:
            element.ca_code === pickedFilter || element.ca_name === pickedFilter
              ? colors.primary
              : 'white',
          borderRadius: 30,
          marginRight: 7,
        }}>
        <TextRegular
          style={{
            color:
              element.ca_code === pickedFilter ||
              element.ca_name === pickedFilter
                ? 'white'
                : colors.fontColor2,
            fontSize: 13,
          }}>
          {element.ca_name}
        </TextRegular>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: 100,
          paddingTop: 15,
          backgroundColor: isOpen ? 'white' : undefined,
        }}>
        <Pressable
          onPress={() => navigation.navigate('CouponBookSearch')}
          style={{
            flex: 1,
            height: 50,
            backgroundColor: 'white',
            borderWidth: 1.5,
            borderColor: colors.primary,
            borderRadius: 10,
            marginHorizontal: 14,
            justifyContent: 'center',
          }}>
          <Image
            source={require('~/assets/ico_search.png')}
            style={{
              tintColor: colors.primary,
              width: 22,
              height: 22,
              position: 'absolute',
              right: 10,
            }}
            resizeMode="contain"
          />
        </Pressable>

        <FlatList
          data={couponbookData ? couponbookData : []}
          ref={flatRef}
          horizontal
          hitSlop={5}
          showsHorizontalScrollIndicator={false}
          style={{marginLeft: 14, marginTop: 10, marginRight: 30}}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.ca_id}
        />
        <Pressable
          onPress={() => setIsOpen(!isOpen)}
          hitSlop={5}
          style={{
            bottom: 0,
            right: 4,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}>
          <Image
            source={require('~/assets/down_arrow.png')}
            style={{width: 24, height: 24}}
            resizeMode={'contain'}
          />
        </Pressable>
        {/* 펼칠시 나오는 뷰 */}
        {isOpen && (
          <FlatList
            data={couponbookData}
            keyExtractor={(item, index) => index}
            renderItem={item => renderOpenItem(item)}
            numColumns={4}
            style={{
              flex: 1,
              top: 75,
              position: 'absolute',
              backgroundColor: 'white',
              zIndex: 100,
              width: '100%',
            }}
            columnWrapperStyle={{
              flex: 1,
              marginBottom: 7,
              marginLeft: 14,
            }}
            ListFooterComponent={
              <Shadow distance={1} offset={[0, 1]} style={{width: '100%'}}>
                <Pressable
                  onPress={() => setIsOpen(!isOpen)}
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: 60,
                    marginBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.borderColor,
                    flexDirection: 'row',
                  }}>
                  <TextSBold style={{color: colors.fontColor2, fontSize: 16}}>
                    접어두기
                  </TextSBold>
                  <Image
                    source={require('~/assets/down_arrow.png')}
                    style={{
                      width: 26,
                      height: 26,
                      transform: [{rotate: '180deg'}],
                    }}
                    resizeMode="contain"
                  />
                </Pressable>
              </Shadow>
            }
          />
        )}
      </View>

      {slctdCpb && (
        <Shadow
          distance={5}
          offset={[0, 2]}
          style={{width: '100%'}}
          containerStyle={{
            position: 'absolute',
            zIndex: 100,
            width: '95%',
            alignSelf: 'center',
            bottom: 0,
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('CouponBookDetail');
            }}
            style={{
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: 10,
              height: 100,
              marginBottom: 15,
              paddingVertical: 10,
              paddingHorizontal: 10,
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            <Image
              source={
                slctdCpb.store_logo
                  ? {uri: slctdCpb.store_logo}
                  : require('~/assets/no_img.png')
              }
              style={{height: 80, width: 80}}
              resizeMode="cover"
            />
            <View
              style={{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextMedium
                  style={{color: colors.fontColor3, flex: 1}}
                  numberOfLines={1}>
                  {slctdCpb.store_name}
                </TextMedium>
                <TextLight
                  style={{
                    color: colors.fontColorA,
                    fontSize: 11,
                    marginRight: 5,
                  }}>
                  {slctdCpb.cp_end_txt}
                </TextLight>
              </View>
              <TextBold
                style={{fontSize: 16, color: colors.fontColor2}}
                numberOfLines={2}>
                {slctdCpb.cp_subject}
              </TextBold>
              <TextBold
                style={{fontSize: 13, color: colors.fontColorA2}}
                numberOfLines={2}>
                {slctdCpb.cp_memo}
              </TextBold>
            </View>
            <View
              style={{
                width: 1,
                height: 60,
                backgroundColor: colors.primary,
                alignSelf: 'center',
                marginRight: 5,
              }}
            />
            <View
              style={{
                width: 55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('~/assets/down_coupon.png')}
                style={{width: 45, height: 45}}
                resizeMode="contain"
              />
              <TextLight style={{fontSize: 12}}>
                {slctdCpb.cp_coupon_download_txt}
              </TextLight>
            </View>
          </Pressable>
        </Shadow>
      )}

      <NaverMapView
        center={center}
        style={{width: '100%', height: '100%'}}
        zoomControl={false}
        scaleBar={false}
        showsMyLocationButton={true}
        scrollGesturesEnabled={true}
        zoomGesturesEnabled={true}
        tiltGesturesEnabled={false}
        rotateGesturesEnabled={false}
        stopGesturesEnabled={false}
        liteModeEnabled={false}
        onCameraChange={e => {}}
        // useTextureView={true}
        onMapClick={e => {
          setSlctdCpd(undefined);
        }}>
        {/* <Marker
          width={35}
          height={35}
          image={require('~/assets/my_location.png')}
          coordinate={{
            latitude: Number(currentLocation.lat),
            longitude: Number(currentLocation.lon),
          }}
        /> */}
        {cpbList.map(
          (item, index) =>
            item?.store_lat &&
            item?.store_lng && (
              <Marker
                key={item.cp_jumju_code}
                //   anchor={{x: 10, y: 10}}
                //   alpha={0.1}
                //   caption={{
                //     text: '도착',
                //     align: Align.Center,
                //     // haloColor: '166DF0',
                //     textSize: 13,
                //     // color: 'ffffff',
                //     offset: -30,
                //   }}
                //   image={require('~/assets/ico_location.png')}
                //   pinColor={'#ffffff'}
                width={item.store_name.length < 9 ? 85 : 100}
                height={47}
                caption={{
                  text: _sliceText(item.store_name) + '..',
                  align: Align.Center,
                  // haloColor: '166DF0',
                  textSize: 12,
                  // color: 'ffffff',
                }}
                image={require('~/assets/map_tag.png')}
                coordinate={{
                  latitude: Number(
                    item.store_lat ? item.store_lat : currentLocation.lat,
                  ),
                  longitude: Number(
                    item.store_lng ? item.store_lng : currentLocation.lon,
                  ),
                }}
                onClick={() => {
                  console.log('onClick! :::', item);
                  setSlctdCpd(item);
                  setCenter({
                    latitude: Number(item.store_lat),
                    longitude: Number(item.store_lng),
                    zoom: 16,
                  });
                }}
              />
            ),
        )}
      </NaverMapView>
    </SafeAreaView>
  );
};

export default CouponBookMap;
