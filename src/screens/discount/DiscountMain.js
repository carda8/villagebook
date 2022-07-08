import {View, Text, Pressable, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import TextBold from '../../component/text/TextBold';
import colors from '../../styles/colors';
import TextNotoM from '../../component/text/TextNotoM';
import TextRegular from '../../component/text/TextRegular';
import TextNotoB from '../../component/text/TextNotoB';
import {replaceString} from '../../config/utils/Price';
import TextMedium from '../../component/text/TextMedium';
import Pagination from '../../component/Pagenation';
import CouponTicket from './CouponTicket';

const DiscountMain = ({navigation}) => {
  const arr = [1, 2, 3];
  const [page, setPage] = useState(1);

  const handlePage = item => {
    console.log('item', item);
    setPage(item);
  };
  const renderItem = item => {
    return <CouponTicket />;
  };
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header
        title={'할인함 (포인트&쿠폰)'}
        showCart={true}
        navigation={navigation}
      />

      {/* <View>
          <Image
            source={require('~/assets/no_coupon.png')}
            style={{width: 301, height: 301, marginTop: '10%'}}
            resizeMode="contain"
          />
        </View> */}

      <FlatList
        ListFooterComponent={() => (
          <Pagination
            total={10}
            numberOfItems={3}
            selectedPage={page}
            handlePage={handlePage}
            marginVertical={30}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View style={{paddingHorizontal: 22, marginTop: 26}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextBold style={{fontSize: 18, color: colors.fontColor2}}>
                  포인트 & 쿠폰 안내
                </TextBold>
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
              <View
                style={{
                  height: 50,
                  backgroundColor: colors.inputBoxBG,
                  borderRadius: 5,
                  marginTop: 23,
                  marginBottom: 10,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextRegular>내 포인트</TextRegular>
                <TextNotoB style={{fontSize: 15, color: colors.primary}}>
                  {replaceString(999999999)}P
                </TextNotoB>
              </View>
            </View>
          </>
        )}
        data={arr}
        renderItem={item => renderItem(item)}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default DiscountMain;
