import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {View, Animated} from 'react-native';
import Header from '../component/Header';
import CallMain from '../screens/call/CallMain';

const Tab = createMaterialTopTabNavigator();

const CallTopNavigator = ({navigation}) => {
  return (
    <>
      <Header title={'CALL 메인'} navigation={navigation} />

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
          tabBarIndicator: props => {
            console.log(props);
            // props.position.addListener(value => {
            //   console.log('value', value);
            // });
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
            console.log('arr', arr);

            const _getToValue = idx => {
              let temp = 0;
              for (let i = 0; i <= idx; i++) {
                temp += arr[i];
              }
              return temp;
            };

            let animation = new Animated.Value(_getToValue(index - 1));
            console.log(
              'index',
              index,
              'get to value',
              _getToValue(index),
              'arr idx',
              arr[index],
              'animation val',
              animation,
            );
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
                }}></Animated.View>
            );
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
            alignSelf: 'center',
            height: 30,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: 'teal',
            justifyContent: 'center',
          },
        }}>
        <Tab.Screen name="CallMain" component={CallMain} />
        <Tab.Screen name="CallMain22222" component={CallMain} />
        <Tab.Screen name="CallMain3" component={CallMain} />
        <Tab.Screen name="CallMain4" component={CallMain} />

        {/* <Tab.Screen name="CallSec" component={CallSec} />
      <Tab.Screen name="CallThrid" component={CallThrid} />
      <Tab.Screen name="CallFourth" component={CallFourth} />
      <Tab.Screen name="CallFifth" component={CallFifth} /> */}
      </Tab.Navigator>
    </>
  );
};

export default CallTopNavigator;
