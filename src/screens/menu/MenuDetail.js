import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Header from '../../component/Header';
import ImageSwipe from '../../component/menuDetail/ImageSwipe';
import MenuList from '../../component/menuDetail/MenuList';
import MenuDesc from '../../component/menuDetail/MenuDesc';
import commonStyles from '../../styles/commonStyle';
import colors from '../../styles/colors';
import TextRegular from '../../component/text/TextRegular';
import Dot from '../../component/Dot';
import {color} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import TextMedium from '../../component/text/TextMedium';
import TextBold from '../../component/text/TextBold';
import TextNotoM from '../../component/text/TextNotoM';
import TextNotoR from '../../component/text/TextNotoR';
import TextNotoB from '../../component/text/TextNotoB';
import DividerL from '../../component/DividerL';
import {Slider} from '@miblanchard/react-native-slider';
import ImagePicker, {launchCamera} from 'react-native-image-picker';
import {useMutation} from 'react-query';
import storeAPI from '../../api/modules/storeAPI';
import Loading from '../../component/Loading';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {customAlert} from '../../component/CustomAlert';
import {replaceString} from '../../config/utils/Price';
import {useDispatch, useSelector} from 'react-redux';
import {setStoreLogo} from '../../store/reducers/CartReducer';

const MenuDetail = ({navigation, route}) => {
  const {mutateTopMenu, mutateStoreInfo, mutateAllMunu, mutateServiceTime} =
    useCustomMutation();
  const dispatch = useDispatch();
  const {storeLogoUrl} = useSelector(state => state.cartReducer);
  const {savedItem} = useSelector(state => state.cartReducer);

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

  const _setRating = isTotal => {
    const temp = 5;
    let temp2 = [];

    for (let i = 0; i < temp; i++) {
      temp2.push(
        <Image
          key={i}
          source={require('~/assets/ico_star_on.png')}
          style={{width: isTotal ? 20 : 16, height: isTotal ? 20 : 16}}
          resizeMode="contain"
        />,
      );
    }

    return temp2;
  };

  const _setSlider = () => {
    const temp = 5;
    let temp2 = [];
    for (let i = 0; i < 5; i++) {
      temp2.push(
        <View key={i} style={{flexDirection: 'row'}}>
          <Slider
            value={1}
            maximumValue={5}
            disabled
            minimumTrackTintColor={colors.primary}
            trackStyle={{
              backgroundColor: 'white',
              height: 5,
              padding: 0,
              margin: 0,
            }}
            containerStyle={{width: 87, height: 20}}
            renderThumbComponent={() => <></>}
          />
          <Text style={{marginLeft: 10}}>{'5점 (40)'}</Text>
        </View>,
      );
    }
    return temp2;
  };

  const _init = () => {
    const data = {
      jumju_id: routeData.jumju_id,
      jumju_code: routeData.jumju_code,
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
  }, []);

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

  useEffect(() => {
    if (mutateStoreInfo.data)
      dispatch(setStoreLogo(mutateStoreInfo.data.data.arrItems.store_logo));
  }, [mutateStoreInfo.data]);

  if (
    mutateStoreInfo.isLoading ||
    mutateTopMenu.isLoading ||
    mutateAllMunu.isLoading ||
    !mutateStoreInfo.data ||
    !mutateTopMenu.data ||
    !mutateAllMunu.data
  )
    return <Loading />;

  const StoreInfo = mutateStoreInfo.data.data.arrItems;
  const StoreAllMenu = mutateAllMunu.data.data.arrItems;
  const StoreTopMenu = mutateTopMenu.data.data.arrItems;
  const StoreServiceTime = mutateServiceTime?.data?.data?.arrItems;

  // console.log('StoreTopMenu', StoreTopMenu);
  // console.log('StoreTopMenu', StoreAllMenu);

  return (
    <>
      <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
        <View
          style={{
            top: 50,
            position: 'absolute',
            opacity: trigger && index === 0 ? 1 : 0,
            zIndex: trigger && index === 0 ? 1000 : -1,
            backgroundColor: 'white',
            minWidth: layout.width,
          }}>
          <ScrollView
            horizontal
            hitSlop={20}
            ref={scrollRefSub}
            showsHorizontalScrollIndicator={false}>
            {mutateAllMunu.data.data.arrItems?.map((item, index) => (
              <Pressable
                disabled={!trigger && index === 0}
                key={index}
                ref={el => (chipTarget.current[index] = el)}
                onPress={() => {
                  focusTarget.current[index].measureLayout(
                    scrollRef.current,
                    (left, top, width, height) => {
                      scrollRef.current.scrollTo({
                        y: top - 90,
                        animated: true,
                      });
                      console.log('position', left, top, width, height);
                    },
                  );

                  chipTarget.current[index].measureLayout(
                    scrollRefSub.current,
                    (left, top, width, height) => {
                      console.log('widht', width);
                      scrollRefSub.current.scrollTo({
                        x: left - layout.width / 3 - 10,
                        animated: true,
                      });
                    },
                  );
                  setSelected({idx: index, isScrolling: false});
                }}
                style={{
                  height: 40,
                  // width: chipWidth,
                  minWidth: 67,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor:
                    selected.idx === index ? colors.chipBorder : colors.colorE3,
                  marginVertical: 10,
                  paddingHorizontal: 5,
                  marginHorizontal: 5,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextMedium style={{fontSize: 14}}>{item.ca_name}</TextMedium>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <ScrollView
          ref={scrollRef}
          stickyHeaderIndices={[3]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}
          // contentOffset={{x: 0, y: 100}}
          // scrollEnabled={false}
          contentContainerStyle={{paddingBottom: 60}}
          scrollEventThrottle={100}
          onScrollBeginDrag={e => {
            if (selected.isScrolling !== true) {
              setSelected({...selected, isScrolling: true});
            }
          }}
          onScroll={e => {
            const positionY = e.nativeEvent.contentOffset.y;
            if (positionY >= 300 && headerTrigger === false)
              setHeaderTrigger(true);
            if (positionY <= 300 && headerTrigger === true)
              setHeaderTrigger(false);

            if (positionY >= temp && trigger === false) setTrigger(true);
            if (positionY <= temp && trigger === true) setTrigger(false);
            if (selected.isScrolling && index === 0) {
              mutateAllMunu.data.data.arrItems?.map((item, index) => {
                focusTarget.current[index].measureLayout(
                  scrollRef.current,
                  (left, top, width, height) => {
                    if (
                      positionY > top - 100 &&
                      positionY < top + 30 &&
                      selected.idx !== index
                    ) {
                      setSelected({...selected, idx: index});
                    }
                  },
                );
              });
            }
          }}>
          <Header
            navigation={navigation}
            showLike={true}
            showShare={true}
            iconColor={'white'}
            title={''}
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              position: 'absolute',
              zIndex: 100,
            }}
          />

          <ImageSwipe images={mutateStoreInfo.data.data.arrItems.store_image} />
          <MenuDesc info={mutateStoreInfo.data} />
          <View>
            {/* 메뉴, 정보, 리뷰 탭 */}
            <View
              style={{
                flexDirection: 'row',
                borderTopColor: colors.borderColor,
                height: 50,
              }}>
              <Pressable
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopWidth: index === 0 ? 2 : 1,
                  borderBottomWidth: index === 0 ? 0 : 1,
                  borderRightWidth: index === 0 ? 1 : 0,
                  borderRightColor: colors.borderColor,
                  borderTopColor:
                    index === 0 ? colors.borderColor22 : colors.borderColor,
                  borderBottomColor: colors.borderColor,
                }}
                onPress={() => {
                  setIndex(0);
                }}>
                <TextMedium style={{fontSize: 14}}>메뉴</TextMedium>
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopWidth: index === 1 ? 2 : 1,
                  borderBottomWidth: index === 1 ? 0 : 1,
                  borderRightWidth: index === 1 ? 1 : 0,
                  borderRightColor: colors.borderColor,
                  borderLeftWidth: index === 1 ? 1 : 0,
                  borderLeftColor: colors.borderColor,
                  borderTopColor:
                    index === 1 ? colors.borderColor22 : colors.borderColor,
                  borderBottomColor: colors.borderColor,
                }}
                onPress={() => {
                  setIndex(1);
                }}>
                <TextMedium style={{fontSize: 14}}>정보</TextMedium>
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopWidth: index === 2 ? 2 : 1,
                  borderBottomWidth: index === 2 ? 0 : 1,
                  borderLeftWidth: index === 2 ? 1 : 0,
                  borderLeftColor: colors.borderColor,
                  borderTopColor:
                    index === 2 ? colors.borderColor22 : colors.borderColor,
                  borderBottomColor: colors.borderColor,
                }}
                onPress={() => {
                  setIndex(2);
                }}>
                <TextMedium style={{fontSize: 14}}>리뷰</TextMedium>
              </Pressable>
            </View>
          </View>
          {index === 0 && (
            <>
              <View
                style={{flex: 1}}
                onLayout={e => {
                  setTemp(e.nativeEvent.layout.y + 20);
                }}>
                <View style={{paddingHorizontal: 22, paddingVertical: 29}}>
                  <TextRegular style={{fontSize: 15}}>
                    수제버거 맛나버거가 부산에 상륙했습니다! 소고기 패티에
                    신선한 야채와 치즈의 만남! 리뷰이벤트준비했으니 많이많이
                    참여해주세요!
                  </TextRegular>
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 20,
                    paddingHorizontal: 22,
                    backgroundColor: colors.couponBG,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 11,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Dot
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 8 / 2,
                        backgroundColor: colors.borderColor22,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'CoreGothicD-CoreGothicDBold',
                        color: colors.fontColor2,
                        fontSize: 22,
                        marginHorizontal: 14,
                      }}>
                      대표메뉴
                    </Text>
                    <Dot
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 8 / 2,
                        backgroundColor: colors.borderColor22,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    {/* 대표메뉴 */}
                    {/* OptionSelect route data 추후 수정 필요 */}
                    {/* 수정 완료 07/21 j */}
                    {StoreTopMenu?.map((item, index) => (
                      <Pressable
                        onPress={() => {
                          navigation.navigate('OptionSelect', {
                            it_id: item.it_id,
                            jumju_id: routeData.jumju_id,
                            jumju_code: routeData.jumju_code,
                            it_img1: item.it_img1,
                          });
                        }}
                        key={index}
                        style={{
                          flex: 1,
                          padding: 22,
                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderColor: colors.primary,
                          marginBottom: 10,
                          borderRadius: 12,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              width: 80,
                              height: 80,
                              borderWidth: 1,
                              borderRadius: 10,
                              marginRight: 15,
                              borderColor: colors.borderColor,
                              overflow: 'hidden',
                              elevation: 5,
                            }}>
                            <FastImage
                              source={
                                item.it_img1
                                  ? {uri: item.it_img1}
                                  : '~/assets/no_img.png'
                              }
                              resizeMode={FastImage.resizeMode.cover}
                              style={{flex: 1}}
                            />
                          </View>
                          <View style={{flex: 1}}>
                            <TextMedium
                              style={{fontSize: 17, color: colors.fontColor2}}>
                              {item.it_name}
                            </TextMedium>
                            <TextMedium
                              numberOfLines={2}
                              style={{fontSize: 12, color: colors.fontColor8}}>
                              {item.it_explan}
                            </TextMedium>
                          </View>
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                          <TextBold
                            style={{fontSize: 17, color: colors.fontColor2}}>
                            {replaceString(item.it_price)}원
                          </TextBold>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                </View>

                {StoreAllMenu?.map((item, index) => (
                  <View key={index}>
                    <View
                      style={{
                        height: 50,
                        paddingVertical: 15,
                        paddingHorizontal: 22,
                        borderBottomWidth: 1,
                        borderColor: colors.borderColor,
                      }}>
                      <Text style={{color: colors.fontColor2}}>
                        {item.ca_name}
                      </Text>
                    </View>
                    <View
                      key={index}
                      ref={el => (focusTarget.current[index] = el)}
                      style={{
                        flex: 1,
                        backgroundColor: 'white',
                      }}>
                      {/* ALL */}
                      <View style={{flex: 1}}>
                        {item.menus.map((item, index) => (
                          <Pressable
                            onPress={() => {
                              navigation.navigate('OptionSelect', {
                                it_id: item.it_id,
                                jumju_id: routeData.jumju_id,
                                jumju_code: routeData.jumju_code,
                                it_img1: item.it_img1,
                              });
                            }}
                            key={index}
                            style={{
                              flex: 1,
                              padding: 22,
                              backgroundColor: 'white',
                              borderBottomWidth: 1,
                              borderColor: colors.borderColor,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  width: 80,
                                  height: 80,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                  marginRight: 15,
                                  borderColor: colors.borderColor,
                                  overflow: 'hidden',
                                }}>
                                <FastImage
                                  source={
                                    item.it_img1
                                      ? {uri: item.it_img1}
                                      : require('~/assets/no_img.png')
                                  }
                                  resizeMode={FastImage.resizeMode.cover}
                                  style={{flex: 1}}
                                />
                              </View>
                              <View style={{flex: 1}}>
                                <TextMedium
                                  style={{
                                    fontSize: 17,
                                    color: colors.fontColor2,
                                  }}>
                                  {item.it_name}
                                </TextMedium>
                                <TextMedium
                                  numberOfLines={2}
                                  style={{
                                    fontSize: 12,
                                    color: colors.fontColor8,
                                  }}>
                                  {item.it_explan}
                                </TextMedium>
                                <TextBold
                                  style={{
                                    fontSize: 17,
                                    color: colors.fontColor2,
                                  }}>
                                  {replaceString(item.it_price)}
                                </TextBold>
                              </View>
                            </View>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {index === 1 && (
            <View style={{flex: 1}}>
              <View
                style={{
                  paddingVertical: 32,
                  paddingHorizontal: 22,
                }}>
                <TextNotoM style={{fontSize: 17}}>매장정보</TextNotoM>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 13,
                    flexDirection: 'row',
                  }}>
                  <View style={{}}>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      상호
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      대표자명
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      전화번호
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      사업자번호
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      주소
                    </TextRegular>
                  </View>

                  <View style={{marginLeft: 22, flex: 1}}>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      {StoreInfo.mb_biz_name}
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      {StoreInfo.mb_name}
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      {StoreInfo.mb_hp}
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      {StoreInfo.mb_biz_no}
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      {StoreInfo.mb_addr1 + ' ' + StoreInfo.mb_addr2}
                    </TextRegular>
                  </View>
                </View>
              </View>
              <DividerL />
              <View
                style={{
                  paddingVertical: 32,
                  paddingHorizontal: 22,
                }}>
                <TextNotoM style={{fontSize: 17}}>영업시간</TextNotoM>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 13,
                    flexDirection: 'row',
                  }}>
                  <View style={{}}>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      영업시간
                    </TextRegular>
                    {/* <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      토요일
                    </TextRegular> */}
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      BREAK TIME
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      휴무일
                    </TextRegular>
                  </View>

                  <View style={{marginLeft: 22}}>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      {StoreServiceTime.serviceTime[0] ??
                        '해당 정보가 없습니다.'}
                    </TextRegular>
                    {/* <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      {StoreServiceTime.serviceTime ?? '해당 정보가 없습니다.'}
                    </TextRegular> */}
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      {StoreServiceTime.serviceBreakTime[0] ??
                        '해당 정보가 없습니다.'}
                    </TextRegular>
                    <TextRegular style={{color: colors.fontColor3}}>
                      {StoreServiceTime.serviceHoilday ??
                        '해당 정보가 없습니다.'}
                    </TextRegular>
                  </View>
                </View>
              </View>
            </View>
          )}
          {index === 2 && (
            <View style={{flex: 1}}>
              <View style={{paddingHorizontal: 22, paddingVertical: 29}}>
                <TextRegular style={{fontSize: 15}}>
                  리뷰 이벤트를 진행하시면 서비스로 OO을 드립니다. 참여시려면
                  주문시 비고란에 리뷰 참여라고 입력 하시고 반드시 리뷰를
                  작성해주세요~
                </TextRegular>
              </View>

              <View
                style={{
                  height: 227,
                  backgroundColor: '#F5F5F5',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 22,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <TextBold style={{fontSize: 15}}>이 상품에 </TextBold>
                  <TextBold style={{fontSize: 15, color: colors.primary}}>
                    {'00명'}
                  </TextBold>
                  <TextBold style={{fontSize: 15}}>이</TextBold>
                </View>

                <TextBold style={{fontSize: 15}}>
                  소중한 리뷰를 남겨주었습니다.
                </TextBold>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <TextBold style={{fontSize: 44, color: colors.primary}}>
                      {''}4.3
                    </TextBold>
                    <View style={{flexDirection: 'row'}}>
                      {_setRating(true)}
                    </View>
                  </View>
                  <View style={{marginLeft: 30}}>{_setSlider()}</View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  paddingHorizontal: 22,
                  paddingVertical: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 15,
                  }}>
                  <Image
                    source={require('~/assets/no_img.png')}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 38 / 2,
                      marginRight: 13,
                    }}
                    resizeMode="contain"
                  />
                  <View>
                    {/* 카메라 돌아 저장 시 돌아감  */}
                    {/* <Pressable
                      onPress={async () => {
                        await PermissionsAndroid.request(
                          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        );
                        const result = await launchCamera(
                          {
                            mediaType: 'photo',
                            // saveToPhotos: true,
                          },
                          res => {
                            console.log('result::', res);
                          },
                        );
                        console.log('result', result);
                      }}
                      style={{height: 20, backgroundColor: 'gray'}}></Pressable> */}
                    <TextBold style={{fontSize: 15, color: colors.fontColor2}}>
                      맛집대동여지도
                    </TextBold>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TextRegular
                        style={{fontSize: 13, color: colors.fontColorA2}}>
                        7달전
                      </TextRegular>
                      <View style={{flexDirection: 'row', marginLeft: 23}}>
                        {_setRating(false)}
                      </View>
                    </View>
                  </View>
                </View>
                <TextRegular>
                  맛있어요 맛있어요 맛있어요 맛있어요 맛있어요 맛있어요 맛있어요
                  맛있어요 맛있어요 맛있어요 맛있어요 맛있어요
                </TextRegular>
                <FastImage
                  source={require('~/assets/dummy/CK_tc01560002923_l.jpg')}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{
                    flex: 1,
                    height: 245,
                    marginTop: 20,
                    marginBottom: 8,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    borderRadius: 15,
                    borderTopLeftRadius: 0,
                    backgroundColor: colors.storeIcon,
                    paddingVertical: 16,
                    paddingHorizontal: 13,
                  }}>
                  <View
                    style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Image
                      source={require('~/assets/no_img.png')}
                      style={{width: 38, height: 38, borderRadius: 38 / 2}}
                      resizeMode="cover"
                    />
                    <View style={{marginLeft: 15, flex: 1}}>
                      <TextBold style={{fontSize: 16, color: colors.primary}}>
                        맛나버거 부산대점
                      </TextBold>
                      <TextRegular
                        style={{fontSize: 13, color: colors.fontColorA2}}>
                        {Date()}
                      </TextRegular>
                      <TextRegular
                        style={{
                          fontSize: 15,
                          color: colors.fontColor2,
                          marginTop: 7,
                        }}>
                        맛있다고 하시니 다행입니다. 많이 이용해주세요
                      </TextRegular>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {index !== 2 && (
            <>
              <DividerL />
              <View
                style={{
                  paddingHorizontal: 22,
                  paddingVertical: 20,
                  backgroundColor: 'white',
                }}>
                <TextNotoM
                  style={{
                    fontSize: 17,
                    color: colors.fontColor2,
                    includeFontPadding: false,
                    marginBottom: 7,
                  }}>
                  원산지 표기
                </TextNotoM>
                <TextNotoR
                  style={{
                    fontSize: 13,
                    color: colors.fontColor8,
                    includeFontPadding: false,
                  }}>
                  햄치즈, 햄스페셜, 햄치즈포테이토(햄-돼지고기 : 국내산, 닭고기
                  : 국내산)햄치즈, 햄스페셜, 햄치즈포테이토(햄-돼지고기 :
                  국내산, 닭고기 : 국내산)햄치즈, 햄스페셜,
                  햄치즈포테이토(햄-돼지고기 : 국내산, 닭고기 : 국내산)햄치즈,
                  햄스페셜, 햄치즈포테이토(햄-돼지고기 : 국내산, 닭고기 :
                  국내산)
                </TextNotoR>
              </View>

              <View
                style={{
                  paddingHorizontal: 22,
                  paddingVertical: 20,
                  backgroundColor: colors.inputBoxBG,
                  marginTop: 20,
                }}>
                <TextNotoB
                  style={{
                    fontSize: 14,
                    color: colors.fontColor3,
                    includeFontPadding: false,
                    marginBottom: 7,
                  }}>
                  유의사항
                </TextNotoB>
                <TextNotoR
                  style={{
                    fontSize: 13,
                    color: colors.fontColor8,
                    includeFontPadding: false,
                  }}>
                  메뉴사진은 연출된 이미지로 실제 조리된 음식과 다를수 있습니다.
                  상단 메뉴 및 가격은 업소에서 제공한 정보를 기준으로
                  작성되었으며 변동될 수 있습니다.
                </TextNotoR>
              </View>

              <View
                style={{
                  paddingHorizontal: 22,
                  paddingVertical: 20,
                  backgroundColor: colors.inputBoxBG,
                }}>
                <TextNotoB
                  style={{
                    fontSize: 14,
                    color: colors.fontColor3,
                    includeFontPadding: false,
                    marginBottom: 7,
                  }}>
                  유의사항
                </TextNotoB>
                <TextNotoR
                  style={{
                    fontSize: 13,
                    color: colors.fontColor8,
                    includeFontPadding: false,
                  }}>
                  메뉴사진은 연출된 이미지로 실제 조리된 음식과 다를수 있습니다.
                  상단 메뉴 및 가격은 업소에서 제공한 정보를 기준으로
                  작성되었으며 변동될 수 있습니다.
                </TextNotoR>
              </View>
              <View
                style={{
                  paddingHorizontal: 22,
                  paddingVertical: 20,
                  backgroundColor: colors.inputBoxBG,
                }}>
                <TextNotoB
                  style={{
                    fontSize: 14,
                    color: colors.fontColor3,
                    includeFontPadding: false,
                    marginBottom: 7,
                  }}>
                  유의사항
                </TextNotoB>
                <TextNotoR
                  style={{
                    fontSize: 13,
                    color: colors.fontColor8,
                    includeFontPadding: false,
                  }}>
                  메뉴사진은 연출된 이미지로 실제 조리된 음식과 다를수 있습니다.
                  상단 메뉴 및 가격은 업소에서 제공한 정보를 기준으로
                  작성되었으며 변동될 수 있습니다.
                </TextNotoR>
              </View>
            </>
          )}
        </ScrollView>

        {/* 장바구니 아이템 존재시 카트 버튼 표시 */}
        {savedItem.savedItems.length > 0 && (
          <Pressable
            onPress={() => {
              navigation.navigate('SummitOrder');
            }}
            style={{
              position: 'absolute',
              top: layout.height - 60,
              height: 60,
              width: '100%',
              backgroundColor: colors.primary,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    marginLeft: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TextBold
                    style={{
                      fontSize: 16,
                      color: colors.primary,
                      includeFontPadding: false,
                    }}>
                    {savedItem.savedItems.length > 9
                      ? '9+'
                      : savedItem.savedItems.length}
                  </TextBold>
                </View>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <TextBold style={{fontSize: 16, color: 'white'}}>
                  카트 확인하기
                </TextBold>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <TextBold style={{fontSize: 16, color: 'white'}}>
                  {replaceString(_calcTotalPrice())}원
                </TextBold>
              </View>
            </View>
          </Pressable>
        )}
      </SafeAreaView>
    </>
  );
};

export default MenuDetail;
