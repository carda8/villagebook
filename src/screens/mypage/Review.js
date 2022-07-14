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
import React, {useState} from 'react';
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
import {_setRating} from '../../config/utils/modules';

const Review = ({navigation}) => {
  const [input, setInput] = useState();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const layout = useWindowDimensions();
  const renderItem = item => {
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
            source={require('~/assets/no_use_img.png')}
            style={{width: 70, height: 70, borderRadius: 20}}
          />
          <View
            style={{marginLeft: 10, flex: 1, justifyContent: 'space-between'}}>
            <TextBold style={{fontSize: 16, color: colors.fontColor2}}>
              맛나버거 부산대점
            </TextBold>
            <TextRegular style={{color: colors.fontColor2}}>
              싸이버거 + 휠렛버거
            </TextRegular>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextLight style={{color: colors.fontColorA}}>
                {dayjs().format('YYYY-MM-DD')}
              </TextLight>
              {/* <View style={{flexDirection: 'row'}}>{_setRating()}</View> */}
            </View>
          </View>
        </View>
        <FastImage
          source={require('~/assets/dummy/CK_tc01560002923_l.jpg')}
          style={{width: layout.width, height: layout.width}}
        />
        <View style={{padding: 22}}>
          <TextRegular>잘먹었습니다!!!</TextRegular>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header
        title={'내가 작성한 리뷰'}
        navigation={navigation}
        showCart={true}
      />
      <FlatList
        data={arr}
        ListHeaderComponent={() => (
          <>
            <View
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
            <DividerL />
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
