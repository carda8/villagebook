import {View, Text, FlatList, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import TextRegular from '../../component/text/TextRegular';
import colors from '../../styles/colors';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';

const OrderList = ({navigation}) => {
  const arr = [1, 2, 3, 4, 5, 6];

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
            backgroundColor: colors.storeIcon,
            paddingHorizontal: 22,
            paddingVertical: 10,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <TextRegular>
              주문일자 : {dayjs().format('YYYY-MM-DD HH:mm')}
            </TextRegular>
          </View>
          <View
            style={{
              width: 110,
              height: 20,
              borderRadius: 20,
              backgroundColor: '#D91313',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextRegular style={{color: 'white'}}>배달 / 주문누락</TextRegular>
          </View>
        </View>
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
          <View style={{marginLeft: 10, flex: 1}}>
            <TextRegular style={{fontSize: 16}}>맛나버거 부산대점</TextRegular>
            <TextRegular>메뉴 100원</TextRegular>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 40,
            paddingHorizontal: 22,
            marginBottom: 15,
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('MenuDetail');
            }}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.borderColor,
              marginRight: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextRegular style={{color: colors.fontColor2}}>
              가게보기
            </TextRegular>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('OrderSumary');
            }}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.borderColor,
              marginRight: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextRegular style={{color: colors.fontColor2}}>
              주문상세
            </TextRegular>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('WriteReview');
            }}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.borderColor,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextRegular style={{color: colors.fontColor2}}>
              리뷰쓰기
            </TextRegular>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'주문내역'} navigation={navigation} showCart={true} />

      <FlatList
        data={arr}
        renderItem={item => renderItem(item)}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default OrderList;
