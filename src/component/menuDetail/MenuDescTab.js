import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Platform,
  useWindowDimensions,
  ToastAndroid,
} from 'react-native';
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
import {useDispatch} from 'react-redux';
import {
  setDeliveryInfo,
  setIsDelivery,
} from '../../store/reducers/DeliveryInfoReducer';
import MiniMap from '../../screens/map/MiniMap';
import Clipboard from '@react-native-clipboard/clipboard';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {setIsDeliveryStore} from '../../store/reducers/PaymentReducer';

const MenuDescTab = ({info, navigation, routeData}) => {
  const dispatch = useDispatch();
  const [tabIdx, setTabIdx] = useState(0);
  const {mutateGetDeliveryFeeInfo} = useCustomMutation();
  const layout = useWindowDimensions();

  const _copyAdd = async () => {
    Clipboard.setString(info.mb_addr1 + ' ' + info.mb_addr2);
    customAlert('알림', '주소가 복사되었습니다.');
    // ToastAndroid.show('주소가 복사되었습니다.', ToastAndroid.SHORT);
  };

  const _getFee = () => {
    const data = {
      jumju_id: info.mb_id,
      jumju_code: info.mb_jumju_code,
    };

    mutateGetDeliveryFeeInfo.mutate(data, {
      onSettled: e => {
        if (e.result === 'true' && e.data.arrItems.length > 0)
          dispatch(setDeliveryInfo(e.data.arrItems));
        console.log('e', e);
      },
    });
  };

  useEffect(() => {
    _getFee();
  }, []);

  console.log('@@@@@ info', routeData);

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
            dispatch(setIsDelivery(false));
            dispatch(setIsDeliveryStore(false));
          }}>
          <View
            style={{
              width: 70,
              height: '100%',
              paddingBottom: 9,
              alignItems: 'center',
              justifyContent: 'flex-end',
              borderBottomWidth: tabIdx === 0 ? 2 : 0,
              borderBottomColor: colors.borderColor22,
            }}>
            <Text
              style={{
                color: tabIdx === 0 ? colors.fontColor2 : colors.fontColorA2,
              }}>
              먹고가기
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
            dispatch(setIsDelivery(true));
            dispatch(setIsDeliveryStore(true));
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
              배달하기
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
            setTabIdx(2);
            dispatch(setIsDelivery(false));
            dispatch(setIsDeliveryStore(false));
          }}>
          <View
            style={{
              width: 70,
              height: '100%',
              paddingBottom: 9,
              alignItems: 'center',
              justifyContent: 'flex-end',
              borderBottomWidth: tabIdx === 2 ? 2 : 0,
              borderBottomColor: colors.borderColor22,
            }}>
            <Text
              style={{
                color: tabIdx === 2 ? colors.fontColor2 : colors.fontColorA2,
              }}>
              포장하기
            </Text>
          </View>
        </Pressable>
      </View>
      <View
        style={{
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
        {tabIdx === 2 && (
          <>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <View style={{width: 100}}>
                  <TextRegular style={{color: colors.fontColor99}}>
                    최소주문금액
                  </TextRegular>
                </View>
                <TextRegular style={{...styles.subTitleTakeout}}>
                  {replaceString(info.minPriceWrap)}
                </TextRegular>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <View style={{width: 100}}>
                  <TextRegular style={{color: colors.fontColor99}}>
                    이용방법
                  </TextRegular>
                </View>
                <TextRegular style={{...styles.subTitleTakeout}}>
                  포장
                </TextRegular>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <View style={{width: 100}}>
                  <TextRegular style={{color: colors.fontColor99}}>
                    {routeData.category === 'food' ? '조리시간' : '포장시간'}
                  </TextRegular>
                </View>
                <TextRegular style={{...styles.subTitleTakeout}}>
                  30~40분 소요 예상
                </TextRegular>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <View style={{width: 100}}>
                  <TextRegular style={{color: colors.fontColor99}}>
                    결제방법
                  </TextRegular>
                </View>
                <TextRegular style={{...styles.subTitleTakeout}}>
                  선결제
                </TextRegular>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 10, flex: 1}}>
                <View style={{width: 100}}>
                  <TextRegular style={{color: colors.fontColor99}}>
                    위치안내
                  </TextRegular>
                </View>
                <View style={{flex: 1}}>
                  <TextRegular style={{...styles.subTitleTakeout}}>
                    {info.mb_addr1 + ' ' + info.mb_addr2}
                  </TextRegular>
                </View>
              </View>
            </View>
          </>
        )}
      </View>

      {tabIdx === 1 && (
        <View
          style={{
            alignSelf: 'flex-end',
            marginRight: 22,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.borderColor,
            overflow: 'hidden',
          }}>
          <MiniMap
            lat={info.mb_lat}
            lng={info.mb_lng}
            isStore
            width={layout.width - 144}
            height={130}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: layout.width - 144,
              height: 35,
              backgroundColor: 'white',
              flexDirection: 'row',
              flex: 1,
            }}>
            <Pressable
              onPress={() => _copyAdd()}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRightWidth: 1,
                borderColor: colors.borderColor,
              }}>
              <TextRegular style={{color: colors.fontColor2, fontSize: 12}}>
                주소복사
              </TextRegular>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('Map', {
                  isStore: true,
                  lat: info.mb_lat,
                  lng: info.mb_lng,
                })
              }
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TextRegular style={{color: colors.fontColor2, fontSize: 12}}>
                지도보기
              </TextRegular>
            </Pressable>
          </View>
        </View>
      )}
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
