import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomBar from '../../component/BottomBar';
import Divider from '../../component/Divider';
import Header from '../../component/Header';
import MainBanner from '../../component/MainBanner';
import SearchBox from '../../component/mainScreen/SearchBox';
import TextBold from '../../component/text/TextBold';
import TextEBold from '../../component/text/TextEBold';
import TextJua from '../../component/text/TextJua';
import TextRegular from '../../component/text/TextRegular';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyle';
import {useSelector} from 'react-redux';
import Loading from '../../component/Loading';

const Main = ({navigation}) => {
  const {userInfo} = useSelector(state => state.authReducer);

  if (!userInfo) return <Loading />;
  console.log('::: USER INFO', userInfo);
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header
        title={''}
        navigation={navigation}
        showLogo={true}
        showNoti={true}
        showCart={true}
      />
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 22, paddingBottom: 70}}>
        <Pressable
          onPress={() => {
            navigation.navigate('Map');
          }}
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            marginBottom: 10,
          }}>
          <Image
            source={require('~/assets/ico_location.png')}
            style={{width: 19, height: 19, marginRight: 8}}
          />
          <TextEBold style={{fontSize: 15}}>주소 검색</TextEBold>
        </Pressable>

        <SearchBox />

        {/* 동네맛집 */}
        {/* 동네마켓 */}
        <View
          style={{
            height: 220,
            marginTop: 17,
            marginBottom: 15,
            flexDirection: 'row',
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('CategoryView', {selectedCategory: 'food'});
            }}
            style={{
              flex: 1,
              borderRadius: 25,
              marginRight: 16,
              paddingTop: 34,
              paddingLeft: 27,
              borderWidth: 1,
              backgroundColor: colors.mainBG1,
              borderColor: colors.mainBG1Border,
            }}>
            <TextJua style={{fontSize: 23, color: colors.fontMain1}}>
              동네맛집
            </TextJua>
            <View style={{marginTop: 8}}>
              <TextRegular>우리동네 맛집 {'\n'}다있다!</TextRegular>
            </View>
            <Image
              source={require('~/assets/main_ico01.png')}
              style={{
                flex: 1,
                width: 120,
                alignSelf: 'flex-end',
              }}
              resizeMode="contain"
            />
          </Pressable>

          {/* 동네마켓 */}
          <Pressable
            onPress={() => {
              navigation.navigate('CategoryView', {selectedCategory: 'market'});
            }}
            style={{
              flex: 1,
              borderRadius: 25,
              paddingTop: 34,
              paddingLeft: 27,
              backgroundColor: colors.mainBG2,
              borderColor: colors.mainBG2Border,
              borderWidth: 1,
            }}>
            <TextJua style={{fontSize: 23, color: colors.fontMain2}}>
              동네마켓
            </TextJua>
            <View style={{marginTop: 8}}>
              <TextRegular>우리동네 필요한{'\n'}물건은 마켓으로!</TextRegular>
            </View>
            <Image
              source={require('~/assets/main_ico02.png')}
              style={{
                flex: 1,
                width: 120,
                alignSelf: 'flex-end',
              }}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        {/* 동네편의 */}
        <View
          style={{
            flex: 1,
            height: 141,
            marginBottom: 15,
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('CategoryView', {
                selectedCategory: 'convenience',
              });
            }}
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingLeft: 27,
              borderWidth: 1,
              backgroundColor: colors.mainBG3,
              borderColor: colors.mainBG3Border,
              borderRadius: 25,
              overflow: 'hidden',
            }}>
            <View style={{paddingTop: 39}}>
              <TextJua style={{fontSize: 23, color: colors.fontMain3}}>
                동네편의
              </TextJua>
              <View style={{marginTop: 8}}>
                <TextRegular>
                  우리동네 뫃든 시설, {'\n'}정보 검색은 한번에
                </TextRegular>
              </View>
            </View>
            <Image
              source={require('~/assets/main_ico03.png')}
              style={{
                width: 150,
                height: 139,
              }}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        {/* 메인배너 */}
        <MainBanner navigation={navigation} style={{marginBottom: 60}} />

        {/* 약관 */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable onPress={() => {}}>
            <TextRegular style={{color: colors.fontColor8}}>
              이용약관
            </TextRegular>
          </Pressable>
          <Divider style={{marginHorizontal: 10}} />
          <Pressable onPress={() => {}}>
            <TextRegular style={{color: colors.fontColor8}}>
              전자금융거래 이용약관
            </TextRegular>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 15,
          }}>
          <Pressable onPress={() => {}}>
            <TextRegular style={{color: colors.fontColor8}}>
              위치기반 서비스 이용약관
            </TextRegular>
          </Pressable>
          <Divider style={{marginHorizontal: 10}} />
          <Pressable onPress={() => {}}>
            <TextBold style={{color: colors.fontColor8}}>
              개인정보 처리방침
            </TextBold>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}>
          <TextRegular style={{color: colors.fontColor8}}>
            오늘의 주문은 통신판매 중개자로서 통신판매의 당사자가 아닙니다.
            따라서 오늘의 주문은 상품거래정보 및 거래에 대한 책임을 지지
            않습니다.
          </TextRegular>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextRegular style={{color: colors.fontColor8}}>
            서울특별시 강남구 영동대로 1234 대표이사 : 홍길동 | 사업자등록번호 :
            123-12-123456 통신판매업신고 : 제 2022-서울강남-12345호
          </TextRegular>
        </View>
      </ScrollView>
      <BottomBar navigation={navigation} />
      {/* <BottomNavigator /> */}
    </SafeAreaView>
  );
};

export default Main;
