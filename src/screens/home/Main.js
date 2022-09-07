import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, SectionList, View} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import policyConfig from '../signIn/policyConfig';
import {_guestAlert, _showAddr} from '../../config/utils/modules';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useFocusEffect} from '@react-navigation/native';
import BannerList from '../../config/BannerList';
import dayjs from 'dayjs';
import {resetSavedItem} from '../../store/reducers/CartReducer';
import TextSBold from '../../component/text/TextSBold';

const Main = ({navigation}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.authReducer);
  // const {postData} = useSelector(state => state.addressReducer);
  const {savedItem} = useSelector(state => state.cartReducer);
  const {mutateGetAddress, mutateGetCompanyInfo} = useCustomMutation();
  const [companyInfo, setCompanyInfo] = useState();
  const [toggleInfo, setToggleInfo] = useState(false);
  const {isGuest} = useSelector(state => state.authReducer);

  const _getAddr = () => {
    const data = {
      mt_id: userInfo.mt_id,
    };

    mutateGetAddress.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true') {
        }
        console.log('mutateGetAddress', e);
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

  const _checkTime = () => {
    const date = new Date();
    const diff = dayjs(date).diff(savedItem.savedTime, 'minutes');
    //minute of a day
    const limit = 60 * Number(companyInfo.de_local_time);
    console.log('savedItem', savedItem);
    console.log('DIFF :::::', diff, limit);
    if (diff >= limit) {
      dispatch(resetSavedItem());
    }
    // if (diff >= 1440) console.log('copyData', copyData);
  };

  useFocusEffect(
    useCallback(() => {
      _getAddr();
      return () => {};
    }, []),
  );

  useEffect(() => {
    _getCompanyInfo();
    console.log('::: USER INFO', userInfo);
  }, []);

  useEffect(() => {
    if (companyInfo) {
      _checkTime();
    }
  }, [companyInfo]);

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
        contentContainerStyle={{paddingHorizontal: 22, paddingBottom: 70}}
      >
        <Pressable
          onPress={() => {
            if (!isGuest) {
              navigation.navigate('AddressMain');
            } else {
              _guestAlert(navigation);
            }
          }}
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            marginBottom: 10,
          }}
        >
          <Image
            source={require('~/assets/ico_location.png')}
            style={{width: 19, height: 19}}
          />
          <View style={{marginLeft: 10, marginRight: 3}}>
            <TextEBold
              numberOfLines={1}
              style={{
                fontSize: 15,
                color: colors.fontColor2,
              }}
            >
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
          </View>

          <Image
            source={require('~/assets/arrow.png')}
            style={{
              tintColor: colors.primary,
              width: 17,
              height: 17,
              // transform: [{rotate: '90deg'}],
            }}
            resizeMode={'contain'}
          />
        </Pressable>

        <SearchBox
          navigation={navigation}
          // onPress={() => navigation.navigate('SearchView')}
          isMain={true}
        />

        {/* 동네편의 */}
        <View
          style={{
            flex: 1,
            height: 141,
            marginBottom: 15,
            marginTop: 17,
          }}
        >
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
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <View style={{paddingTop: 39}}>
              <TextJua style={{fontSize: 23, color: colors.fontMain3}}>
                동네서비스
              </TextJua>
              <View style={{marginTop: 8}}>
                <TextRegular>
                  우리동네 서비스, {'\n'}시설 검색은 한번에
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

        {/* 동네맛집 */}
        {/* 동네마켓 */}
        <View
          style={{
            height: 220,
            marginBottom: 15,
            flexDirection: 'row',
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate('CategoryView', {selectedCategory: 'food'});
            }}
            style={{
              flex: 1,
              borderRadius: 10,
              marginRight: 16,
              paddingTop: 34,
              paddingLeft: 27,
              borderWidth: 1,
              backgroundColor: colors.mainBG1,
              borderColor: colors.mainBG1Border,
            }}
          >
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
              borderRadius: 10,
              paddingTop: 34,
              paddingLeft: 27,
              backgroundColor: colors.mainBG2,
              borderColor: colors.mainBG2Border,
              borderWidth: 1,
            }}
          >
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

        {/* 메인배너 */}
        <MainBanner
          navigation={navigation}
          style={{marginBottom: 20}}
          position={BannerList.main}
        />

        {/* 약관 */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate('Policy', {
                target: policyConfig.target.location,
              });
            }}
          >
            <TextRegular style={{color: colors.fontColor8, fontSize: 10}}>
              위치기반 서비스 이용약관
            </TextRegular>
          </Pressable>
          <Divider style={{marginHorizontal: 5}} />
          <Pressable
            onPress={() => {
              navigation.navigate('Policy', {
                target: policyConfig.target.personal,
              });
            }}
          >
            <TextBold style={{color: colors.fontColor8, fontSize: 10}}>
              개인정보 처리방침
            </TextBold>
          </Pressable>
          <Divider style={{marginHorizontal: 5}} />
          <Pressable
            onPress={() => {
              navigation.navigate('Policy', {target: policyConfig.target.use});
            }}
          >
            <TextRegular style={{color: colors.fontColor8, fontSize: 10}}>
              이용약관
            </TextRegular>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            setToggleInfo(!toggleInfo);
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}
        >
          <TextSBold>(주)어스닉</TextSBold>
          <Image
            source={require('~/assets/btn_top_left.png')}
            style={{
              transform: [{rotate: toggleInfo ? '90deg' : '-90deg'}],
              width: 20,
              height: 20,
              marginLeft: 4,
            }}
            resizeMode={'contain'}
          />
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <TextRegular style={{color: colors.fontColor8, fontSize: 11}}>
            (주)어스닉은 통신판매중개자이며, 따라서 (주)어스닉은 상품, 거래정보
            및 거래에 대하여 책임을 지지 않습니다.
          </TextRegular>
        </View>
        {toggleInfo && (
          <>
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <View style={{marginBottom: 20}}>
                <TextRegular style={{color: colors.fontColor8, fontSize: 11}}>
                  {companyInfo?.de_admin_company_memo}
                </TextRegular>
              </View>
              <TextRegular style={{color: colors.fontColor8, fontSize: 11}}>
                {companyInfo?.de_admin_company_addr} 대표이사 :{' '}
                {companyInfo?.de_admin_company_owner} | 사업자등록번호 :
                {companyInfo?.de_admin_company_saupja_no} 통신판매업신고 :{' '}
                {companyInfo?.de_admin_tongsin_no}
              </TextRegular>
            </View>
          </>
        )}
      </ScrollView>
      <BottomBar navigation={navigation} />
      {/* <BottomNavigator /> */}
    </SafeAreaView>
  );
};

export default Main;
