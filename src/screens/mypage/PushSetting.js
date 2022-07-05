import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import colors from '../../styles/colors';
import TextNotoB from '../../component/text/TextNotoB';
import TextMedium from '../../component/text/TextMedium';
import {useDispatch, useSelector} from 'react-redux';
import {
  setNotiAll,
  setNotiCouponPoint,
  setNotiEvent,
  setNotiReply,
  setNotiReqReview,
} from '../../store/reducers/PushReducer';

const PushSetting = ({navigation}) => {
  const dispatch = useDispatch();
  const pushState = useSelector(state => state.pushReducer);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'알림 설정'} showCart={true} navigation={navigation} />
      <View style={{flex: 1}}>
        <View
          style={{
            ...style.container,
            backgroundColor: colors.inputBoxBG,
          }}>
          <TextNotoB style={{fontSize: 17}}>푸시알림(전체)</TextNotoB>
          <Pressable
            hitSlop={10}
            onPress={() => dispatch(setNotiAll(!pushState.NotiAll))}>
            <Image
              source={
                pushState.NotiAll
                  ? require('~/assets/switch_on.png')
                  : require('~/assets/switch_off.png')
              }
              style={{width: 72, height: 31}}
            />
          </Pressable>
        </View>

        <View
          style={{
            ...style.container,
            backgroundColor: 'white',
          }}>
          <TextMedium style={{fontSize: 17}}>
            이벤트 혜택 / 새 글 알림
          </TextMedium>
          <Pressable
            hitSlop={10}
            onPress={() => dispatch(setNotiEvent(!pushState.NotiEvent))}>
            <Image
              source={
                pushState.NotiEvent
                  ? require('~/assets/switch_on.png')
                  : require('~/assets/switch_off.png')
              }
              style={{width: 72, height: 31}}
            />
          </Pressable>
        </View>

        <View
          style={{
            ...style.container,
            backgroundColor: 'white',
          }}>
          <TextMedium style={{fontSize: 17}}>리뷰 작성 요청 알림</TextMedium>
          <Pressable
            hitSlop={10}
            onPress={() =>
              dispatch(setNotiReqReview(!pushState.NotiReqReview))
            }>
            <Image
              source={
                pushState.NotiReqReview
                  ? require('~/assets/switch_on.png')
                  : require('~/assets/switch_off.png')
              }
              style={{width: 72, height: 31}}
            />
          </Pressable>
        </View>

        <View
          style={{
            ...style.container,
            backgroundColor: 'white',
          }}>
          <TextMedium style={{fontSize: 17}}>리뷰 댓글 작성 알림</TextMedium>
          <Pressable
            hitSlop={10}
            onPress={() => dispatch(setNotiReply(!pushState.NotiReply))}>
            <Image
              source={
                pushState.NotiReply
                  ? require('~/assets/switch_on.png')
                  : require('~/assets/switch_off.png')
              }
              style={{width: 72, height: 31}}
            />
          </Pressable>
        </View>

        {/* <View
          style={{
            ...style.container,
            backgroundColor: 'white',
          }}>
          <TextMedium style={{fontSize: 17}}>포인트 적립 관련 알림</TextMedium>
          <Pressable
            hitSlop={10}
            onPress={() => dispatch(setNotiReply(!pushState.NotiReply))}>
            <Image
              source={
                pushState.NotiReply
                  ? require('~/assets/switch_on.png')
                  : require('~/assets/switch_off.png')
              }
              style={{width: 72, height: 31}}
            />
          </Pressable>
        </View> */}

        <View
          style={{
            ...style.container,
            backgroundColor: colors.inputBoxBG,
          }}>
          <TextNotoB style={{fontSize: 17}}>쿠폰 & 포인트 적립 알림</TextNotoB>
          <Pressable
            hitSlop={10}
            onPress={() =>
              dispatch(setNotiCouponPoint(!pushState.NotiCouponPoint))
            }>
            <Image
              source={
                pushState.NotiCouponPoint
                  ? require('~/assets/switch_on.png')
                  : require('~/assets/switch_off.png')
              }
              style={{width: 72, height: 31}}
            />
          </Pressable>
        </View>
        {/* 
        <View
          style={{
            ...style.container,
            backgroundColor: 'white',
          }}>
          <TextMedium style={{fontSize: 17}}>알람 수신 시간 설정</TextMedium>
          <Pressable
            hitSlop={10}
            onPress={() => dispatch(setNotiTime(!pushState.NotiTime))}>
            <Image
              source={
                pushState.NotiTime
                  ? require('~/assets/switch_on.png')
                  : require('~/assets/switch_off.png')
              }
              style={{width: 72, height: 31}}
            />
          </Pressable>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default PushSetting;

const style = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
});
