import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../../styles/commonStyle';
import Header from '../../../component/Header';
import colors from '../../../styles/colors';
import TextMedium from '../../../component/text/TextMedium';
import TextRegular from '../../../component/text/TextRegular';
import TextNotoM from '../../../component/text/TextNotoM';
import TextBold from '../../../component/text/TextBold';
import DividerL from '../../../component/DividerL';
import Receipt from '../../../component/Receipt';

const OrderSumary = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'주문 상세'} navigation={navigation} />
      <ScrollView>
        <View
          style={{
            backgroundColor: colors.inputBoxBG,
            paddingHorizontal: 22,
            paddingVertical: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('~/assets/no_use_img.png')}
              style={{width: 60, height: 60, borderRadius: 10}}
            />
            <View
              style={{flex: 1, marginLeft: 10, justifyContent: 'space-evenly'}}>
              <TextMedium style={{color: colors.fontColor2}}>
                설빙 부산대역점
              </TextMedium>
              <TextRegular style={{color: colors.fontColor6}}>
                자스민 아메리카노(R) 외 1개 6,000원
              </TextRegular>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <View
              style={{
                flex: 1,
                height: 45,
                marginRight: 5,
                borderRadius: 5,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextNotoM style={{color: 'white'}}>가게 전화</TextNotoM>
            </View>
            <View
              style={{
                flex: 1,
                height: 45,
                borderRadius: 5,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: colors.borderColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextNotoM style={{color: colors.fontColorA}}>
                가게 전화
              </TextNotoM>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 22, paddingTop: 19}}>
          <TextMedium style={{fontSize: 17, color: colors.fontColor2}}>
            [살얼음가득] 물밀면 (강력추천)
          </TextMedium>
          <View style={{marginVertical: 10}}>
            <TextRegular style={{color: colors.fontColor99}}>
              - 양선택 : 보통(7,000원)
            </TextRegular>
            <TextRegular style={{color: colors.fontColor99}}>
              - 추가선택(최대8개) : 통등심돈까스(100g)(700원)
            </TextRegular>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <TextBold style={{fontSize: 17, color: colors.fontColor2}}>
              7,700원
            </TextBold>
          </View>
        </View>

        <DividerL style={{height: 1, marginVertical: 10}} />

        <View style={{paddingHorizontal: 22, paddingTop: 10}}>
          <TextMedium style={{fontSize: 17, color: colors.fontColor2}}>
            핫치킨MVP토스트 2개
          </TextMedium>
          <View style={{marginVertical: 10}}>
            <TextRegular style={{color: colors.fontColor99}}>
              핫치킨MVP토스트 2개
            </TextRegular>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <TextBold style={{fontSize: 17, color: colors.fontColor2}}>
              7,200원
            </TextBold>
          </View>
        </View>

        <Receipt />

        <View style={{paddingHorizontal: 22}}>
          <View style={{marginBottom: 13, flexDirection: 'row', flex: 1}}>
            <View style={{width: 120}}>
              <TextRegular
                style={{
                  color: colors.fontColor99,
                  marginBottom: 13,
                }}>
                배달주소
              </TextRegular>
            </View>
            <View style={{flex: 1}}>
              <TextRegular
                style={{
                  color: colors.fontColor99,
                  marginBottom: 13,
                  color: colors.fontColor3,
                }}>
                부산 금정구 구서동 445-21 5층 (도로명) 부산 금정구 금정로 225
                5층
              </TextRegular>
            </View>
          </View>

          <View style={{marginBottom: 13, flexDirection: 'row', flex: 1}}>
            <View style={{width: 120}}>
              <TextRegular
                style={{
                  color: colors.fontColor99,
                  marginBottom: 13,
                }}>
                전화번호
              </TextRegular>
            </View>
            <View style={{flex: 1}}>
              <TextRegular
                style={{
                  color: colors.fontColor99,
                  marginBottom: 13,
                  color: colors.fontColor3,
                }}>
                010-1234-5678
              </TextRegular>
            </View>
          </View>

          <View style={{marginBottom: 13, flexDirection: 'row', flex: 1}}>
            <View style={{width: 120}}>
              <TextRegular
                style={{
                  color: colors.fontColor99,
                  marginBottom: 13,
                }}>
                가게 사장님에게
              </TextRegular>
            </View>
            <View style={{flex: 1}}>
              <TextRegular
                style={{
                  color: colors.fontColor99,
                  marginBottom: 13,
                  color: colors.fontColor3,
                }}>
                오이 빼주세요.
              </TextRegular>
            </View>
          </View>

          <View style={{marginBottom: 13, flexDirection: 'row', flex: 1}}>
            <View style={{width: 120}}>
              <TextRegular
                style={{
                  color: colors.fontColor99,
                  marginBottom: 13,
                }}>
                배달 기사님에게
              </TextRegular>
            </View>
            <View style={{flex: 1}}>
              <TextRegular
                style={{
                  color: colors.fontColor99,
                  marginBottom: 13,
                  color: colors.fontColor3,
                }}>
                12시 30분까지 와주세요.
              </TextRegular>
            </View>
          </View>
          {/* 
          <Pressable
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
          </Pressable> */}

          <Pressable
            style={{
              height: 50,
              backgroundColor: colors.primary,
              borderRadius: 5,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextMedium style={{color: 'white', fontSize: 17}}>
              주문내역 삭제
            </TextMedium>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSumary;
