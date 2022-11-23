import {View, Text, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import TextEBold from '../../component/text/TextEBold';
import colors from '../../styles/colors';
import {Pressable} from 'react-native';
import {_guestAlert} from '../../config/utils/modules';
import {ScrollView} from 'react-native';
import TextRegular from '../../component/text/TextRegular';
import TextSBold from '../../component/text/TextSBold';
import {FlatList} from 'react-native';
import TextBold from '../../component/text/TextBold';
import {Platform} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

// onPress={() => {
//     if (!isGuest && userInfo) {
//       navigation.navigate('AddressMain');
//     } else {
//       _guestAlert(navigation);
//     }
//   }}

const CouponBookMain = ({navigation, route}) => {
  const {mutateGetAddress} = useCustomMutation();
  const {userInfo, isGuest} = useSelector(state => state.authReducer);
  const isFocused = useIsFocused();

  const [addr, setAddr] = useState();
  const [filterCate, setFilterCate] = useState('전체');
  const [filterSub, setFilterSub] = useState('추천순');
  const [couponList, setCouponList] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1]);

  const data = route.params?.data;

  const filterList = [
    '추천순',
    '인기순',
    '기간 마감 임박 순',
    '개수 마감 임박 순',
  ];

  console.log('book data', data);

  const _getAddr = () => {
    const data = {
      mt_id: userInfo.mt_id,
    };

    mutateGetAddress.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true') {
          let tempAddr =
            e.data.arrItems[0].ad_addr1 +
            e.data.arrItems[0].ad_addr2 +
            e.data.arrItems[0].ad_addr3;
          setAddr(tempAddr);
        } else setAddr('주소설정');
        console.log('mutateGetAddress', e);
      },
    });
  };

  const _onPressCate = item => {
    console.log('item', item);
    setFilterCate(item.ca_name);
  };

  const _onPressSub = item => {
    setFilterSub(item);
  };

  const renderItem = item => {
    return (
      <Shadow distance={5} offset={[0, 2]} style={{width: '100%'}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: 10,
            height: 100,
            backgroundColor: 'white',
            marginBottom: 15,
          }}></View>
      </Shadow>
    );
  };

  useEffect(() => {
    _getAddr();
  }, [isFocused]);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      {/* 
        쿠폰북 헤더 
        */}
      <View
        style={{
          borderBottomWidth: 1,
          paddingBottom: 15,
          borderColor: colors.borderColor,
        }}>
        <View
          style={{
            marginTop: 15,
            marginHorizontal: 14,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('~/assets/ico_location.png')}
            style={{
              width: 19,
              height: 19,
              marginRight: 8,
              tintColor: colors.primary,
            }}
          />
          <Pressable
            hitSlop={10}
            onPress={() => {
              if (!isGuest && userInfo) {
                navigation.navigate('AddressMain');
              } else {
                _guestAlert(navigation);
              }
            }}
            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginLeft: 0, marginRight: 3}}>
              <TextEBold
                numberOfLines={1}
                style={{
                  fontSize: 15,
                  color: colors.fontColor2,
                }}>
                {addr}
              </TextEBold>
            </View>
            <Image
              source={require('~/assets/down_arrow.png')}
              style={{width: 17, height: 17}}
            />
          </Pressable>
          <View style={{}}>
            <Image
              source={require('~/assets/ico_search.png')}
              style={{width: 23, height: 23, tintColor: colors.primary}}
            />
          </View>
        </View>
      </View>
      {/* 
        END 쿠폰북 헤더 
        */}
      {/* 
       카테고리 필터 스크롤
        */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          marginHorizontal: 14,
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map(
            (item, index) =>
              index < data.length - 2 && (
                <Pressable
                  hitSlop={3}
                  key={item.ca_id}
                  onPress={() => {
                    _onPressCate(item);
                  }}
                  style={{
                    height: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 13,
                    borderWidth: 1,
                    borderColor:
                      item.ca_name === filterCate
                        ? colors.primary
                        : colors.colorE3,
                    backgroundColor:
                      item.ca_name === filterCate ? colors.primary : 'white',
                    borderRadius: 30,
                    marginRight: 10,
                  }}>
                  <TextRegular
                    style={{
                      color:
                        item.ca_name === filterCate
                          ? 'white'
                          : colors.fontColor2,
                    }}>
                    {item.ca_name}
                  </TextRegular>
                </Pressable>
              ),
          )}
        </ScrollView>

        <Image
          source={require('~/assets/down_arrow.png')}
          style={{width: 23, height: 23}}
          resizeMode="contain"
        />
      </View>
      {/* 
        END 카테고리 필터 스크롤
        */}

      {/* 
      필터 스크롤 
      */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 10,
          marginBottom: 10,
          marginHorizontal: 14,
          height: 25,
        }}
        contentContainerStyle={{height: 25}}>
        {filterList.map(
          (item, index) =>
            index < data.length - 2 && (
              <Pressable
                hitSlop={3}
                key={item + index}
                onPress={() => {
                  _onPressSub(item);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 15,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 6 / 2,
                    backgroundColor:
                      item === filterSub ? colors.primary : colors.fontColorA,
                    marginRight: 5,
                  }}
                />
                {item === filterSub ? (
                  <TextSBold
                    style={{
                      color:
                        item === filterSub
                          ? colors.fontColor2
                          : colors.fontColorA,
                    }}>
                    {item}
                  </TextSBold>
                ) : (
                  <TextRegular
                    style={{
                      color:
                        item === filterSub
                          ? colors.fontColor2
                          : colors.fontColorA,
                    }}>
                    {item}
                  </TextRegular>
                )}
              </Pressable>
            ),
        )}
      </ScrollView>
      <FlatList
        data={couponList}
        keyExtractor={(item, index) => index}
        overScrollMode={'never'}
        contentContainerStyle={{
          paddingTop: 15,
          paddingHorizontal: 14,
          paddingBottom: 20,
        }}
        ListEmptyComponent={
          <View style={{alignItems: 'center', marginBottom: '60%'}}>
            <TextBold style={{fontSize: 33}}>아직 준비중입니다!</TextBold>
          </View>
        }
        renderItem={item => renderItem(item)}
      />
      {/*
      END 필터 스크롤 
      */}
    </SafeAreaView>
  );
};

export default CouponBookMain;
