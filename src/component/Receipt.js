import {View, Text} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import TextBold from './text/TextBold';
import TextRegular from './text/TextRegular';
import DividerL from './DividerL';

const Receipt = () => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 24,
        marginVertical: 16,
      }}>
      <TextBold style={{fontSize: 18, color: colors.fontColor2}}>
        결제금액
      </TextBold>
      <View style={{marginTop: 20}}>
        <View
          style={{
            marginBottom: 11,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextRegular style={{color: colors.fontColor99}}>
            총 주문금액
          </TextRegular>
          <TextRegular style={{color: colors.fontColor3}}>3,000원</TextRegular>
        </View>

        <View
          style={{
            marginBottom: 11,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextRegular style={{color: colors.fontColor99}}>배달팁</TextRegular>
          <TextRegular style={{color: colors.fontColor3}}>3,000원</TextRegular>
        </View>

        <View
          style={{
            marginBottom: 11,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextRegular style={{color: colors.fontColor99}}>
            추가배달팁
          </TextRegular>
          <TextRegular style={{color: colors.fontColor3}}>3,000원</TextRegular>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextRegular style={{color: colors.fontColor99}}>
            할인 금액
          </TextRegular>
          <TextRegular style={{color: colors.primary}}>- 3,000원</TextRegular>
        </View>

        <DividerL style={{height: 1, marginVertical: 20}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextBold style={{fontSize: 18, color: colors.fontColor2}}>
            총 결제금액
          </TextBold>

          <TextBold style={{fontSize: 18, color: colors.fontColor2}}>
            {'10,900'}원
          </TextBold>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <TextRegular style={{color: colors.fontColor99}}>
            {'결제방법'}
          </TextRegular>
          <TextRegular style={{color: colors.primary}}>
            {'만나서 카드결제'}
          </TextRegular>
        </View>
      </View>
    </View>
  );
};

export default Receipt;
