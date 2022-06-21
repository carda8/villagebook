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
import commonStyles from '../../styles/commonStyle';
import Test from '../../Test';

const MenuDetail = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
        <ScrollView
          horizontal
          hitSlop={20}
          showsHorizontalScrollIndicator={false}>
          {arr.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                focusTarget.current[index].measureLayout(
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
                setSelected({idx: index, isScrolling: false});
              }}
              style={{
                height: 35,
                width: 50,
                backgroundColor: selected.idx === index ? 'tomato' : 'gray',
                margin: 10,
                borderRadius: 30,
              }}></Pressable>
          ))}
        </ScrollView>
      </View>
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
                          console.log('1', positionY);
                        }
                      },
                    );
                  });
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
              />
              {index === 0 && (
                <View
                  style={{flex: 1, top: -50}}
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
