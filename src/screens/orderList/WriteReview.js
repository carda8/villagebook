import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import TextBold from '../../component/text/TextBold';
import colors from '../../styles/colors';
import {_setRating} from '../../config/utils/modules';
import SetRating from '../../component/SetRating';

const WriteReview = ({navigation}) => {
  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
  };
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'리뷰작성'} navigation={navigation} />
      <ScrollView>
        <View style={{paddingHorizontal: 22, marginBottom: 30}}>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <TextBold style={{fontSize: 20, color: colors.primary}}>
              주문은 어떠셨나요?
            </TextBold>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              {/* {_setRating(false, {width: 40, height: 40})} */}
              <SetRating />
            </View>
          </View>
          <TextInput
            style={{
              borderRadius: 5,
              width: '100%',
              height: 200,
              backgroundColor: colors.inputBoxBG,
              paddingHorizontal: 10,
              textAlignVertical: 'top',
            }}
            multiline
            maxLength={500}
            placeholder="리뷰를 작성해주세요(최대 500자)"
          />
          <Pressable
            style={{
              height: 70,
              backgroundColor: colors.inputBoxBG,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <Image
              source={require('~/assets/btn_add.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: colors.fontColor2,
                marginRight: 10,
              }}
            />
            <TextBold
              style={{color: colors.fontColor2, includeFontPadding: false}}>
              리뷰 사진을 등록해주세요. (최대 5개)
            </TextBold>
          </Pressable>
          <Pressable
            style={{
              height: 45,
              backgroundColor: colors.primary,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <TextBold style={{color: 'white', includeFontPadding: false}}>
              리뷰 등록
            </TextBold>
          </Pressable>
          {/* <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Image
            source={require('~/assets/no_use_img.png')}
            style={{flex: 1, height: 50, marginRight: 10}}
          />
          <Image
            source={require('~/assets/no_use_img.png')}
            style={{flex: 1, height: 50, marginRight: 10}}
          />
          <Image
            source={require('~/assets/no_use_img.png')}
            style={{flex: 1, height: 50, marginRight: 10}}
          />
          <Image
            source={require('~/assets/no_use_img.png')}
            style={{flex: 1, height: 50, marginRight: 10}}
          />
          <Image
            source={require('~/assets/no_use_img.png')}
            style={{flex: 1, height: 50, marginRight: 10}}
          />
        </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WriteReview;
