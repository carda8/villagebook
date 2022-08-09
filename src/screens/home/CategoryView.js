import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text} from 'react-native';
import {Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import mainAPI from '../../api/modules/mainAPI';
import Header from '../../component/Header';
import Loading from '../../component/Loading';
import MainBanner from '../../component/MainBanner';
import SearchBox from '../../component/mainScreen/SearchBox';
import TextEBold from '../../component/text/TextEBold';
import TextMedium from '../../component/text/TextMedium';
import BannerList from '../../config/BannerList';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {setIsLifeStyle} from '../../store/reducers/CategoryReducer';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyle';

const CategoryView = ({navigation, route}) => {
  const selectedCategory = route.params?.selectedCategory;
  const [categoryData, setCategoryData] = useState();
  const {mutateGetAddress} = useCustomMutation();
  const {userInfo} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const mutateCategory = useMutation(mainAPI._getCategory, {
    onSuccess: e => {
      console.log('e', e);
      setCategoryData(e.data.arrItems);
    },
  });
  console.log('selectedCategory', selectedCategory);
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

  useFocusEffect(
    useCallback(() => {
      _getAddr();
      return () => {};
    }, []),
  );

  const _init = () => {
    const data = {
      ca_type: selectedCategory,
    };
    mutateCategory.mutate(data);
  };

  useEffect(() => {
    _init();
  }, []);

  const renderItem = item => {
    return (
      <Pressable
        onPress={() => {
          if (selectedCategory === 'lifestyle') dispatch(setIsLifeStyle(true));
          else dispatch(setIsLifeStyle(false));
          navigation.navigate('StoreList', {
            routeIdx: item.item.ca_name,
            category: selectedCategory,
            categoryData: categoryData,
          });
        }}
        style={{
          flex: 1,
          alignItems: 'center',
          // marginHorizontal: 10,
        }}>
        <Image
          source={{uri: item.item.ca_img}}
          style={{width: 46, height: 46}}
          resizeMode="contain"
        />
        <TextMedium
          style={{
            textAlign: 'center',
            fontSize: 13,
          }}>
          {item.item.ca_name}
        </TextMedium>
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
        data={categoryData}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Loading />}
        ListHeaderComponent={() => (
          <>
            <Pressable
              onPress={() => {
                navigation.navigate('AddressMain');
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
              <TextEBold
                numberOfLines={1}
                style={{
                  fontSize: 15,
                  color: colors.fontColor2,
                  marginHorizontal: 10,
                }}>
                {(mutateGetAddress?.data?.data?.arrItems[0]?.ad_addr1 ??
                  '주소설정') +
                  ' ' +
                  (mutateGetAddress?.data?.data?.arrItems[0]?.ad_addr2 ?? ' ') +
                  ' '}
                {!mutateGetAddress?.data ?? '주소설정'}
              </TextEBold>
            </Pressable>

            {/* <SearchBox /> */}
            {/* 메인배너 */}
            <MainBanner
              navigation={navigation}
              style={{marginTop: 17, marginBottom: 17}}
              position={BannerList[`${selectedCategory}`]}
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
