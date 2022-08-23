import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SectionList,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import Chip from '../../component/Chip';
import {customAlert} from '../../component/CustomAlert';
import DividerL from '../../component/DividerL';
import Dot from '../../component/Dot';
import ImageCover from '../../component/ImageCover';
import Loading from '../../component/Loading';
import ReviewSimple from '../../component/reviews/ReviewSimple';
import TextBold from '../../component/text/TextBold';
import TextRegular from '../../component/text/TextRegular';
import {replaceString} from '../../config/utils/Price';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {setIsLifeStyle} from '../../store/reducers/CategoryReducer';
import {setSearchResult} from '../../store/reducers/SearchReducer';
import colors from '../../styles/colors';

const SearchList = ({navigation}) => {
  const dispatch = useDispatch();
  const {mutateSearch} = useCustomMutation();
  const {searchResult, type, keyword} = useSelector(
    state => state.searchReducer,
  );
  const {currentLocation} = useSelector(state => state.locationReducer);
  console.log('searchResult', searchResult);
  const layout = useWindowDimensions();
  const IMG_CONTAINER = layout.width * 0.66; //레이아웃 높이
  const IMG_HEIGHT = IMG_CONTAINER * 0.64; //이미지

  const limitItem = useRef(0);

  useEffect(() => {
    limitItem.current = 0;
  }, [keyword]);

  const _getMoreSearch = () => {
    limitItem.current += 20;

    const data = {
      item_count: limitItem.current,
      limit_count: 20,
      stx: keyword,
      mb_jumju_type: type,
      mb_lat: currentLocation.lat,
      mb_lng: currentLocation.lon,
    };

    console.log('data', data);

    mutateSearch.mutate(data, {
      onSuccess: e => {
        let temp = e.data.arrItems;
        temp = temp.filter(item => item !== null);
        if (e.result === 'true' && temp.length > 0) {
          let prev = [...searchResult];
          prev[0] = prev[0].data.concat(temp[0].data);
          temp[0].data = prev[0];
          dispatch(setSearchResult(temp));
        } else return customAlert('알림', '더보기 가능한 스토어가 없습니다.');
      },
    });
  };

  const renderItem = item => {
    console.log('items', item);
    const storeInfo = item.item;
    return (
      <>
        <Pressable
          onPress={() => {
            if (type === 'lifestyle') {
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
              {!item?.section?.isOpen && type !== 'lifestyle' && <ImageCover />}

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
                {!item?.section?.isOpen && type !== 'lifestyle' && (
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
                {!item?.section?.isOpen && type !== 'lifestyle' && (
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
                  {type === 'lifestyle' && (
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
                {type !== 'lifestyle' && (
                  <ReviewSimple
                    star={storeInfo.stars}
                    review={storeInfo.store_review}
                  />
                )}
              </View>
              {type === 'lifestyle' && (
                <View>
                  <TextRegular style={{color: colors.fontColorA2}}>
                    거리 {storeInfo.distance}
                  </TextRegular>
                </View>
              )}

              {type !== 'lifestyle' && (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 9,
                  }}>
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
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      {type === 'lifestyle' ? (
        <FlatList
          data={searchResult}
          renderItem={item => renderItem(item)}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                marginTop: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={require('~/assets/no_store.png')}
                style={{width: 250, height: 250}}
              /> */}
            </View>
          }
          ListFooterComponentStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}
          ListFooterComponent={
            mutateSearch.isLoading ? (
              <Loading />
            ) : searchResult.length > 0 ? (
              <Pressable
                onPress={() => {
                  _getMoreSearch();
                }}
                style={{
                  width: 150,
                  height: 50,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primary,
                }}>
                <TextBold style={{color: 'white'}}>더보기</TextBold>
              </Pressable>
            ) : (
              <></>
            )
          }
          keyExtractor={(item, index) => index}
          onEndReached={() => {
            // _getMoreSearch();
          }}
        />
      ) : (
        <SectionList
          sections={searchResult}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                marginTop: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={require('~/assets/no_store.png')}
                style={{width: 250, height: 250}}
              /> */}
            </View>
          }
          ListFooterComponentStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}
          ListFooterComponent={
            mutateSearch.isLoading ? (
              <Loading />
            ) : searchResult.length > 0 ? (
              <Pressable
                onPress={() => {
                  _getMoreSearch();
                }}
                style={{
                  width: 150,
                  height: 50,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primary,
                }}>
                <TextBold style={{color: 'white'}}>더보기</TextBold>
              </Pressable>
            ) : (
              <></>
            )
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
          onEndReached={() => {
            // _getMoreSearch();
          }}
        />
      )}
    </View>
  );
};

export default SearchList;
