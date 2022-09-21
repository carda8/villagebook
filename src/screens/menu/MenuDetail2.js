import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import ImageSwipe from '../../component/menuDetail/ImageSwipe';
import MenuDesc from '../../component/menuDetail/MenuDesc';
import commonStyles from '../../styles/commonStyle';
import colors from '../../styles/colors';
import TextRegular from '../../component/text/TextRegular';
import Dot from '../../component/Dot';
import FastImage from 'react-native-fast-image';
import TextMedium from '../../component/text/TextMedium';
import TextBold from '../../component/text/TextBold';
import TextNotoM from '../../component/text/TextNotoM';
import TextNotoR from '../../component/text/TextNotoR';
import TextNotoB from '../../component/text/TextNotoB';
import DividerL from '../../component/DividerL';
import {Slider} from '@miblanchard/react-native-slider';
import Loading from '../../component/Loading';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {customAlert} from '../../component/CustomAlert';
import {replaceString} from '../../config/utils/Price';
import {useSelector} from 'react-redux';
import MenuReview from './MenuReview';
import MiniMap from '../map/MiniMap';
import Caution from '../../component/Caution';
import AuthStorageModuel from '../../store/localStorage/AuthStorageModuel';
import {Shadow} from 'react-native-shadow-2';
import {FlatList} from 'react-native';

const MenuDetail2 = ({navigation, route}) => {
  const [tabVisible, setTabVisible] = useState(false);
  const [index, setIndex] = useState();
  const [showHeader, setShowHeader] = useState(false);
  const tempRef = useRef();
  const tempRef2 = useRef();
  const [tabPosition, setTabPosition] = useState();
  const [showFilter, setShowFilter] = useState(false);

  const data = [
    {key: 0, title: 'title1', data: [1]},
    {key: 1, title: 'title2', data: [5]},
    // {key: 2, title: 'title3', data: [21]},
    // {key: 3, title: 'title4', data: [21]},
  ];

  const renderItem = item => {
    console.log('ITEM::', item);
    return (
      <View
        style={{
          flex: 1,
          height: 1000,
          backgroundColor: 'tomato',
        }}>
        <Text style={{fontSize: 30}}>{item.item}</Text>
      </View>
    );
  };

  useEffect(() => {
    console.log(
      'tempRef',
      tempRef2.current.measureLayout(
        tempRef.current,
        (left, top, width, height) => {
          console.log(left, top, height, width);
          setTabPosition(384);
        },
      ),
    );
  }, []);

  const sectionHeader = section => {
    if (section.key !== 1) return <></>;
    return (
      <View ref={tempRef}>
        {/* <View
          ref={tempRef2}
          style={{
            height: 57,
            backgroundColor: section.key === 1 ? 'teal' : 'gray',
          }}></View> */}

        <View
          ref={tempRef2}
          style={{
            flexDirection: 'row',
            height: 55,
            // borderTopColor: colors.borderColor,
          }}>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopWidth: index === 0 ? 2 : 1,
              borderBottomWidth: index === 0 ? 0 : 1,
              borderRightWidth: index === 0 ? 1 : 0,
              borderRightColor: colors.borderColor,
              borderTopColor:
                index === 0 ? colors.borderColor22 : colors.borderColor,
              borderBottomColor: colors.borderColor,
              zIndex: 300,
            }}
            onPress={() => {
              setIndex(0);
            }}>
            <TextMedium style={{fontSize: 17}}>메뉴</TextMedium>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopWidth: index === 1 ? 2 : 1,
              borderBottomWidth: index === 1 ? 0 : 1,
              borderRightWidth: index === 1 ? 1 : 0,
              borderRightColor: colors.borderColor,
              borderLeftWidth: index === 1 ? 1 : 0,
              borderLeftColor: colors.borderColor,
              borderTopColor:
                index === 1 ? colors.borderColor22 : colors.borderColor,
              borderBottomColor: colors.borderColor,
              zIndex: 300,
            }}
            onPress={() => {
              setIndex(1);
            }}>
            <TextMedium style={{fontSize: 17}}>정보</TextMedium>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopWidth: index === 2 ? 2 : 1,
              borderBottomWidth: index === 2 ? 0 : 1,
              borderLeftWidth: index === 2 ? 1 : 0,
              borderLeftColor: colors.borderColor,
              borderTopColor:
                index === 2 ? colors.borderColor22 : colors.borderColor,
              borderBottomColor: colors.borderColor,
              zIndex: 300,
            }}
            onPress={() => {
              setIndex(2);
            }}>
            <TextMedium style={{fontSize: 17}}>리뷰</TextMedium>
          </Pressable>
        </View>
        {showFilter && (
          <ScrollView
            style={{backgroundColor: 'white', top: -1}}
            showsHorizontalScrollIndicator={false}
            horizontal>
            {data.map((item, index) => (
              <View key={index}>
                <Pressable
                  style={{
                    height: 34,
                    // width: chipWidth,
                    minWidth: 67,
                    // backgroundColor:
                    //   selected.idx === index ? colors.primary : 'white',
                    borderWidth: 1,
                    // borderColor:
                    //   selected.idx === index ? 'white' : colors.colorE3,
                    marginVertical: 10,
                    paddingHorizontal: 5,
                    marginHorizontal: 5,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TextMedium
                    style={{
                      fontSize: 14,
                      // color:
                      //   selected.idx === index ? 'white' : colors.fontColor2,
                    }}>
                    hihihihihi
                    {item.ca_name}
                  </TextMedium>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

  // useEffect(() => {
  //   console.log(showHeader);
  // }, [showHeader]);

  return (
    <>
      <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
        <View style={{zIndex: 500, position: 'absolute'}}>
          <Header
            style={{backgroundColor: showHeader ? 'white' : 'rgba(0,0,0,0)'}}
          />
        </View>
        <SectionList
          onScroll={e => {
            const offset = e.nativeEvent.contentOffset;

            if (offset.y < 400) setShowHeader(false);
            if (offset.y > 350) setShowHeader(true);
            // console.log('tabPosition', tabPosition);
            if (offset.y > tabPosition * 2 + 170) setShowFilter(true);
            if (offset.y < tabPosition * 2 + 170) setShowFilter(false);

            console.warn(e.nativeEvent.contentOffset);
            // if(e.nai)
          }}
          sections={data}
          // contentContainerStyle={{}}
          stickySectionHeadersEnabled={true}
          keyExtractor={(item, index) => item.key}
          renderItem={item => renderItem(item)}
          renderSectionHeader={({section}) => sectionHeader(section)}
          contentInset={{top: 57}}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          bouncesZoom={false}
          // style={{}}
          // contentContainerStyle={{backgroundColor: 'gray'}}
          // onViewableItemsChanged={item => {
          //   if (
          //     item.viewableItems.length === 1 &&
          //     item.viewableItems[0].section.key === 1
          //   ) {
          //     setTabVisible(true);
          //     console.log('true');
          //   } else if (tabVisible) {
          //     setTabVisible(false);
          //     console.log('false');
          //   }
          //   console.log('Changed', item);
          // }}
        />
      </SafeAreaView>
    </>
  );
};

export default MenuDetail2;

const styles = StyleSheet.create({
  titleTakout: {
    color: colors.fontColor99,
    marginVertical: 11,
  },
  subTitleTakeout: {
    color: colors.fontColor3,
  },
});
