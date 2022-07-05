import React from 'react';
import {FlatList, Image} from 'react-native';
import {Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import MainBanner from '../../component/MainBanner';
import SearchBox from '../../component/mainScreen/SearchBox';
import TextEBold from '../../component/text/TextEBold';
import TextMedium from '../../component/text/TextMedium';
import Category from '../../config/Category';
import IconPath from '../../config/IconPath';
import commonStyles from '../../styles/commonStyle';

const CategoryView = ({navigation, route}) => {
  const selectedCategory = route.params?.selectedCategory;
  let arr;
  if (selectedCategory) {
    switch (selectedCategory) {
      case 'food':
        arr = Category.food;
        break;
      case 'market':
        arr = Category.market;
        break;
      case 'convenience':
        arr = Category.convenience;
        break;
      default:
        break;
    }
  }
  const renderItem = item => {
    let idxNum = 1;
    switch (selectedCategory) {
      case 'food':
        idxNum = idxNum;
        break;
      case 'market':
        idxNum = 19;
        break;
      case 'convenience':
        idxNum = 37;
        break;
      default:
        break;
    }
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('StoreList', {
            routeIdx: item.item,
            category: selectedCategory,
          });
        }}
        style={{
          flex: 1,
          alignItems: 'center',
          // marginHorizontal: 10,
        }}>
        <Image
          source={IconPath[item.index + idxNum]}
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
        contentContainerStyle={{paddingHorizontal: 22}}
        columnWrapperStyle={{marginBottom: 20}}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default CategoryView;
