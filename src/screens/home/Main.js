import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
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
import policyConfig from '../signIn/policyConfig';
import {_showAddr} from '../../config/utils/modules';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useFocusEffect} from '@react-navigation/native';
import BannerList from '../../config/BannerList';

const Main = ({navigation}) => {
  const {userInfo} = useSelector(state => state.authReducer);
  const {postData} = useSelector(state => state.addressReducer);
  const {mutateGetAddress, mutateGetCompanyInfo} = useCustomMutation();
  const [companyInfo, setCompanyInfo] = useState();

  const _getAddr = () => {
    const data = {
      mt_id: userInfo.mt_id,
    };

    mutateGetAddress.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true') {
        }
        console.log('e', e);
      },
    });
  };

  const _getCompanyInfo = () => {
    const data = {};
    mutateGetCompanyInfo.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true') setCompanyInfo(e.data.arrItems);
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      _getAddr();
      return () => {};
    }, []),
  );

  useEffect(() => {
    _getCompanyInfo();
  }, []);

  // if (!userInfo) return <Loading />;

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
            navigation.navigate('AddressMain');
          }}
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            marginBottom: 10,
          }}>
          <Image
            source={require('~/assets/ico_location.png')}
            style={{width: 19, height: 19}}
          />
          <TextEBold
            numberOfLines={1}
            style={{
              fontSize: 15,
              marginHorizontal: 10,
              color: colors.fontColor2,
            }}>
            {(mutateGetAddress?.data?.data?.arrItems[0]?.ad_addr1 ??
              '주소설정') +
              ' ' +
              (mutateGetAddress?.data?.data?.arrItems[0]?.ad_addr2 ?? ' ') +
              ' '}
            {!mutateGetAddress?.data ?? '주소설정'}
            {/* {_showAddr(userInfo, '주소설정')} */}
            {/* {postData.addrMain
              ? postData.addrMain + ' ' + postData.addrSub
              : '주소 설정'} */}
          </TextEBold>
        </Pressable>

        {/* <SearchBox /> */}

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
                selectedCategory: 'lifestyle',
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
                  우리동네 모든 시설, {'\n'}정보 검색은 한번에
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
        <MainBanner
          navigation={navigation}
          style={{marginBottom: 60}}
          position={BannerList.main}
        />

        {/* 약관 */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('Policy', {
                target: policyConfig.target.location,
              });
            }}>
            <TextRegular style={{color: colors.fontColor8}}>
              위치기반 서비스 이용약관
            </TextRegular>
          </Pressable>
          <Divider style={{marginHorizontal: 10}} />
          <Pressable
            onPress={() => {
              navigation.navigate('Policy', {
                target: policyConfig.target.personal,
              });
            }}>
            <TextBold style={{color: colors.fontColor8}}>
              개인정보 처리방침
            </TextBold>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable
            onPress={() => {
              navigation.navigate('Policy', {target: policyConfig.target.use});
            }}>
            <TextRegular style={{color: colors.fontColor8}}>
              이용약관
            </TextRegular>
          </Pressable>
          {/* <Divider style={{marginHorizontal: 10}} />
          <Pressable onPress={() => {}}>
            <TextRegular style={{color: colors.fontColor8}}>
              전자금융거래 이용약관
            </TextRegular>
          </Pressable> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}>
          <TextRegular style={{color: colors.fontColor8}}>
            {companyInfo?.de_admin_company_memo}
          </TextRegular>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextRegular style={{color: colors.fontColor8}}>
            {companyInfo?.de_admin_company_addr} 대표이사 :{' '}
            {companyInfo?.de_admin_company_owner} | 사업자등록번호 :
            {companyInfo?.de_admin_company_saupja_no} 통신판매업신고 :{' '}
            {companyInfo?.de_admin_tongsin_no}
          </TextRegular>
        </View>
      </ScrollView>
      <BottomBar navigation={navigation} />
      {/* <BottomNavigator /> */}
    </SafeAreaView>
  );
};

export default Main;
