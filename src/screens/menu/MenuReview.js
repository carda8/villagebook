import {View, Text, Image, FlatList, Pressable, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import TextRegular from '../../component/text/TextRegular';
import TextBold from '../../component/text/TextBold';
import colors from '../../styles/colors';
import FastImage from 'react-native-fast-image';
import {Slider} from '@miblanchard/react-native-slider';
import dayjs from 'dayjs';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import Loading from '../../component/Loading';
import {customAlert} from '../../component/CustomAlert';

const MenuReview = ({storeInfo}) => {
  const {mutateGetReview} = useCustomMutation();
  const [review, setReview] = useState();

  const itemLimit = useRef(0);

  const _getReview = () => {
    console.log('StoreInfo2', storeInfo);
    const data = {
      item_count: itemLimit.current,
      limit_count: 20,
      bo_table: 'review',
      jumju_id: storeInfo.mb_id,
      jumju_code: storeInfo.mb_jumju_code,
    };
    mutateGetReview.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true' && e.data.arrItems.review.length > 0) {
          setReview(e.data.arrItems);
          console.log('ee', e);
        } else {
          setReview([]);
          console.log('e', e);
        }
      },
    });
  };

  const _getMoreReview = () => {
    itemLimit.current += 20;

    const data = {
      item_count: itemLimit.current,
      limit_count: 20,
      bo_table: 'review',
      jumju_id: storeInfo.mb_id,
      jumju_code: storeInfo.mb_jumju_code,
    };
    mutateGetReview.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true' && e.data.arrItems.review.length > 0) {
          const temp = e.data.arrItems;
          const prev = {...review};
          prev.review = prev.review.concat(temp.review);
          //   temp.review = temp.review.concat(prev.review);
          console.log('ee', e);
          console.log('temp', prev);
          setReview(prev);
        } else {
          customAlert('알림', '마지막 페이지입니다.');
          console.log('e', e);
        }
      },
    });
  };

  const _setRating = (isTotal, userRate) => {
    const temp = 5;
    let count = userRate ?? 0;
    let temp2 = [];

    for (let i = 0; i < temp; i++) {
      temp2.push(
        <Image
          key={i}
          source={
            count
              ? count > i
                ? require('~/assets/ico_star_on.png')
                : require('~/assets/ico_star_off.png')
              : require('~/assets/ico_star_off.png')
          }
          style={{width: isTotal ? 20 : 16, height: isTotal ? 20 : 16}}
          resizeMode="contain"
        />,
      );
    }

    return temp2;
  };

  const _showRateAvg = avg => {
    if (avg % 1 === 0) {
      return avg + '.0';
    } else return avg ?? 0.0;
    // console.log('avg', avg % 1);
  };

  const _showDate = date => {
    return date;
  };

  const _setSlider = () => {
    let temp2 = [];
    for (let i = 0; i < 5; i++) {
      temp2.push(
        <View key={i} style={{flexDirection: 'row'}}>
          <Slider
            value={review?.rate[`rating_per` + (i - 5) * -1]}
            maximumValue={review?.rate.total_cnt}
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
          <Text style={{marginLeft: 10}}>{`${(i - 5) * -1}점 (${
            review?.rate[`rating_cnt` + (i - 5) * -1]
          })`}</Text>
        </View>,
      );
    }
    return temp2;
  };

  const ListHeader = () => {
    return (
      <>
        <View style={{paddingHorizontal: 22, paddingVertical: 29}}>
          {/* <TextRegular style={{fontSize: 15}}>{review?.notice}</TextRegular> */}
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
              {review.rate.total_cnt ?? '0'}명
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
                {_showRateAvg(review.rate.avg)}
              </TextBold>
              <View style={{flexDirection: 'row'}}>
                {_setRating(true, review.rate.avg)}
              </View>
            </View>
            <View style={{marginLeft: 30}}>{_setSlider()}</View>
          </View>
        </View>
      </>
    );
  };

  const ReviewList = ({item}) => {
    console.log('item', item);
    return (
      <>
        {/* 사용자 리뷰 */}
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
              source={
                item.profile
                  ? {uri: item.profile}
                  : require('~/assets/no_use_img.png')
              }
              style={{
                width: 38,
                height: 38,
                borderRadius: 38 / 2,
                marginRight: 13,
              }}
              resizeMode="contain"
            />
            <View>
              <TextBold style={{fontSize: 15, color: colors.fontColor2}}>
                {item.wr_mb_id}
              </TextBold>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextRegular style={{fontSize: 13, color: colors.fontColorA2}}>
                  {_showDate(item.datetime)}
                </TextRegular>
                <View style={{flexDirection: 'row', marginLeft: 23}}>
                  {_setRating(false, 5)}
                </View>
              </View>
            </View>
          </View>
          <TextRegular>{item.content}</TextRegular>
          {item?.pic.map((item, index) => (
            <View key={index}>
              {index === 0 && (
                <FastImage
                  source={item ? {uri: item} : require('~/assets/no_img.png')}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{
                    flex: 1,
                    height: 245,
                    marginTop: 20,
                    marginBottom: 8,
                    borderRadius: 10,
                  }}
                />
              )}
            </View>
          ))}

          {/* 점주 댓글 */}
          <View
            style={{
              borderRadius: 15,
              borderTopLeftRadius: 0,
              backgroundColor: colors.storeIcon,
              paddingVertical: 16,
              paddingHorizontal: 13,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <Image
                source={require('~/assets/no_img.png')}
                style={{width: 38, height: 38, borderRadius: 38 / 2}}
                resizeMode="cover"
              />
              <View style={{marginLeft: 15, flex: 1}}>
                <TextBold style={{fontSize: 16, color: colors.primary}}>
                  맛나버거 부산대점
                </TextBold>
                <TextRegular style={{fontSize: 13, color: colors.fontColorA2}}>
                  {dayjs().format('YYYY-MM-DD')}
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
      </>
    );
  };

  useEffect(() => {
    _getReview();

    return () => {};
  }, []);

  if (!review)
    return (
      <View style={{height: 400, width: '100%'}}>
        <Loading />
      </View>
    );

  return (
    <>
      <View style={{flex: 1}}>
        {/* 리뷰탭 내부 상단 리뷰 정보*/}
        <ListHeader />
        {review.review.map((item, index) => (
          <ReviewList item={item} key={index} />
        ))}

        {/* 더보기 버튼*/}
        {mutateGetReview.isLoading ? (
          <Loading />
        ) : (
          <Pressable
            onPress={() => {
              _getMoreReview();
            }}
            style={{
              width: 150,
              height: 50,
              borderRadius: 10,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.primary,
            }}>
            <TextBold style={{color: 'white'}}>더보기</TextBold>
          </Pressable>
        )}
      </View>
    </>
  );
};

export default React.memo(MenuReview);
