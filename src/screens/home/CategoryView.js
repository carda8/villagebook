import React from 'react';
import {
  FlatList,
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
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import BottomBar from '../../component/BottomBar';
import Divider from '../../component/Divider';
import Header from '../../component/Header';
import MainBanner from '../../component/MainBanner';
import SearchBox from '../../component/mainScreen/SearchBox';
import TextBold from '../../component/text/TextBold';
import TextEBold from '../../component/text/TextEBold';
import TextJua from '../../component/text/TextJua';
import TextMedium from '../../component/text/TextMedium';
import TextRegular from '../../component/text/TextRegular';
import BottomNavigator from '../../navigator/BottomNavigator';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyle';

const CategoryView = ({navigation}) => {
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const renderItem = item => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('StoreList', {routteIdx: item.index});
        }}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('~/assets/cat01.png')}
          style={{width: 46, height: 46}}
          resizeMode="contain"
        />
        <TextMedium style={{fontSize: 13}}>{item.index}</TextMedium>
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
        numColumns={4}
        columnWrapperStyle={{marginBottom: 20}}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default CategoryView;
