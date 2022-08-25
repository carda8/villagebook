import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import SearchBox from '../../component/mainScreen/SearchBox';
import commonStyles from '../../styles/commonStyle';
import SearchList from './SearchList';
import colors from '../../styles/colors';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useSelector} from 'react-redux';

const SearchResult = ({navigation, route}) => {
  const routeData = route.params;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const {keyword} = useSelector(state => state.searchReducer);
  console.log('Search Route', route.params);

  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SearchList navigation={navigation} JType={'food'} />
    </View>
  );

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SearchList navigation={navigation} JType={'market'} />
    </View>
  );

  const ThirdRoute = () => (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SearchList navigation={navigation} JType={'lifestyle'} />
    </View>
  );

  const renderScene = SceneMap(
    routeData?.category === 'food'
      ? {food: FirstRoute}
      : routeData?.category === 'market'
      ? {market: SecondRoute}
      : routeData?.category === 'lifestyle'
      ? {lifestyle: ThirdRoute}
      : {
          food: FirstRoute,
          market: SecondRoute,
          lifestyle: ThirdRoute,
        },
  );

  const [routes] = useState(
    routeData?.category === 'food'
      ? [{key: 'food', title: '맛집'}]
      : routeData?.category === 'market'
      ? [{key: 'market', title: '마켓'}]
      : routeData?.category === 'lifestyle'
      ? [{key: 'lifestyle', title: '편의'}]
      : [
          {key: 'food', title: '맛집'},
          {key: 'market', title: '마켓'},
          {key: 'lifestyle', title: '편의'},
        ],
  );

  useEffect(() => {
    setIndex(0);
  }, [keyword]);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'검색'} navigation={navigation} />
      <View style={{paddingHorizontal: 22}}>
        <View>
          <SearchBox navigation={navigation} category={routeData.category} />
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        sceneContainerStyle={{paddingHorizontal: 22}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: routeData?.category
                ? colors.borderColor
                : 'black',
            }}
            labelStyle={{color: 'black'}}
            indicatorContainerStyle={{alignItems: 'center'}}
            style={{
              backgroundColor: 'white',
              fontWeight: 'bold',
              shadowOffset: {height: 0, width: 0},
              shadowColor: 'transparent',
            }}
            pressColor={'transparent'}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    height: 40,
    marginTop: 13,
  },
  tabItemContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    borderBottomColor: colors.borderColor22,
    width: 70,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 9,
  },
});

{
  /* <View
          style={{
            ...styles.tabContainer,
          }}>
          <Pressable
            style={{
              ...styles.tabItemContainer,
            }}
            onPress={() => {
              setTabIdx(0);
              _getList('food');
            }}>
            <View
              style={{
                borderBottomWidth: tabIdx === 0 ? 2 : 0,
                ...styles.tabItem,
              }}>
              <Text
                style={{
                  color: tabIdx === 0 ? colors.fontColor2 : colors.fontColorA2,
                }}>
                맛집
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={{
              ...styles.tabItemContainer,
            }}
            onPress={() => {
              setTabIdx(1);
              _getList('market');
            }}>
            <View
              style={{
                borderBottomWidth: tabIdx === 1 ? 2 : 0,
                ...styles.tabItem,
              }}>
              <Text
                style={{
                  color: tabIdx === 1 ? colors.fontColor2 : colors.fontColorA2,
                }}>
                마켓
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={{
              ...styles.tabItemContainer,
            }}
            onPress={() => {
              setTabIdx(2);
            }}>
            <View
              style={{
                borderBottomWidth: tabIdx === 2 ? 2 : 0,
                ...styles.tabItem,
              }}>
              <Text
                style={{
                  color: tabIdx === 2 ? colors.fontColor2 : colors.fontColorA2,
                }}>
                편의
              </Text>
            </View>
          </Pressable>
        </View> */
}
{
  /* <SearchList navigation={navigation} /> */
}
