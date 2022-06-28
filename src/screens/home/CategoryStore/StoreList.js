import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../component/Header';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyle';
import SubCategory from './SubCategory';

const Tab = createMaterialTopTabNavigator();

const StoreList = ({navigation, route}) => {
  const tabRef = useRef(0);
  const routeIdx = route.params?.routteIdx ?? 'Menu1';

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={String(routeIdx)} navigation={navigation} />
      <Tab.Navigator
        initialRouteName={routeIdx}
        sceneContainerStyle={{flex: 1, backgroundColor: 'white'}}
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: 'auto',
          },
          tabBarLabelStyle: {
            fontFamily: 'Pretendard-Bold',
            fontSize: 15,
            color: colors.primary,
          },
          tabBarIndicatorStyle: {
            height: 30,
          },
          tabBarIndicatorContainerStyle: {
            justifyContent: 'flex-end',
            width: 'auto',
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
              duration: 200,
              friction: 10,
              tension: 100,
              useNativeDriver: true,
            }).start();
            return (
              <Animated.View
                style={{
                  transform: [{translateX: animation}],
                  width: tabWidth * 0.9,
                  marginHorizontal: tabWidth * 0.05,
                  backgroundColor: colors.primary,
                  height: 3,
                }}
              />
            );
          },
        }}>
        <Tab.Screen name="Menu1" component={SubCategory} />
        <Tab.Screen name="Menu2" component={SubCategory} />
        <Tab.Screen name="Menu3" component={SubCategory} />
        <Tab.Screen name="Menu4" component={SubCategory} />
        <Tab.Screen name="Menu5" component={SubCategory} />
        <Tab.Screen name="Menu6" component={SubCategory} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default StoreList;
