import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Header from '../../component/Header';
import ImageSwipe from '../../component/menuDetail/ImageSwipe';
import MenuList from '../../component/menuDetail/MenuList';
import MenuDesc from '../../component/menuDetail/MenuDesc';
import commonStyles from '../../styles/commonStyle';
import colors from '../../styles/colors';
import TextRegular from '../../component/text/TextRegular';
import Dot from '../../component/Dot';
import {color} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import TextMedium from '../../component/text/TextMedium';

const MenuDetail = ({navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arrTop = [1, 2, 3];
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);
  const [temp, setTemp] = useState();
  const [headerTrigger, setHeaderTrigger] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [selected, setSelected] = useState({idx: '', isScrolling: false});

  const scrollRef = useRef();
  const scrollRefSub = useRef();
  const focusTarget = useRef([]);
  const chipTarget = useRef([]);

  const chipWidth = 80;

  useEffect(() => {
    console.log('index', selected);
  }, [selected]);

  useEffect(() => {
    if (chipTarget.current[selected.idx]) {
      chipTarget.current[selected.idx].measureLayout(
        scrollRefSub.current,
        (left, top, width, height) => {
          scrollRefSub.current.scrollTo({
            x: left - layout.width / 3 - 10,
            y: 0,
            animated: true,
          });
        },
      );
    }
  }, [selected]);

  return (
    <>
      <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
        <ScrollView
          ref={scrollRef}
          stickyHeaderIndices={[3]}
          // contentOffset={{x: 0, y: 100}}
          onScrollBeginDrag={e => {
            if (selected.isScrolling !== true) {
              setSelected({...selected, isScrolling: true});
            }
          }}
          onScroll={e => {
            const positionY = e.nativeEvent.contentOffset.y;
            if (positionY >= 300 && headerTrigger === false)
              setHeaderTrigger(true);
            if (positionY <= 300 && headerTrigger === true)
              setHeaderTrigger(false);

            if (positionY >= temp && trigger === false) setTrigger(true);
            if (positionY <= temp && trigger === true) setTrigger(false);
            if (selected.isScrolling && index === 0) {
              arr.map((item, index) => {
                focusTarget.current[index].measureLayout(
                  scrollRef.current,
                  (left, top, width, height) => {
                    if (
                      positionY > top - 100 &&
                      positionY < top + 30 &&
                      selected.idx !== index
                    ) {
                      setSelected({...selected, idx: index});
                    }
                  },
                );
              });
            }
          }}>
          <Header
            navigation={navigation}
            showLike={true}
            showShare={true}
            iconColor={'white'}
            title={''}
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              position: 'absolute',
              zIndex: 100,
            }}
          />
          <ImageSwipe />
          <MenuDesc />
          <View>
            {/* 메뉴, 정보, 리뷰 탭 */}
            <View
              style={{
                flexDirection: 'row',
                borderTopColor: colors.borderColor,
                height: 50,
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
                }}
                onPress={() => {
                  setIndex(0);
                }}>
                <Text>메뉴</Text>
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
                }}
                onPress={() => {
                  setIndex(1);
                }}>
                <Text>정보</Text>
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
                }}
                onPress={() => {
                  setIndex(2);
                }}>
                <Text>리뷰</Text>
              </Pressable>
            </View>
            {/* 메뉴 카테고리 토글 */}
            {index === 0 && (
              <View
                style={{
                  opacity: trigger ? 1 : 0,
                  backgroundColor: 'white',
                }}>
                <ScrollView
                  horizontal
                  hitSlop={20}
                  ref={scrollRefSub}
                  showsHorizontalScrollIndicator={false}>
                  {arr.map((item, index) => (
                    <Pressable
                      disabled={!trigger}
                      key={index}
                      ref={el => (chipTarget.current[index] = el)}
                      onPress={() => {
                        focusTarget.current[index].measureLayout(
                          scrollRef.current,
                          (left, top, width, height) => {
                            scrollRef.current.scrollTo({
                              y: top - 90,
                              animated: true,
                            });
                            console.log('position', left, top, width, height);
                          },
                        );

                        chipTarget.current[index].measureLayout(
                          scrollRefSub.current,
                          (left, top, width, height) => {
                            console.log('widht', width);
                            scrollRefSub.current.scrollTo({
                              x: left - layout.width / 3 - 10,

                              animated: true,
                            });
                          },
                        );
                        setSelected({idx: index, isScrolling: false});
                      }}
                      style={{
                        height: 35,
                        width: chipWidth,
                        backgroundColor:
                          selected.idx === index ? 'tomato' : 'gray',
                        margin: 10,
                        borderRadius: 30,
                      }}></Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          {index === 0 && (
            <>
              <View
                style={{flex: 1}}
                onLayout={e => {
                  setTemp(e.nativeEvent.layout.y - 100);
                }}>
                <View
                  style={{paddingHorizontal: 22, paddingBottom: 12, top: -10}}>
                  <TextRegular style={{fontSize: 15}}>
                    수제버거 맛나버거가 부산에 상륙했습니다! 소고기 패티에
                    신선한 야채와 치즈의 만남! 리뷰이벤트준비했으니 많이많이
                    참여해주세요!
                  </TextRegular>
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 20,
                    paddingHorizontal: 22,
                    backgroundColor: colors.couponBG,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 11,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Dot
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 8 / 2,
                        backgroundColor: colors.borderColor22,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'CoreGothicD-CoreGothicDBold',
                        color: colors.fontColor2,
                        fontSize: 22,
                        marginHorizontal: 14,
                      }}>
                      대표메뉴
                    </Text>
                    <Dot
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 8 / 2,
                        backgroundColor: colors.borderColor22,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    {arrTop.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          flex: 1,
                          padding: 22,
                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderColor: colors.primary,
                          marginBottom: 10,
                          borderRadius: 12,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              width: 80,
                              height: 80,
                              borderWidth: 1,
                              borderRadius: 10,
                              marginRight: 15,
                              borderColor: colors.borderColor,
                              overflow: 'hidden',
                            }}>
                            <FastImage
                              source={require('~/assets/dummy/CK_tica114m19040204_l.jpg')}
                              resizeMode={FastImage.resizeMode.cover}
                              style={{flex: 1}}
                            />
                          </View>
                          <View style={{flex: 1}}>
                            <TextMedium
                              style={{fontSize: 17, color: colors.fontColor2}}>
                              맵달맵달 리챔
                            </TextMedium>
                            <TextMedium
                              style={{fontSize: 15, color: colors.fontColor8}}>
                              계란+콘+모짜렐라치즈+리챔3장+ 핫스모크소스
                            </TextMedium>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                {arr.map((item, index) => (
                  <View
                    key={index}
                    ref={el => (focusTarget.current[index] = el)}
                    style={{
                      height: 400,
                      backgroundColor: index % 2 === 0 ? 'teal' : 'linen',
                    }}></View>
                ))}
              </View>
            </>
          )}

          {index === 1 && (
            <View style={{flex: 1}}>
              <View style={{height: 300}}>
                <Text>
                  수제버거 맛나버거가 부산에 상륙했습니다! 소고기 패티에 신선한
                  야채와 치즈의 만남! 리뷰이벤트준비했으니 많이많이
                  참여해주세요! 수제버거 맛나버거가 부산에 상륙했습니다! 소고기
                  패티에 신선한 야채와 치즈의 만남! 리뷰이벤트준비했으니
                  많이많이 참여해주세요!
                </Text>
              </View>
            </View>
          )}
          {index === 2 && (
            <View style={{flex: 1}}>
              <Text>리뷰페이지</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MenuDetail;
