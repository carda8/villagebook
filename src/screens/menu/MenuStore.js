import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import commonStyles from '../../styles/commonStyle';
import CallMain from '../call/CallMain';
import MenuMain from './MenuMain';

const Tab = createMaterialTopTabNavigator();

const MenuStroe = ({navigation}) => {
  const tabRef = useRef(0);
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'MENU 메인'} navigation={navigation} />
      <Tab.Navigator
        initialRouteName="CallMain"
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: 'auto',
          },
          tabBarLabelStyle: {
            color: 'red',
          },
          tabBarIndicatorStyle: {
            height: 30,
          },
          tabBarIndicatorContainerStyle: {
            justifyContent: 'center',
            width: 'auto',
          },
          tabBarIndicator: props => {
            // console.log('props ::', props.);
            props.position.addListener(value => {
              // if (Math.floor(value.value) !== props.state.index)
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
            // console.log('arr', arr);
            // console.log('index', index);
            const _getToValue = idx => {
              let temp = 0;
              for (let i = 0; i <= idx; i++) {
                temp += arr[i];
              }
              return temp;
            };
            // _getToValue(
            //   tabRef.current - index >= 2 || index - tabRef.current >= 2
            //     ? index
            //     : tabRef.current,
            // ),
            let animation = new Animated.Value(_getToValue(tabRef.current));
            Animated.spring(animation, {
              toValue: _getToValue(index),
              duration: 2000,
              friction: 10,
              tension: 3,
              useNativeDriver: true,
            }).start();
            return (
              <Animated.View
                style={{
                  transform: [{translateX: animation}],
                  width: tabWidth * 0.9,
                  marginHorizontal: tabWidth * 0.05,
                  backgroundColor: 'black',
                  borderRadius: 20,
                  height: 35,
                }}
              />
            );
          },
        }}
      >
        <Tab.Screen name="Call1" component={MenuMain} />
        <Tab.Screen name="Call2" component={MenuMain} />
        <Tab.Screen name="Call3" component={MenuMain} />
        <Tab.Screen name="Call4" component={MenuMain} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MenuStroe;
