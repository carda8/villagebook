import {
  FlatList,
  Image,
  Platform,
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
import colors from '../../../styles/colors';
import {replaceString} from '../../../config/utils/Price';
import DividerL from '../../../component/DividerL';
import {useCustomMutation} from '../../../hooks/useCustomMutation';
import {Errorhandler} from '../../../config/ErrorHandler';
import {setIsLifeStyle} from '../../../store/reducers/CategoryReducer';
import {customAlert} from '../../../component/CustomAlert';
import Loading from '../../../component/Loading';
import {setCurrentStoreCode} from '../../../store/reducers/CartReducer';
import {Shadow} from 'react-native-shadow-2';
import FilterView from './FilterView';
import {RefreshControl} from 'react-native';
import Divider from '../../../component/Divider';
import TextMedium from '../../../component/text/TextMedium';

// 2.1 : 1
const StoreItems = ({navigation, route}) => {
  const routeData = route.params;
  const dispatch = useDispatch();
  const {currentLocation} = useSelector(state => state.locationReducer);
  const {currentFilter} = useSelector(state => state.categoryReducer);

  const [storeList, setStoreList] = useState([]);
  const {mutateGetLifeStyle, mutateGetStoreList} = useCustomMutation();

  const _fliterList = data => {
    console.log('data', data);
    return data.filter((item, index) => item !== null);
  };

  const itemLimit = useRef(0);

  const _init = () => {
    itemLimit.current = 0;
    const data = {
      mb_ca_code: routeData.ca_code,
      item_count: itemLimit.current,
      limit_count: 20,
      mb_jumju_type: routeData.category,
      mb_ca_sort: currentFilter + 1,
      mb_lat: currentLocation.lat,
      mb_lng: currentLocation.lon,
    };
    console.log('mutateGetStoreList ::', data);

    if (routeData.category === 'lifestyle') {
      mutateGetLifeStyle.mutate(data, {
        onError: e => {
          setStoreList('');
        },
        onSuccess: e => {
          if (e.result === 'true') {
            console.log('ee', e);
            const temp = _fliterList(e.data.arrItems);
            console.log('temp', temp);
            setStoreList(temp);
          } else setStoreList('');
        },
      });
    } else {
      mutateGetStoreList.mutate(data, {
        onSuccess: e => {
          if (e.result === 'true') {
            console.log('mutateGetStoreList2', e.data.arrItems);
            const temp = _fliterList(e.data.arrItems);
            setStoreList(temp);
          }
        },
      });
    }
  };

  const _getMoreStoreList = () => {
    itemLimit.current += 20;
    const data = {
      mb_ca_code: routeData.ca_code,
      item_count: itemLimit.current,
      limit_count: 20,
      mb_jumju_type: routeData.category,
      mb_ca_sort: currentFilter + 1,
      mb_lat: currentLocation.lat,
      mb_lng: currentLocation.lon,
    };
    console.log('itemLImit ::::::::', itemLimit.current);
    if (routeData.category === 'lifestyle') {
      mutateGetLifeStyle.mutate(data, {
        onSuccess: e => {
          if (e.result === 'true') {
            console.log('ee', e);
            console.log('list', storeList);
            const temp = _fliterList(e.data.arrItems);
            console.log('temp3333333333', temp);
            setStoreList(prev => prev.concat(temp));
          } else return;
        },
      });
    } else {
      mutateGetStoreList.mutate(data, {
        onSuccess: e => {
          console.log('life e', e);
          if (!e.data.arrItems[0] && !e.data.arrItems[1]) return;
          if (e.result === 'true' && e.data.arrItems.length > 0) {
            const temp = _fliterList(e.data.arrItems);
            let prev = [...storeList];
            prev[0].data = prev[0].data.concat(temp[0].data);
            console.log('prev', prev);
            setStoreList(prev);
          } else {
            return;
          }
        },
      });
    }
  };

  useEffect(() => {
    _init();
  }, [route.parma, currentFilter]);

  const layout = useWindowDimensions();
  const IMG_CONTAINER = layout.width * 0.66; //레이아웃 높이
  const IMG_HEIGHT = IMG_CONTAINER * 0.64; //이미지

  const renderItem = item => {
    const storeCode = item.item.storeCode;
    const storeInfo = item.item;
    return (
      <Shadow
        offset={[0, 1]}
        distance={3}
        style={{width: '100%', height: '100%'}}
        containerStyle={{
          marginVertical: 7,
          marginHorizontal: 14,
          flex: 1,
        }}>
        <Pressable
          onPress={() => {
            console.log('code', storeInfo.mb_jumju_code);
            if (routeData.category === 'lifestyle') {
              dispatch(setIsLifeStyle(true));
              navigation.navigate('LifeStyleStoreInfo', {
                jumju_id: storeInfo.mb_id,
                jumju_code: storeInfo.mb_jumju_code,
                mb_company: storeInfo.mb_company,
                category: routeData.category,
                likeCount: storeInfo?.mb_zzim_count,
              });
            } else {
              dispatch(setIsLifeStyle(false));
              navigation.navigate('MenuDetail2', {
                jumju_id: storeInfo.mb_id,
                jumju_code: storeInfo.mb_jumju_code,
                mb_company: storeInfo.mb_company,
                category: routeData.category,
              });
            }
          }}
          style={{
            // flex: 1,
            // height: IMG_CONTAINER,
            // marginHorizontal: 22,
            // marginVertical: 11,
            borderRadius: 10,
            backgroundColor: 'white',
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
                borderTopRightRadius:
                  storeInfo.store_image?.length === 1 ? 10 : null,
                // borderBottomLeftRadius: 10,
                overflow: 'hidden',
              }}>
              {!item?.section?.isOpen && routeData.category !== 'lifestyle' && (
                <>
                  <ImageCover text={true} />
                </>
              )}
              <FastImage
                source={{uri: item.item.store_image[0]}}
                resizeMode={FastImage.resizeMode.cover}
                style={{flex: 1}}
              />
            </View>
            {storeInfo.store_image?.length > 1 && (
              <>
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
                    {!item?.section?.isOpen &&
                      routeData.category !== 'lifestyle' && <ImageCover />}

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
                      // borderBottomRightRadius: 10,
                      overflow: 'hidden',
                    }}>
                    {!item?.section?.isOpen &&
                      routeData.category !== 'lifestyle' && (
                        <>
                          <ImageCover />
                        </>
                      )}
                    <FastImage
                      source={
                        storeInfo.store_image[2]
                          ? {uri: storeInfo.store_image[2]}
                          : storeInfo.store_image[2] ??
                            require('~/assets/no_img.png')
                      }
                      resizeMode={FastImage.resizeMode.cover}
                      style={{flex: 1}}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
          <View
            style={{
              flex: 1,
              // justifyContent: 'flex-end',
              padding: 10,
            }}>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flex: 1,
                      // marginBottom: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        marginRight: 20,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{}}>
                          <Text
                            style={{
                              fontFamily: 'Pretendard-Medium',
                              fontSize: 16,
                            }}
                            ellipsizeMode="tail"
                            numberOfLines={1}>
                            {storeInfo.mb_company}
                          </Text>
                        </View>
                        <View style={{flex: 1}}>
                          <TextRegular
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              color: colors.fontColorA2,
                              fontSize: 12,
                              marginLeft: 5,
                            }}>
                            {storeInfo.mb_jongmog}
                          </TextRegular>
                        </View>
                        {/* <View
                          style={{
                            marginLeft: 5,
                            flex: 1,
                            // backgroundColor: 'teal',
                          }}
                        ></View> */}
                        {routeData.category !== 'lifestyle' && (
                          <ReviewSimple
                            star={storeInfo.stars}
                            review={storeInfo.store_review}
                          />
                        )}
                      </View>
                    </View>
                    {routeData.category === 'lifestyle' && (
                      <View
                        style={{
                          flex: 1,
                          maxWidth: 40,
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 5,
                        }}>
                        <Image
                          source={require('~/assets/top_heart_on.png')}
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                        <TextRegular>
                          {storeInfo?.mb_zzim_count
                            ? storeInfo?.mb_zzim_count
                            : 0}
                        </TextRegular>
                      </View>
                    )}
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{}}>
                      <TextRegular
                        style={{color: colors.fontColorA2, fontSize: 12}}>
                        {storeInfo.distance}
                      </TextRegular>
                    </View>
                    <Divider style={{marginHorizontal: 5}} />
                    <View style={{flex: 1}}>
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
                    </View>
                  </View>
                </View>
              </View>
              {routeData.category === 'lifestyle' && (
                <View
                  style={{
                    marginTop: 2,
                    // flexDirection: 'row',
                  }}>
                  <TextRegular
                    numberOfLines={1}
                    style={{color: colors.fontColorA2, fontSize: 12}}>
                    {storeInfo?.mb_opening_hours2}
                  </TextRegular>
                </View>
              )}

              {routeData.category === 'market' && (
                <>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      // marginTop: 9,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <>
                        {storeInfo.delivery_time ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Image
                              source={require('~/assets/time.png')}
                              style={{width: 14, height: 14}}
                            />
                            <TextRegular style={{fontSize: 12}}>
                              {storeInfo.delivery_time}
                            </TextRegular>
                            <Dot />
                          </View>
                        ) : (
                          <></>
                        )}
                      </>
                    </View>
                  </View> */}

                  {storeInfo.wrap && (
                    <View
                      style={{
                        // flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 50,
                          height: 22,
                          backgroundColor: '#57cc98',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                          marginTop: 4,
                          marginRight: 10,
                        }}>
                        <TextMedium style={{fontSize: 12, color: 'white'}}>
                          포장하기
                        </TextMedium>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexWrap: 'wrap',
                          // backgroundColor: 'teal',
                          flexDirection: 'row',
                          alignItems: 'center',
                          // justifyContent: 'center',
                        }}>
                        {storeInfo.cooking_time ? (
                          <>
                            <Image
                              source={require('~/assets/time.png')}
                              style={{width: 14, height: 14}}
                            />
                            <TextRegular style={{fontSize: 12}}>
                              {' ' + storeInfo.cooking_time}
                            </TextRegular>
                            <Dot />
                          </>
                        ) : (
                          <></>
                        )}

                        <TextRegular
                          style={{color: colors.fontColorA2, fontSize: 12}}>
                          최소 주문{' '}
                        </TextRegular>

                        <TextRegular
                          style={{color: colors.fontColor2, fontSize: 12}}>
                          {replaceString(storeInfo.minPriceWrap)}원{' '}
                        </TextRegular>
                      </View>
                    </View>
                  )}
                </>
              )}
            </View>

            {routeData.category === 'food' && (
              <>
                {storeInfo.forHere && (
                  <View
                    style={{
                      // flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 50,
                        height: 20,
                        backgroundColor: '#ff7800',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginTop: 4,
                        marginRight: 10,
                      }}>
                      <TextMedium style={{fontSize: 12, color: 'white'}}>
                        먹고가기
                      </TextMedium>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {storeInfo.cooking_time ? (
                        <>
                          <Image
                            source={require('~/assets/time.png')}
                            style={{width: 14, height: 14}}
                          />
                          <TextRegular style={{fontSize: 12}}>
                            {' ' + storeInfo.cooking_time}
                          </TextRegular>
                          <Dot />
                        </>
                      ) : (
                        <></>
                      )}

                      <TextRegular
                        style={{color: colors.fontColorA2, fontSize: 12}}>
                        최소 주문{' '}
                      </TextRegular>

                      <TextRegular
                        style={{color: colors.fontColor2, fontSize: 12}}>
                        {replaceString(storeInfo.minPriceForHere)}원{' '}
                      </TextRegular>
                    </View>
                  </View>
                )}

                {storeInfo.wrap && (
                  <View
                    style={{
                      // flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 50,
                        height: 22,
                        backgroundColor: '#57cc98',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginTop: 4,
                        marginRight: 10,
                      }}>
                      <TextMedium style={{fontSize: 12, color: 'white'}}>
                        포장하기
                      </TextMedium>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {storeInfo.cooking_time ? (
                        <>
                          <Image
                            source={require('~/assets/time.png')}
                            style={{width: 14, height: 14}}
                          />
                          <TextRegular style={{fontSize: 12}}>
                            {' ' + storeInfo.cooking_time}
                          </TextRegular>
                          <Dot />
                        </>
                      ) : (
                        <></>
                      )}

                      <TextRegular
                        style={{color: colors.fontColorA2, fontSize: 12}}>
                        최소 주문{' '}
                      </TextRegular>

                      <TextRegular
                        style={{color: colors.fontColor2, fontSize: 12}}>
                        {replaceString(storeInfo.minPriceWrap)}원{' '}
                      </TextRegular>

                      {/* <Dot />
                          <TextRegular
                            style={{color: colors.fontColorA2, fontSize: 12}}>
                            배달팁{' '}
                          </TextRegular>
                          <TextRegular
                            style={{color: colors.fontColor6, fontSize: 12}}>
                            {replaceString(storeInfo.tipFrom)}원~
                            {replaceString(storeInfo.tipTo)}원
                          </TextRegular> */}
                    </View>
                  </View>
                )}
              </>
            )}

            {storeInfo.delivery && (
              <View
                style={{
                  // flex: 1,
                  flexDirection: 'row',
                  // alignItems: 'center',
                  // justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 50,
                    height: 22,
                    backgroundColor: '#00bef0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    marginTop: 4,
                    marginRight: 10,
                  }}>
                  <TextMedium style={{fontSize: 12, color: 'white'}}>
                    배달하기
                  </TextMedium>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                      flexWrap: 'wrap',
                    }}>
                    {storeInfo.delivery_time ? (
                      <>
                        <Image
                          source={require('~/assets/time.png')}
                          style={{width: 14, height: 14}}
                        />
                        <TextRegular style={{fontSize: 12}}>
                          {' ' + storeInfo.delivery_time}
                        </TextRegular>
                        <Dot />
                      </>
                    ) : (
                      <></>
                    )}

                    <TextRegular
                      style={{color: colors.fontColorA2, fontSize: 12}}>
                      최소 주문{' '}
                    </TextRegular>

                    <TextRegular
                      style={{color: colors.fontColor2, fontSize: 12}}>
                      {replaceString(storeInfo.minPrice)}원{' '}
                    </TextRegular>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                      flexWrap: 'wrap',
                      marginLeft: 8,
                    }}>
                    <Dot />
                    <TextRegular
                      style={{color: colors.fontColorA2, fontSize: 12}}>
                      배달팁{' '}
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor6, fontSize: 12}}>
                      {replaceString(storeInfo.tipFrom)}원~
                      {replaceString(storeInfo.tipTo)}원
                    </TextRegular>
                  </View>
                </View>
              </View>
            )}

            {routeData.category !== 'lifestyle' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Chip
                  coupon={storeInfo.coupon}
                  newStore={storeInfo.new}
                  takeout={storeInfo.wrap}
                />
              </View>
            )}
          </View>
        </Pressable>
      </Shadow>
    );
  };

  return (
    <View style={{flex: 1}}>
      {console.log('route cate', routeData.category)}
      {routeData.category === 'lifestyle' ? (
        <FlatList
          data={storeList}
          keyExtractor={(item, index) => index}
          renderItem={item => renderItem(item)}
          ListEmptyComponent={
            mutateGetLifeStyle.isLoading ? (
              <Loading />
            ) : (
              (mutateGetLifeStyle.isError || mutateGetLifeStyle.isSuccess) &&
              storeList.length === 0 && (
                <View
                  style={{
                    flex: 1,
                    marginTop: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('~/assets/no_store.png')}
                    style={{width: 250, height: 250}}
                  />
                </View>
              )
            )
          }
          onEndReached={() => {
            storeList.length % 20 === 0 && _getMoreStoreList();
          }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <SectionList
          sections={storeList}
          ListEmptyComponent={
            mutateGetStoreList.isLoading ? (
              <Loading />
            ) : (
              (mutateGetStoreList.isError || mutateGetStoreList.isSuccess) &&
              storeList.length === 0 && (
                <View
                  style={{
                    flex: 1,
                    marginTop: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('~/assets/no_store.png')}
                    style={{width: 250, height: 250}}
                  />
                </View>
              )
            )
          }
          keyExtractor={(item, index) => item + index}
          renderItem={item => renderItem(item)}
          renderSectionHeader={({section: {isOpen}}) =>
            !isOpen && (
              <View>
                <DividerL style={{marginVertical: 15}} />
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            _getMoreStoreList();
          }}
        />
      )}
    </View>
  );
};

export default StoreItems;
