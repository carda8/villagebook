import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import TextMedium from '../../component/text/TextMedium';
import TextNotoM from '../../component/text/TextNotoM';
import TextRegular from '../../component/text/TextRegular';
import colors from '../../styles/colors';
import {Modal} from 'react-native';
import TextBold from '../../component/text/TextBold';
import dayjs from 'dayjs';

const CouponTicket = ({data}) => {
  // const [modal, setModal] = useState({visible: false, data: ''});
  const itemInfo = data.item;
  const _calcDate = () => {
    const date1 = dayjs().format('YYYY-MM-DD');
    const date2 = itemInfo.cp_end;

    const diffDate = dayjs(date2).diff(date1, 'days');
    return diffDate;
  };

  const _convertCpType = () => {
    // 0 : 모두 사용 가능
    // 1 : 포장용 쿠폰
    // 2 : 배달용 쿠폰

    const type = itemInfo.cp_type;
    switch (type) {
      case '0':
        return {
          type: '배달/포장',
          color: colors.primary,
          fontColor: 'white',
        };
      case '1':
        return {
          type: '포장용',
          color: colors.mainBG1,
          fontColor: colors.fontMain1,
        };
      case '2':
        return {
          type: '배달용',
          color: colors.mainBG2,
          fontColor: colors.fontMain2,
        };
      default:
        return type;
    }
  };
  return (
    <View
      style={{
        height: 140,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.borderColor,
        marginBottom: 10,
        marginHorizontal: 22,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
      <View style={{flex: 3, paddingLeft: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <TextBold style={{fontSize: 22, color: colors.primary}}>
              {/* 0: 고정금액 할인 , 1: 퍼센트 할인 */}
              {itemInfo.cp_price_type === '0'
                ? itemInfo.cp_price + '원'
                : itemInfo.cp_price + '%'}
            </TextBold>
            <TextMedium style={{color: colors.fontColor2}}>
              {itemInfo.cp_subject}
            </TextMedium>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              height: 24,
              borderRadius: 12,
              backgroundColor: _convertCpType().color,
              marginLeft: 7,
              marginRight: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* 0 : 모두 사용 가능
                1 : 포장용 쿠폰
                2 : 배달용 쿠폰 */}
            <TextNotoM
              style={{fontSize: 12, color: _convertCpType().fontColor}}>
              {_convertCpType().type}
            </TextNotoM>
          </View>
        </View>
        <View style={{marginTop: 8}}>
          <TextRegular>
            {itemInfo.cp_start} ~ {itemInfo.cp_end}
          </TextRegular>
          <TextRegular>
            {itemInfo.cp_mb_company ? itemInfo.cp_mb_company : '동네북 쿠폰'} (
            {itemInfo.cp_method_txt})
          </TextRegular>
        </View>
      </View>
      <Pressable
        // onPress={() => setModal({data: itemInfo, visible: !modal.visible})}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          borderLeftWidth: 1,
          borderColor: colors.borderColor,
          backgroundColor: colors.couponBG,
        }}>
        <TextNotoM style={{color: colors.fontMain3, fontSize: 12}}>
          남은기한
        </TextNotoM>
        <TextNotoM style={{color: colors.fontMain3, fontSize: 20}}>
          {_calcDate()}일
        </TextNotoM>
      </Pressable>

      {/* <Modal
        visible={modal.visible}
        useNativeDriver={true}
        transparent
        onRequestClose={() => {
          setModal({...modal, visible: !modal.visible});
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: 'white',
              ...Platform.select({
                ios: {
                  shadowColor: '#00000029',
                  shadowOpacity: 0.6,
                  shadowRadius: 50 / 2,
                  shadowOffset: {
                    height: 12,
                    width: 0,
                  },
                },
                android: {
                  elevation: 5,
                },
              }),
            }}>
            <View style={{flex: 1, padding: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextBold>쿠폰명 : </TextBold>
                <TextRegular>{modal.data.cp_subject}</TextRegular>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextBold>할인적용방법 : </TextBold>
                <TextRegular>{modal.data.cp_method_txt}</TextRegular>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextBold>할인적용방법 : </TextBold>
                <TextRegular>{modal.data.cp_method_txt}</TextRegular>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <TextBold>사용기한 : </TextBold>
                <TextRegular>
                  {modal.data.cp_start} ~ {modal.data.cp_end}
                </TextRegular>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextBold>할인적용방법 : </TextBold>
                <TextRegular>{modal.data.cp_method_txt}</TextRegular>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextBold>할인적용방법 : </TextBold>
                <TextRegular>{modal.data.cp_method_txt}</TextRegular>
              </View>
            </View>
            <Pressable
              style={{
                backgroundColor: colors.primary,
                alignSelf: 'center',
                width: 120,
                height: 50,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => setModal({...modal, visible: !modal.visible})}>
              <TextBold style={{color: 'white'}}>닫기</TextBold>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default CouponTicket;
