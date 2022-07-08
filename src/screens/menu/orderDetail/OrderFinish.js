import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../../styles/commonStyle';
import TextBold from '../../../component/text/TextBold';
import colors from '../../../styles/colors';
import DividerL from '../../../component/DividerL';
import {replaceString} from '../../../config/utils/Price';
import TextRegular from '../../../component/text/TextRegular';
import Receipt from '../../../component/Receipt';
import TextMedium from '../../../component/text/TextMedium';

const OrderFinish = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 22,
            paddingTop: 20,
            paddingBottom: 100,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('~/assets/top_ic_map_on.png')}
              style={{width: 50, height: 50, marginBottom: 20}}
            />
            <TextBold style={{fontSize: 20, color: colors.fontColor2}}>
              주문이 완료되었습니다.
            </TextBold>
            <DividerL style={{width: '100%', marginVertical: 20}} />
          </View>
          <View style={{alignSelf: 'flex-start', paddingHorizontal: 10}}>
            <TextBold style={{fontSize: 16, color: colors.primary}}>
              양념치킨+후라이드+콜라
            </TextBold>
            <View style={{marginTop: 10}}>
              <TextBold style={{color: colors.fontColorA}}>
                {replaceString(140000)}원
              </TextBold>
            </View>
          </View>

          <Receipt />

          <Pressable
            onPress={() => {
              navigation.navigate('Main');
            }}
            style={{
              height: 50,
              backgroundColor: colors.primary,
              borderRadius: 5,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextMedium style={{color: 'white', fontSize: 17}}>
              메인화면으로 이동
            </TextMedium>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderFinish;
