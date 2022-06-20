import React, {useRef, useState} from 'react';
import {
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
import MenuTopNavigator from '../../navigator/MenuTopNavigator';
import commonStyles from '../../styles/commonStyle';
import Test from '../../Test';

const MenuDetail = ({navigation}) => {
  const layout = useWindowDimensions();
  const FirstRoute = () => {
    return <MenuTopNavigator></MenuTopNavigator>;
  };
  const SecondRoute = () => {
    return <View style={{flex: 1, backgroundColor: 'orange'}}></View>;
  };
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const [temp, setTemp] = useState();
  const tempRef = useRef();

  return (
    <>
      <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
        <Header
          navigation={navigation}
          title={''}
          style={{position: 'absolute', zIndex: 100}}
        />
        <ScrollView
          stickyHeaderIndices={[4]}
          StickyHeaderComponent={() => {
            return <View style={{height: 100, backgroundColor: 'teal'}}></View>;
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
          <View
            onLayout={e => {
              if (!tempRef.current) tempRef.current = e.nativeEvent.layout.y;
              console.log(e.nativeEvent.layout);
            }}>
            <TabView
              swipeEnabled
              style={{height: 1000}}
              renderScene={renderScene}
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
          </View>
        </ScrollView>
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
