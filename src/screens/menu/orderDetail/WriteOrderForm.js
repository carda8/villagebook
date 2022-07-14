import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../../styles/commonStyle';
import Header from '../../../component/Header';
import TextBold from '../../../component/text/TextBold';
import TextRegular from '../../../component/text/TextRegular';
import colors from '../../../styles/colors';
import DividerL from '../../../component/DividerL';

const WriteOrderForm = ({navigation}) => {
  const [safeNumber, setSafeNumber] = useState(false);
  const [noSpoon, setNoSpoon] = useState(false);
  const [agreement, setAgreement] = useState(false);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'주문하기'} navigation={navigation} />
      <ScrollView>
        {/* START 배달 정보, 요청 사항 */}
        <View style={{padding: 22}}>
          <View style={{flexDirection: 'row', alignItems: 'baseline', flex: 1}}>
            <TextBold style={{fontSize: 16}}>배달정보</TextBold>
            <TextRegular style={{color: '#D91313', fontSize: 13}}>
              (주소가 맞는지 꼭 확인 후 주문해 주세요)
            </TextRegular>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TextInput
              style={{...styles.inputContainer, marginRight: 10}}
              placeholder={'주소 입력'}
            />
            <Pressable
              onPress={() => {}}
              style={{
                ...styles.infoBtn,
              }}>
              <TextBold style={{fontSize: 16, color: 'white'}}>
                주소변경
              </TextBold>
            </Pressable>
          </View>

          <TextInput
            style={{...styles.inputContainer, marginVertical: 10}}
            placeholder={'상세주소 입력'}
          />

          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={{...styles.inputContainer, marginRight: 10}}
              placeholder={'휴대폰 번호(숫자만 입력)'}
            />
            <Pressable
              style={{
                ...styles.infoBtn,
              }}>
              <TextBold style={{fontSize: 16, color: 'white'}}>변경</TextBold>
            </Pressable>
          </View>

          {/* 안심번호 */}
          {/* <Pressable
            hitSlop={10}
            onPress={() => setSafeNumber(!safeNumber)}
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
            <Image
              source={
                safeNumber
                  ? require('~/assets/top_ic_map_on.png')
                  : require('~/assets/top_ic_map_off.png')
              }
              style={{width: 20, height: 20, marginRight: 10}}
            />
            <TextRegular style={{color: colors.fontColorA}}>
              안심번호로 주문
            </TextRegular>
          </Pressable> */}

          <View style={{marginTop: 40}}>
            <TextBold style={{fontSize: 16}}>요청사항</TextBold>
            <View style={{marginTop: 10}}>
              <TextBold style={{marginVertical: 5}}>가게 사장님에게</TextBold>
              <TextInput
                placeholder="예) 오이 뺴주세요"
                style={{...styles.inputContainer, backgroundColor: 'white'}}
              />
            </View>
            <View style={{}}>
              <TextBold style={{marginVertical: 5}}>배달 기사님에게</TextBold>
              <TextInput
                placeholder="예) 조심히 와주세요"
                style={{...styles.inputContainer, backgroundColor: 'white'}}
              />
            </View>
            <Pressable
              hitSlop={10}
              onPress={() => setNoSpoon(!noSpoon)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                source={
                  noSpoon
                    ? require('~/assets/top_ic_map_on.png')
                    : require('~/assets/top_ic_map_off.png')
                }
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <TextRegular style={{color: 'forestgreen'}}>
                  일회용 수저, 포크 안주셔도 돼요
                </TextRegular>
                <TextRegular style={{color: 'forestgreen'}}>
                  (환경보호를 위해 필요 없을 시 꼭 체크 부탁드려요)
                </TextRegular>
              </View>
            </Pressable>
          </View>
        </View>
        {/* END 배달 정보, 요청 사항 */}

        <DividerL />
        {/* START 결제 방법 */}
        <View style={{padding: 22}}>
          <TextBold style={{fontSize: 16}}>결제방법</TextBold>
          <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              onPress={() => navigation.navigate('PaymentMethod')}
              style={{
                flex: 1,
                height: 50,
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 10,
                borderColor: colors.primary,
                paddingHorizontal: 12,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TextRegular style={{color: colors.fontColorA2}}>
                신용카드
              </TextRegular>
              <Pressable
                onPress={() => navigation.navigate('PaymentMethod')}
                style={{
                  width: 50,
                  height: 26,
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                }}>
                <TextRegular style={{color: 'white'}}>변경</TextRegular>
              </Pressable>
            </Pressable>
          </Pressable>
          {/* 포인트 사용 */}
          <View style={{marginTop: 20}}>
            <TextBold style={{fontSize: 16}}>포인트 사용</TextBold>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Pressable
                onPress={() => {}}
                style={{
                  ...styles.infoBtn,
                }}>
                <TextBold style={{fontSize: 16, color: 'white'}}>
                  모두사용
                </TextBold>
              </Pressable>
              <TextInput
                keyboardType="numeric"
                style={{...styles.inputContainer, marginLeft: 10}}
                placeholder={'500포인트 부터 사용 가능'}
              />
            </View>
          </View>
          {/* 쿠폰 사용 */}
          <View style={{marginTop: 20}}>
            <TextBold style={{fontSize: 16}}>쿠폰 사용</TextBold>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Pressable
                onPress={() =>
                  navigation.navigate('PaymentMethod', {useCoupon: true})
                }
                style={{
                  ...styles.infoBtn,
                }}>
                <TextBold style={{fontSize: 16, color: 'white'}}>
                  쿠폰선택
                </TextBold>
              </Pressable>
              <TextInput
                editable={false}
                style={{...styles.inputContainer, marginLeft: 10}}
              />
            </View>
          </View>
        </View>
        {/* END 결제방법 */}
        <DividerL />
        {/* START 결제금액 */}
        <View style={{padding: 22}}>
          <TextBold style={{fontSize: 16}}>결제금액</TextBold>
          <View style={{marginTop: 15}}>
            <View style={{...styles.paymentText}}>
              <TextRegular style={{color: colors.fontColorA}}>
                주문금액
              </TextRegular>
              <TextRegular style={{}}>{'33,000'}원</TextRegular>
            </View>

            <View style={{...styles.paymentText}}>
              <TextRegular style={{color: colors.fontColorA}}>
                배달팁
              </TextRegular>
              <TextRegular style={{}}>{'3,000'}원</TextRegular>
            </View>

            <View style={{...styles.paymentText}}>
              <TextRegular style={{color: colors.fontColorA}}>
                추가배달팁
              </TextRegular>
              <TextRegular style={{}}>{'0'}원</TextRegular>
            </View>

            <View style={{...styles.paymentText}}>
              <TextRegular style={{color: colors.fontColorA}}>
                할인금액
              </TextRegular>
              <TextRegular style={{}}>-{'0'}원</TextRegular>
            </View>

            <View style={{...styles.paymentText, marginBottom: 20}}>
              <TextRegular style={{color: colors.fontColorA}}>
                포인트 사용
              </TextRegular>
              <TextRegular style={{}}>-{'0'}원</TextRegular>
            </View>
          </View>
          <View style={{height: 1, backgroundColor: colors.borderColor}} />

          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextBold style={{fontSize: 16}}>총 결제금액</TextBold>
            <TextBold style={{fontSize: 16}}>{'36,000'}</TextBold>
          </View>

          <Pressable
            hitSlop={10}
            onPress={() => setAgreement(!agreement)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={
                agreement
                  ? require('~/assets/top_ic_map_on.png')
                  : require('~/assets/top_ic_map_off.png')
              }
              style={{width: 20, height: 20, marginRight: 10}}
            />
            <View style={{flex: 1}}>
              <TextRegular style={{color: 'forestgreen'}}>
                위 내용을 확인하였으며 결제에 동의합니다.
              </TextRegular>
            </View>
          </Pressable>
          {/* 결제하기 버튼 */}
          <Pressable
            onPress={() => {
              navigation.navigate('OrderFinish');
            }}
            style={{
              height: 60,
              backgroundColor: colors.primary,
              borderRadius: 5,
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextBold style={{fontSize: 18, color: 'white'}}>
              {'36,000'}원 결제하기
            </TextBold>
          </Pressable>
          {/* END 결제금액 */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WriteOrderForm;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    backgroundColor: colors.inputBoxBG,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  infoBtn: {
    width: 100,
    borderRadius: 5,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentText: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
