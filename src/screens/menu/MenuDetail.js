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
import MenuSubs from '../../component/menuDetail/MenuSubs';
import commonStyles from '../../styles/commonStyle';

const MenuDetail = ({navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);
  const [temp, setTemp] = useState();
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

  // const FirstRoute = () => {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         flexDirection: 'row',
  //         opacity: trigger ? 1 : 0,
  //         backgroundColor: 'white',
  //       }}>
  //       <ScrollView
  //         horizontal
  //         hitSlop={20}
  //         showsHorizontalScrollIndicator={false}>
  //         {arr.map((item, index) => (
  //           <Pressable
  //             key={index}
  //             onPress={() => {
  //               focusTarget.current[index].measureLayout(
  //                 scrollRef.current,
  //                 (left, top, width, height) => {
  //                   scrollRef.current.scrollTo({
  //                     x: 0,
  //                     y: top - 90,
  //                     animated: true,
  //                   });
  //                   console.log('position', left, top, width, height);
  //                 },
  //               );
  //               setSelected({idx: index, isScrolling: false});
  //             }}
  //             style={{
  //               height: 35,
  //               width: 50,
  //               backgroundColor: selected.idx === index ? 'tomato' : 'gray',
  //               margin: 10,
  //               borderRadius: 30,
  //             }}></Pressable>
  //         ))}
  //       </ScrollView>
  //     </View>
  //   );
  // };

  // const SecondRoute = () => {
  //   return <></>;
  // };

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // });
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
        <Header navigation={navigation} title={''} />
        <ScrollView
          ref={scrollRef}
          stickyHeaderIndices={[2]}
          // contentOffset={{x: 0, y: 100}}
          onScrollBeginDrag={e => {
            if (selected.isScrolling !== true) {
              setSelected({...selected, isScrolling: true});
            }
          }}
          onScroll={e => {
            const positionY = e.nativeEvent.contentOffset.y;
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
          <ImageSwipe />
          <MenuSubs />

          {/* <Pressable
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'teal',
              position: 'absolute',
              top: 200,
            }}
            onPress={() => {
              setIndex(index + 1);
            }}></Pressable> */}

          {/* <TabView
              swipeEnabled={false}
              renderScene={renderScene}
              style={{
                height: 100,
              }}
              navigationState={{index, routes}}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  indicatorStyle={{
                    backgroundColor: 'rgb(240, 80, 20)',
                  }}
                  labelStyle={{color: 'black'}}
                  style={{
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                    shadowOffset: {height: 0, width: 0},
                    shadowColor: 'transparent',
                  }}
                  pressColor={'transparent'}
                />
              )}
              onIndexChange={setIndex}
            /> */}
          <View>
            {/* 메뉴, 정보, 리뷰 탭 */}
            <View
              style={{
                flexDirection: 'row',
                height: 50,
              }}>
              <Pressable
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderTopWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
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
                  borderTopWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
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
                  borderTopWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
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
                <Text>정보페이지</Text>
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
