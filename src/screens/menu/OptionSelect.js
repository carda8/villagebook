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
  setRequiredCount,
  setSubMenu,
} from '../../store/reducers/CartReducer';
import {useuseCustomMutation} from '../../hooks/useCustomMutation';
import Loading from '../../component/Loading';
import {configureStore} from '@reduxjs/toolkit';

const OptionSelect = ({navigation, route}) => {
  const routeData = route.params;
  console.log('routeData', routeData);
  const {mutateMenuDetail} = useuseCustomMutation();
  const [convertedData, setConvertedData] = useState([]);
  const {optionHeader, currentStoreCode} = useSelector(
    state => state.menuReducer,
  );
  const dispatch = useDispatch();

  const storeCode = 1;

  const _getMenuDetail = () => {
    const data = {
      jumju_id: routeData.jumju_id,
      jumju_code: routeData.jumju_code,
      it_id: routeData.it_id,
    };
    mutateMenuDetail.mutate(data);
  };

  const layout = useWindowDimensions();

  // const _getReqiredItem = () => {
  //   const temp = arr.filter((item, index) => item.required === true);
  //   console.log('get temp', temp);
  //   dispatch(
  //     initOption({
  //       count: 1,
  //       mainItemCode: data.itemCode,
  //       price: data.price,
  //       mainReqired: temp,
  //     }),
  //   );
  // };

  const _convertData = info => {
    let arr = [];
    info.option.map((item, index) => {
      arr.push({...item, required: true, data: item.option_data});
      delete arr[index].option_data;
    });
    info.supply.map((item, index) => {
      arr.push({...item, required: false, data: item.supply_option});
      delete arr[index].supply_option;
    });
    const required = arr.filter(item => item['required'] === true);
    dispatch(setRequiredCount(required.length));
    setConvertedData(arr);

    // console.log('DetailInfo', arr);
  };

  useEffect(() => {
    if (mutateMenuDetail?.data?.data.arrItems) {
      const info = mutateMenuDetail?.data?.data.arrItems;
      dispatch(
        initOption({
          count: 1,
          mainItemCode: routeData.it_id,
          manuName: info.it_name,
          price: Number(info.it_price),
        }),
      );
      _convertData(info);
    }
  }, [mutateMenuDetail.data]);

  useEffect(() => {
    _getMenuDetail();
    // _getReqiredItem();
  }, []);

  // console.log('convertedData', convertedData);

  if (convertedData.length === 0 || !mutateMenuDetail?.data?.data?.arrItems)
    return <Loading />;
  const DetailInfo = mutateMenuDetail?.data?.data.arrItems;
  // console.log('DetailInfo', DetailInfo);

  // return <Loading />;

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header
        title={''}
        navigation={navigation}
        fadeTitle={DetailInfo.it_name}
        style={{position: 'absolute', zIndex: 500}}
        isOption={true}
      />
      <CartButton navigation={navigation} />
      {/* <SectionList sections={convertedData} renderItem={item => <></>} /> */}

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
                {DetailInfo.it_name}
              </TextBold>
              <View style={{marginVertical: 10}}>
                <TextMedium style={{color: colors.fontColorA}}>
                  {DetailInfo.it_explan}
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
                  {replaceString(DetailInfo.it_price)}원
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
            <OptionCount price={DetailInfo.it_price} />
          </View>
        )}
        sections={convertedData}
        contentContainerStyle={{paddingBottom: 100}}
        keyExtractor={(item, index) => item + index}
        renderItem={item => (
          <OptionRenderItem item={item} data={convertedData} />
        )}
        renderSectionHeader={({
          section: {option_subject, supply_subject, required},
        }) => (
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.borderColor,
              paddingHorizontal: 22,
              paddingVertical: 15,
            }}>
            <TextBold style={{color: colors.fontColor2}}>
              {option_subject || supply_subject}
              {required ? ' (필수)' : ' (선택)'}
            </TextBold>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default OptionSelect;
