import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
} from 'react-native';
import {color} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Header from '../../../component/Header';
import TextRegular from '../../../component/text/TextRegular';
import TextSBold from '../../../component/text/TextSBold';
import Category from '../../../config/Category';
import Filter from '../../../config/Filter';
import {
  setcurrentCategory,
  setcurrentFilter,
} from '../../../store/reducers/CategoryReducer';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyle';
import FilterView from './FilterView';
import StoreItems from './StoreItems';

const Tab = createMaterialTopTabNavigator();

const StoreList = ({navigation, route}) => {
  const routeIdx = route.params?.routeIdx ?? '메뉴';
  const cate = route.params?.category;
  const dispatch = useDispatch();

  const tabRef = useRef(0);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header category={true} navigation={navigation} />
      <FilterView />
      <Tab.Navigator
        backBehavior="none"
        initialRouteName={routeIdx}
        screenListeners={{
          state: e => {
            // console.log('state e', e.target, e.data);
          },
          focus: e => {
            let temp = e.target.split('-');
            dispatch(setcurrentCategory(temp[0]));
            dispatch(setcurrentFilter(0));
            // setHeaderTitle(temp[0])
          },
        }}
        sceneContainerStyle={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: 45,
          paddingHorizontal: 22,
        }}
        style={{flex: 1}}
        screenOptions={({route}) => ({
          lazy: true,
          tabBarStyle: {
            paddingLeft: 22,
          },
          tabBarLabel: props => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Pretendard-Bold',
                  // : 'Pretendard-Medium',
                  color: props.focused ? colors.primary : colors.fontColor2,
                }}>
                {route.name}
              </Text>
            </View>
          ),
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            flexGrow: 2,
            width: 'auto',
          },
          tabBarIndicatorStyle: {
            height: 30,
          },
          tabBarIndicatorContainerStyle: {
            justifyContent: 'flex-end',
            paddingLeft: 22,
          },
          tabBarIndicator: props => {
            props.position.addListener(value => {
              if (props.state.index <= value.value)
                tabRef.current = props.state.index;
            });
            let arr = [];
            const index = props.state.index;
            const tabWidth = props.getTabWidth(index);
            const _getWidth = idx => {
              return props.getTabWidth(idx);
            };
            props.state.routes.map((item, idx) => {
              if (idx === 0) arr.push(0);
              else arr.push(_getWidth(idx - 1));
            });

            const _getToValue = idx => {
              let temp = 0;
              for (let i = 0; i <= idx; i++) {
                temp += arr[i];
              }
              return temp;
            };
            let animation = new Animated.Value(_getToValue(tabRef.current));
            Animated.spring(animation, {
              toValue: _getToValue(index),
              duration: 800,
              friction: 10,
              tension: 20,
              useNativeDriver: true,
            }).start();
            return (
              <>
                <Animated.View
                  style={{
                    transform: [{translateX: animation}],
                    width: tabWidth * 0.9,
                    marginHorizontal: tabWidth * 0.05,
                    backgroundColor: colors.primary,
                    height: 3,
                  }}
                />
              </>
            );
          },
        })}>
        {Category[cate].map((item, index) => (
          <Tab.Screen
            key={item + index}
            name={item}
            component={StoreItems}
            initialParams={{cate: item}}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default StoreList;
