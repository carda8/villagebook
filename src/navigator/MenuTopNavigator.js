import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Pressable} from 'react-native';
import MenuTopFirst from '../screens/menu/MenuTopFirst';

const Tab = createMaterialTopTabNavigator();

const MenuTopNavigator = ({navigation}) => {
  const tabRef = useRef(0);
  return (
    <>
      <Tab.Navigator
        // initialLayout={{height: 450}}
        // style={{height: 500}}
        initialRouteName="call11"
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: 'auto',
          },
          tabBarLabelStyle: {
            color: 'orange',
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
        }}>
        <Tab.Screen name="call11" component={MenuTopFirst} />
        <Tab.Screen name="call22" component={MenuTopFirst} />
        <Tab.Screen name="call33" component={MenuTopFirst} />
      </Tab.Navigator>
    </>
  );
};

export default MenuTopNavigator;
