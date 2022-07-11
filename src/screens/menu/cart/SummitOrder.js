import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../../styles/commonStyle';
import Header from '../../../component/Header';
import TextBold from '../../../component/text/TextBold';
import TextMedium from '../../../component/text/TextMedium';
import colors from '../../../styles/colors';
import TextRegular from '../../../component/text/TextRegular';
import OptionCount from '../OptionCount';
import DividerL from '../../../component/DividerL';
import Divider from '../../../component/Divider';
import CartButton from '../CartButton';

const SummitOrder = ({navigation}) => {
  const [isDelivery, setIsDelivery] = useState(true);
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'카트'} navigation={navigation} />
      <CartButton navigation={navigation} goTo={'OrderPage'} />
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <View
          style={{
            paddingHorizontal: 22,
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <Image
            source={require('~/assets/no_use_img.png')}
            style={{width: 130, height: 130, borderRadius: 10}}
          />
          <View style={{marginVertical: 10}}>
            <TextMedium style={{fontSize: 18}}>{'가게명'}</TextMedium>
          </View>
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: colors.borderColor,
              padding: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <TextBold>양념치킨+후라이드</TextBold>
              </View>
              <Image
                source={require('~/assets/pop_close.png')}
                style={{width: 20, height: 20}}
              />
            </View>
            <TextRegular>
              사이드 메뉴 추가선택 : 갈릭치즈볼 5개 추가(5,000)원
            </TextRegular>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextBold>21,500</TextBold>
              <OptionCount isTest />
            </View>
          </View>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Image
              source={require('~/assets/ico_plus.png')}
              style={{width: 20, height: 20}}
            />
            <TextBold>더 담으러 가기</TextBold>
          </Pressable>
        </View>
        <DividerL />
        <View style={{flex: 1, paddingHorizontal: 22, paddingTop: 40}}>
          <TextBold>배달/포장 선택</TextBold>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
            <Pressable
              onPress={() => setIsDelivery(true)}
              style={{
                flex: 1,
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                marginRight: 10,
                backgroundColor: isDelivery
                  ? colors.primary
                  : colors.inputBoxBG,
              }}>
              <TextBold
                style={{color: isDelivery ? 'white' : colors.fontColor2}}>
                배달
              </TextBold>
            </Pressable>
            <Pressable
              onPress={() => setIsDelivery(false)}
              style={{
                flex: 1,
                borderRadius: 7,
                backgroundColor: isDelivery
                  ? colors.inputBoxBG
                  : colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextBold
                style={{color: !isDelivery ? 'white' : colors.fontColor2}}>
                포장
              </TextBold>
            </Pressable>
          </View>
          <View style={{marginTop: 10}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextRegular>배달팁</TextRegular>
              <TextRegular>2,000원</TextRegular>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <TextRegular>추가 배달팁</TextRegular>
              <TextRegular>2,000원</TextRegular>
            </View>
            <View
              style={{height: 1, backgroundColor: colors.borderColor}}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TextBold style={{fontSize: 18}}>총 주문 금액</TextBold>
              <TextBold style={{fontSize: 18}}>20,000원</TextBold>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SummitOrder;
