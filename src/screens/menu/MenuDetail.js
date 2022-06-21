import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {set} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Header from '../../component/Header';
import MenuTopNavigator from '../../navigator/MenuTopNavigator';
import commonStyles from '../../styles/commonStyle';
import Test from '../../Test';

const MenuDetail = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);
  const [temp, setTemp] = useState();
  const [trigger, setTrigger] = useState(false);
  const [selected, setSelected] = useState({idx: '', isScrolling: false});
  const focusTarget = useRef([]);
  const scrollRef = useRef();
  const FirstRoute = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          opacity: trigger ? 1 : 0,
          backgroundColor: 'white',
        }}>
        <Pressable
          onPress={() => {
            setSelected({idx: 0, isScrolling: false});
            focusTarget.current[0].measureLayout(
              scrollRef.current,
              (left, top, width, height) => {
                scrollRef.current.scrollTo({
                  x: 0,
                  y: top - 90,
                  animated: true,
                });
                console.log('position', left, top, width, height);
              },
            );
          }}
          style={{
            flex: 1,
            backgroundColor: selected.idx === 0 ? 'tomato' : 'gray',
            margin: 10,
            borderRadius: 30,
          }}></Pressable>
        <Pressable
          onPress={() => {
            setSelected({idx: 1, isScrolling: false});
            focusTarget.current[1].measureLayout(
              scrollRef.current,
              (left, top, width, height) => {
                scrollRef.current.scrollTo({
                  x: 0,
                  y: top - 100,
                  animated: true,
                });
                console.log('position', left, top, width, height);
              },
            );
          }}
          style={{
            flex: 1,
            backgroundColor: selected.idx === 1 ? 'tomato' : 'gray',
            margin: 10,
            borderRadius: 30,
          }}></Pressable>
        <Pressable
          onPress={() => {
            setSelected({idx: 2, isScrolling: false});
            focusTarget.current[2].measureLayout(
              scrollRef.current,
              (left, top, width, height) => {
                scrollRef.current.scrollTo({
                  x: 0,
                  y: top - 100,
                  animated: true,
                });
                console.log('position', left, top, width, height);
              },
            );
          }}
          style={{
            flex: 1,
            backgroundColor: selected.idx === 2 ? 'tomato' : 'gray',
            margin: 10,
            borderRadius: 30,
          }}></Pressable>
        <Pressable
          onPress={() => {
            setSelected({idx: 3, isScrolling: false});
            focusTarget.current[3].measureLayout(
              scrollRef.current,
              (left, top, width, height) => {
                scrollRef.current.scrollTo({x: 0, y: top - 40, animated: true});
                console.log('position', left, top, width, height);
              },
            );
          }}
          style={{
            flex: 1,
            backgroundColor: selected.idx === 3 ? 'tomato' : 'gray',
            margin: 10,
            borderRadius: 30,
          }}></Pressable>
      </View>
      // <MenuTopNavigator></MenuTopNavigator>
      // <View style={{height: 100, width: 100, backgroundColor: 'teal'}}></View>
    );
  };

  const SecondRoute = () => {
    return <></>;
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  useEffect(() => {
    console.log('trigger ::', trigger);
  }, [trigger]);

  useEffect(() => {
    console.log('selected ::', selected);
  }, [selected]);

  return (
    <>
      <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
        <View>
          <Header
            navigation={navigation}
            title={''}
            style={{position: 'absolute', zIndex: 100}}
          />
          <>
            <ScrollView
              ref={scrollRef}
              stickyHeaderIndices={[4]}
              onScrollBeginDrag={e => {
                if (selected.isScrolling !== true) {
                  setSelected({...selected, isScrolling: true});
                }
              }}
              onScroll={e => {
                const positionY = e.nativeEvent.contentOffset.y;
                // console.log(e.nativeEvent.contentOffset);
                if (positionY >= temp && trigger === false) setTrigger(true);
                if (positionY <= temp && trigger === true) setTrigger(false);
                if (selected.isScrolling && index === 0) {
                  focusTarget.current[0].measureLayout(
                    scrollRef.current,
                    (left, top, width, height) => {
                      if (
                        positionY > top - 100 &&
                        positionY < top + 30 &&
                        // positionY < top + height - 100 &&
                        selected.idx !== 0
                      ) {
                        setSelected({...selected, idx: 0});
                        console.log('1', positionY);
                      }
                    },
                  );
                  focusTarget.current[1].measureLayout(
                    scrollRef.current,
                    (left, top, width, height) => {
                      if (
                        positionY > top - 100 &&
                        positionY < top + 30 &&
                        // positionY < top + height - 80 &&
                        selected.idx !== 1
                      ) {
                        setSelected({...selected, idx: 1});
                        console.log('2', positionY, top, height);
                      }
                    },
                  );
                  focusTarget.current[2].measureLayout(
                    scrollRef.current,
                    (left, top, width, height) => {
                      if (
                        positionY > top - 100 &&
                        positionY < top + 30 &&
                        selected.idx !== 2
                      ) {
                        setSelected({...selected, idx: 2});
                        console.log('3', positionY, top, height);
                      }
                    },
                  );
                  focusTarget.current[3].measureLayout(
                    scrollRef.current,
                    (left, top, width, height) => {
                      if (
                        positionY > top - 100 &&
                        positionY < top + 30 &&
                        selected.idx !== 3
                      ) {
                        setSelected({...selected, idx: 3});
                        console.log('4', positionY, top, height);
                      }
                    },
                  );
                }
              }}>
              <Swiper
                loop
                autoplay
                showsPagination={false}
                removeClippedSubviews={false}
                style={{height: 300}}>
                <View style={styles.slide1}>
                  <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide2}>
                  <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                  <Text style={styles.text}>And simple</Text>
                </View>
              </Swiper>
              <View
                style={{
                  flex: 1,
                  top: -50,
                  height: 200,
                  marginHorizontal: 20,
                  backgroundColor: 'gray',
                }}>
                <Text style={{fontSize: 30, textAlign: 'center'}}>TITLE</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  top: -40,
                  height: 40,
                  marginHorizontal: 20,
                  backgroundColor: 'gray',
                }}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>COUPONE</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  top: -30,
                  height: 200,
                  marginHorizontal: 20,
                  backgroundColor: 'gray',
                }}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>DETAIL</Text>
              </View>
              <TabView
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
              />
              {index === 0 && (
                <View
                  style={{flex: 1, top: -50}}
                  onLayout={e => {
                    setTemp(e.nativeEvent.layout.y - 100);
                  }}>
                  <View
                    ref={el => (focusTarget.current[0] = el)}
                    style={{height: 400, backgroundColor: 'teal'}}></View>
                  <View
                    ref={el => (focusTarget.current[1] = el)}
                    style={{height: 400, backgroundColor: 'linen'}}></View>
                  <View
                    ref={el => (focusTarget.current[2] = el)}
                    style={{height: 400, backgroundColor: 'pink'}}></View>
                  <View
                    ref={el => (focusTarget.current[3] = el)}
                    style={{height: 400, backgroundColor: 'tomato'}}></View>
                </View>
              )}
              {index === 1 && (
                <View style={{flex: 1}}>
                  <Text>
                    oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                  </Text>
                </View>
              )}
            </ScrollView>
          </>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MenuDetail;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
