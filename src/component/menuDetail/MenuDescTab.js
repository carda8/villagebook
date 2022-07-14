import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../styles/colors';
import TextRegular from '../text/TextRegular';
import TextNotoM from '../text/TextNotoM';
import {replaceString} from '../../config/utils/Price';

const MenuDescTab = ({info}) => {
  const [tabIdx, setTabIdx] = useState(0);

  useEffect(() => {
    console.log('idx', tabIdx);
  }, [tabIdx]);

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
                12,000
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
