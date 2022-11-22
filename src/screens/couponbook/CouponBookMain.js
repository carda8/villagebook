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
  const data = route.params?.data;
  console.log('book data', data);
  const [addr, setAddr] = useState();
  const isFocused = useIsFocused();

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

  useEffect(() => {
    if (isFocused) _getAddr();
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          marginHorizontal: 14,
        }}>
        <ScrollView
          horizontal
          style={{}}
          showsHorizontalScrollIndicator={false}>
          {data.map(
            (item, index) =>
              index < data.length - 2 && (
                <Pressable
                  style={{
                    height: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 13,
                    borderWidth: 1,
                    borderColor: colors.colorE3,
                    borderRadius: 30,
                    marginRight: 10,
                  }}>
                  <TextRegular>{item.ca_name}</TextRegular>
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
    </SafeAreaView>
  );
};

export default CouponBookMain;
