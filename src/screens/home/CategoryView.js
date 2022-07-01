import React from 'react';
import {FlatList, Image} from 'react-native';
import {Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import MainBanner from '../../component/MainBanner';
import SearchBox from '../../component/mainScreen/SearchBox';
import TextEBold from '../../component/text/TextEBold';
import TextMedium from '../../component/text/TextMedium';
// import category from '../../config/category';
import commonStyles from '../../styles/commonStyle';

const CategoryView = ({navigation}) => {
  const arr = [
    '1인분',
    '돈까스/회/일식',
    '중식',
    '치킨',
    '백반/죽/국수',
    '카페/디저트',
    '분식',
    '찜/탕/찌개',
    '피자',
    '양식',
    '고기/구이',
    '족발/보쌈',
    '아시안',
    '패스트푸드',
    '야식',
    '도시락',
    '체인점',
    '맛집추천',
  ];
  const renderItem = item => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('StoreList', {routteIdx: item.index});
        }}
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Image
          source={require('~/assets/cat01.png')}
          style={{width: 46, height: 46}}
          resizeMode="contain"
        />
        <TextMedium style={{fontSize: 13}}>{item.item}</TextMedium>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header
        title={''}
        navigation={navigation}
        showLogo={true}
        showNoti={true}
        showCart={true}
      />

      <FlatList
        data={arr}
        scrollEnabled
        style={{paddingHorizontal: 22, paddingBottom: 70}}
        ListHeaderComponent={() => (
          <>
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
            {/* 메인배너 */}
            <MainBanner
              navigation={navigation}
              style={{marginTop: 17, marginBottom: 17}}
            />
          </>
        )}
        renderItem={item => renderItem(item)}
        numColumns={3}
        columnWrapperStyle={{marginBottom: 20, marginHorizontal: -11}}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default CategoryView;
