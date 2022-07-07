import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  Image,
  Pressable,
  SectionList,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import FastImage from 'react-native-fast-image';
import TextBold from '../../component/text/TextBold';
import {replaceString} from '../../config/utils/Price';
import TextMedium from '../../component/text/TextMedium';
import colors from '../../styles/colors';
import TextRegular from '../../component/text/TextRegular';
import DividerL from '../../component/DividerL';
import OptionRenderItem from './OptionRenderItem';
import {useDispatch, useSelector} from 'react-redux';
import {setOptionHeader} from '../../store/reducers/MenuReducer';
import OptionCount from './OptionCount';
import CartButton from './CartButton';
import {
  initOption,
  setMainCount,
  setSubMenu,
} from '../../store/reducers/CartReducer';

const OptionSelect = ({navigation, route}) => {
  const data = route.params.data;
  console.log('data', data);
  const {optionHeader, currentStoreCode} = useSelector(
    state => state.menuReducer,
  );
  const dispatch = useDispatch();
  const storeCode = 1;
  const arr = [
    {
      option: '매운맛 선택',
      required: true,
      data: [
        {
          name: '매운맛 추가 x',
          price: 0,
        },
        {
          name: '신라면 정도',
          price: 500,
        },
        {
          name: '불닭 정도',
          price: 1000,
        },
        {
          name: '불닭 x3',
          price: 1500,
        },
      ],
    },
    {
      option: '사이드 선택',
      required: true,
      data: [
        {
          name: '사이드1',
          price: 2000,
        },
        {
          name: '사이드2',
          price: 2200,
        },
        {
          name: '사이드3',
          price: 2300,
        },
        {
          name: '사이드4',
          price: 2400,
        },
      ],
    },
    {
      option: '추가 선택',
      required: false,
      data: [
        {
          name: '추가1',
          price: 2000,
        },
        {
          name: '추가2',
          price: 2200,
        },
        {
          name: '추가3',
          price: 2300,
        },
        {
          name: '추가4',
          price: 2400,
        },
      ],
    },
    {
      option: '음료 선택',
      required: false,
      data: [
        {
          name: '음료1',
          price: 1000,
        },
        {
          name: '음료2',
          price: 1200,
        },
        {
          name: '음료3',
          price: 1300,
        },
        {
          name: '음료4',
          price: 1400,
        },
      ],
    },
  ];
  const layout = useWindowDimensions();
  const _getReqiredItem = () => {
    const temp = arr.filter((item, index) => item.required === true);
    console.log('get temp', temp);
    dispatch(
      initOption({
        count: 1,
        mainItemCode: data.itemCode,
        price: data.price,
        mainReqired: temp,
      }),
    );
  };
  useEffect(() => {
    _getReqiredItem();
  }, []);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header
        title={''}
        fadeTitle={data.name}
        navigation={navigation}
        style={{position: 'absolute', zIndex: 500}}
        isOption={true}
      />
      <CartButton navigation={navigation} />
      <SectionList
        onScroll={e => {
          let positionY = e.nativeEvent.contentOffset.y;
          if (positionY > layout.width && optionHeader !== true)
            dispatch(setOptionHeader(true));
          else if (positionY < layout.width && optionHeader !== false)
            dispatch(setOptionHeader(false));
          // console.log('Native Scroll', e.nativeEvent.contentOffset);
        }}
        ListHeaderComponent={() => (
          <>
            <FastImage
              source={require('~/assets/dummy/CK_tica114m19040077_l.jpg')}
              style={{width: layout.width, height: layout.width / 1.2}}
            />
            <View style={{paddingHorizontal: 22, paddingTop: 10}}>
              <TextBold style={{fontSize: 20, color: colors.fontColor2}}>
                {data?.name}
              </TextBold>
              <View style={{marginVertical: 10}}>
                <TextMedium style={{color: colors.fontColorA}}>
                  {data?.desc}
                  {data?.desc}
                  {data?.desc}
                  {data?.desc}
                  {data?.desc}
                </TextMedium>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                borderTopWidth: 1,
                borderColor: colors.borderColor,
              }}>
              <View
                style={{
                  paddingHorizontal: 22,
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextBold style={{fontSize: 16, color: colors.fontColor2}}>
                  가격
                </TextBold>
                <TextBold style={{color: colors.fontColor2}}>
                  {replaceString(data?.price)}원
                </TextBold>
              </View>
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.borderColor,
              paddingHorizontal: 22,
              paddingVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextBold style={{color: colors.fontColor2}}>수량</TextBold>
            <OptionCount data={data} />
          </View>
        )}
        sections={arr}
        contentContainerStyle={{paddingBottom: 100}}
        keyExtractor={(item, index) => item + index}
        renderItem={item => <OptionRenderItem item={item} data={data} />}
        renderSectionHeader={({section: {option, required}}) => (
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.borderColor,
              paddingHorizontal: 22,
              paddingVertical: 15,
            }}>
            <TextBold style={{color: colors.fontColor2}}>
              {option}
              {required ? ' (필수)' : ' (선택)'}
            </TextBold>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default OptionSelect;
