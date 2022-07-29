import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import colors from '../../styles/colors';
import {render} from 'react-dom';
import Divider from '../../component/Divider';
import TextRegular from '../../component/text/TextRegular';
import TextBold from '../../component/text/TextBold';
import DividerL from '../../component/DividerL';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import TextLight from '../../component/text/TextLight';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useSelector} from 'react-redux';
import Loading from '../../component/Loading';

const Review = ({navigation}) => {
  const [input, setInput] = useState();
  const {mutateGetMyReview} = useCustomMutation();
  const [reviews, setReviews] = useState([]);
  const {userInfo} = useSelector(state => state.authReducer);
  const layout = useWindowDimensions();

  const itemLimit = useRef(0);

  const _getMyReview = () => {
    const data = {
      item_count: 0,
      limit_count: 20,
      bo_table: 'review',
      mt_id: userInfo.mt_id,
    };
    mutateGetMyReview.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true' && e.data.arrItems.length > 0)
          setReviews(e.data.arrItems);
        else setReviews([]);
        console.log('e', e);
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

  const renderItem = item => {
    const data = item.item;

    return (
      <View
        style={{
          flex: 1,
          borderTopWidth: 1,
          borderTopColor: colors.borderColor,
        }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 22,
            paddingBottom: 10,
            paddingTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FastImage
            source={
              data.mt_profile_url
                ? {uri: mt_profile_url}
                : require('~/assets/no_use_img.png')
            }
            style={{width: 70, height: 70, borderRadius: 20}}
          />
          <View
            style={{marginLeft: 10, flex: 1, justifyContent: 'space-between'}}>
            <TextBold style={{fontSize: 16, color: colors.fontColor2}}>
              {data.mb_company}
            </TextBold>
            <TextRegular style={{color: colors.fontColor2}}>
              {data?.menu}
            </TextRegular>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextLight style={{color: colors.fontColorA}}>
                {data.datetime}
              </TextLight>
              <View style={{flexDirection: 'row'}}>
                {_setRating(false, data.wr_score)}
              </View>
            </View>
          </View>
        </View>

        {data?.pic.map((item, index) => (
          <FastImage
            source={{uri: item}}
            style={{
              borderRadius: 10,
              alignSelf: 'center',
              width: layout.width - 44,
              height: layout.width - 44,
            }}
          />
        ))}
        <View style={{padding: 22}}>
          <TextRegular>{data.content}</TextRegular>
        </View>
      </View>
    );
  };

  useEffect(() => {
    _getMyReview();
  }, []);

  if (mutateGetMyReview.isLoading) return <Loading />;
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header
        title={'내가 작성한 리뷰'}
        navigation={navigation}
        showCart={true}
      />
      <FlatList
        data={reviews}
        ListEmptyComponent={
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TextRegular>리뷰가 등록되지 않았습니다.</TextRegular>
          </View>
        }
        ListHeaderComponent={() => (
          <>
            {/* <View
              style={{
                paddingHorizontal: 22,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="제목으로 검색해주세요"
                style={{
                  flex: 1,
                  height: 50,
                  borderWidth: 1,
                  borderColor: colors.borderColor,
                  borderRadius: 7,
                  paddingLeft: 20,
                  paddingRight: 40,
                }}></TextInput>
              <Image
                source={require('~/assets/ico_search.png')}
                style={{
                  position: 'absolute',
                  right: 36,
                  width: 20,
                  height: 20,
                  tintColor: colors.fontColor2,
                }}
              />
            </View>
            <DividerL /> */}
          </>
        )}
        ItemSeparatorComponent={() => <View style={{marginVertical: 20}} />}
        renderItem={item => renderItem(item)}
        keyExtractor={(item, index) => index}
        onEndReached={() => {}}
      />
    </SafeAreaView>
  );
};

export default Review;
