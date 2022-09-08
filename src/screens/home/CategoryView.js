import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import mainAPI from '../../api/modules/mainAPI';
import BottomBar from '../../component/BottomBar';
import Header from '../../component/Header';
import Loading from '../../component/Loading';
import MainBanner from '../../component/MainBanner';
import SearchBox from '../../component/mainScreen/SearchBox';
import TextEBold from '../../component/text/TextEBold';
import TextMedium from '../../component/text/TextMedium';
import BannerList from '../../config/BannerList';
import {_guestAlert} from '../../config/utils/modules';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {setIsLifeStyle} from '../../store/reducers/CategoryReducer';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyle';

const CategoryView = ({navigation, route}) => {
  const selectedCategory = route.params?.selectedCategory;
  const [categoryData, setCategoryData] = useState();
  const {mutateGetAddress} = useCustomMutation();
  const {userInfo} = useSelector(state => state.authReducer);
  const {isGuest} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const mutateCategory = useMutation(mainAPI._getCategory, {
    onSuccess: e => {
      if (e.result === 'true') {
        console.log('e', e);
        console.log('LENGHT OF ITEMS', e.data.arrItems.length);
        let temp = e.data.arrItems;
        let isNumTrue = e.data.arrItems.length % 5;
        // if (isNumTrue != 0) {
        //   console.log('IS NUM', isNumTrue);
        //   for (let i = isNumTrue; i < 5; i++) {
        //     temp.push('');
        //   }
        //   console.log('TEMP ::', temp);
        // }
        setCategoryData(temp);
      }
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
      <>
        <Pressable
          onPress={() => {
            if (item.item) {
              if (selectedCategory === 'lifestyle')
                dispatch(setIsLifeStyle(true));
              else dispatch(setIsLifeStyle(false));
              navigation.navigate('StoreList', {
                routeIdx: item.item.ca_name,
                category: selectedCategory,
                categoryData: categoryData,
              });
            }
          }}
          style={{
            flex: 1,
            // justifyContent: 'space-between',
            alignItems: 'center',
            // marginHorizontal: 10,
          }}
        >
          <View style={{width: 80, alignItems: 'center'}}>
            <Image
              source={{uri: item.item.ca_img}}
              style={{width: 55, height: 55}}
              resizeMode="contain"
            />
            <TextMedium
              style={{
                textAlign: 'center',
                fontSize: 13,
              }}
            >
              {item.item.ca_name}
            </TextMedium>
          </View>
        </Pressable>
        {item.index === categoryData?.length - 1 &&
          categoryData?.length % 4 !== 0 && (
            <View style={{flex: 4 - (categoryData?.length % 4)}}></View>
          )}
      </>
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
                if (!isGuest) {
                  navigation.navigate('AddressMain');
                } else {
                  _guestAlert(navigation);
                }
              }}
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'white',
                marginBottom: 10,
              }}
            >
              <Image
                source={require('~/assets/ico_location.png')}
                style={{width: 19, height: 19, marginRight: 8}}
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
                    (mutateGetAddress?.data?.data?.arrItems[0]?.ad_addr2 ??
                      ' ') +
                    ' '}
                  {!mutateGetAddress?.data ?? '주소설정'}
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
              isSub={true}
              navigation={navigation}
              category={selectedCategory}
              // onPress={() =>
              //   navigation.navigate('SearchView', {
              //     isSub: true,
              //     category: selectedCategory,
              //   })
              // }
            />
            {/* 메인배너 */}
            <MainBanner
              navigation={navigation}
              style={{marginTop: 17, marginBottom: 17}}
              position={BannerList[`${selectedCategory}`]}
            />
          </>
        )}
        renderItem={item => renderItem(item)}
        numColumns={4}
        contentContainerStyle={{
          paddingHorizontal: 22,
          paddingBottom: 40,
        }}
        columnWrapperStyle={{
          alignSelf: 'center',
          marginBottom: 10,
        }}
        keyExtractor={(item, index) => index}
      />
      <BottomBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default CategoryView;
