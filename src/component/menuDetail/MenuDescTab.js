import {View, Text, Pressable, StyleSheet, Modal, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../styles/colors';
import TextRegular from '../text/TextRegular';
import TextNotoM from '../text/TextNotoM';
import {replaceString} from '../../config/utils/Price';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {customAlert} from '../CustomAlert';
import TextSBold from '../text/TextSBold';
import DividerL from '../DividerL';
import TextBold from '../text/TextBold';

const MenuDescTab = ({info, navigation}) => {
  const [tabIdx, setTabIdx] = useState(0);
  const {mutateGetDeliveryFeeInfo} = useCustomMutation();
  const [modal, setModal] = useState(false);
  const [fee, setFee] = useState([]);

  const _getFeeInfo = () => {
    const data = {
      jumju_id: info.mb_id,
      jumju_code: info.mb_jumju_code,
    };
    mutateGetDeliveryFeeInfo.mutate(data, {
      onSettled: e => {
        if (e.result === 'true' && e.data.arrItems.length > 0) {
          setFee(e.data.arrItems);
          // return customAlert('알림', '현재 사용 할 수 없는 기능입니다.');
          setModal(!modal);
          // navigation.navigate('DeliveryTipDetail', {data: e.data.arrItems});
        } else {
          return customAlert('알림', '현재 사용 할 수 없는 기능입니다.');
        }
        console.log('e', e);
      },
    });
  };

  // useEffect(() => {
  //   console.log('idx', tabIdx);
  // }, [tabIdx]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: colors.borderColor,
          height: 40,
          marginTop: 13,
        }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setTabIdx(0);
          }}>
          <View
            style={{
              borderBottomWidth: tabIdx === 0 ? 2 : 0,
              borderBottomColor: colors.borderColor22,
              width: 70,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 9,
            }}>
            <Text
              style={{
                color: tabIdx === 0 ? colors.fontColor2 : colors.fontColorA2,
              }}>
              배달주문
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setTabIdx(1);
          }}>
          <View
            style={{
              borderBottomWidth: tabIdx === 1 ? 2 : 0,
              borderBottomColor: colors.borderColor22,

              width: 70,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 9,
            }}>
            <Text
              style={{
                color: tabIdx === 1 ? colors.fontColor2 : colors.fontColorA2,
              }}>
              포장주문
            </Text>
          </View>
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 22,
          paddingTop: 20,
          flexDirection: 'row',
        }}>
        {tabIdx === 0 && (
          <>
            <View style={{justifyContent: 'space-between'}}>
              <TextRegular style={{color: colors.fontColor99}}>
                최소주문금액
              </TextRegular>
              <TextRegular
                style={{color: colors.fontColor99, marginVertical: 11}}>
                배달시간
              </TextRegular>
              <TextRegular style={{color: colors.fontColor99}}>
                배달팁
              </TextRegular>
            </View>

            <View style={{marginLeft: 22, justifyContent: 'space-between'}}>
              <TextRegular style={{color: colors.fontColor3}}>
                {replaceString(info.minPrice)}
              </TextRegular>
              <TextRegular style={{color: colors.fontColor3}}>
                30분~60분 소요 예상
              </TextRegular>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextRegular style={{color: colors.fontColor3}}>
                  {replaceString(info.tipFrom)}원~{replaceString(info.tipTo)}원
                </TextRegular>
                <Pressable
                  onPress={() => {
                    navigation.navigate('DeliveryTipInfo', {data: info});
                    // _getFeeInfo();
                  }}
                  style={{
                    width: 52,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: colors.dividerL,
                    marginLeft: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextNotoM style={{fontSize: 12, color: colors.fontColor2}}>
                    자세히
                  </TextNotoM>
                </Pressable>
              </View>
            </View>
          </>
        )}
        {tabIdx === 1 && (
          <>
            <View style={{justifyContent: 'space-between'}}>
              <TextRegular style={{color: colors.fontColor99}}>
                최소주문금액
              </TextRegular>
              <TextRegular style={{...styles.titleTakout}}>
                이용방법
              </TextRegular>
              <TextRegular style={{color: colors.fontColor99}}>
                조리시간
              </TextRegular>
              <TextRegular style={{...styles.titleTakout}}>
                결제방법
              </TextRegular>
              <TextRegular style={{color: colors.fontColor99}}>
                위치안내
              </TextRegular>
            </View>

            <View style={{marginLeft: 22, justifyContent: 'space-between'}}>
              <TextRegular style={{...styles.subTitleTakeout}}>
                {info.minPriceWrap}
              </TextRegular>
              <TextRegular style={{...styles.subTitleTakeout}}>
                포장
              </TextRegular>
              <TextRegular style={{...styles.subTitleTakeout}}>
                30~40분 소요 예상
              </TextRegular>
              <TextRegular style={{...styles.subTitleTakeout}}>
                선결제
              </TextRegular>
              <TextRegular style={{...styles.subTitleTakeout}}>
                위치안내
              </TextRegular>
            </View>
          </>
        )}
      </View>
      <Modal
        transparent
        visible={modal}
        onRequestClose={() => setModal(!modal)}>
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
              padding: 15,
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
            <TextSBold style={{color: colors.fontColor2}}>
              배달팁 정보
            </TextSBold>
            <DividerL style={{height: 1, marginVertical: 10}} />
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <View style={{flex: 2}}>
                  <TextSBold style={{color: colors.fontColor2}}>
                    주문 금액
                  </TextSBold>
                </View>
                <View style={{flex: 1}}>
                  <TextSBold style={{color: colors.fontColor2}}>
                    배달팁
                  </TextSBold>
                </View>
              </View>
              {fee.map((item, index) => (
                <View key={index} style={{flexDirection: 'row'}}>
                  <View style={{flex: 2}}>
                    <TextRegular style={{color: colors.fontColor2}}>
                      {replaceString(item.dd_charge_start)}원 ~{' '}
                      {replaceString(item.dd_charge_end)}원
                    </TextRegular>
                  </View>
                  <View style={{flex: 1}}>
                    <TextRegular style={{color: colors.fontColor2}}>
                      {replaceString(item.dd_charge_price)}원
                    </TextRegular>
                  </View>
                </View>
              ))}
            </View>
            <Pressable
              style={{
                backgroundColor: colors.primary,
                alignSelf: 'center',
                width: 120,
                height: 50,
                marginTop: 'auto',
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => {
                setModal(!modal);
              }}>
              <TextBold style={{color: 'white'}}>닫기</TextBold>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default React.memo(MenuDescTab);

const styles = StyleSheet.create({
  titleTakout: {
    color: colors.fontColor99,
    marginVertical: 11,
  },
  subTitleTakeout: {
    color: colors.fontColor3,
  },
});
