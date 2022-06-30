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
import Header from '../../../component/Header';
import TextBold from '../../../component/text/TextBold';
import TextMedium from '../../../component/text/TextMedium';
import TextRegular from '../../../component/text/TextRegular';
import TextSBold from '../../../component/text/TextSBold';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyle';
import StoreItems from './StoreItems';

const Tab = createMaterialTopTabNavigator();

const StoreList = ({navigation, route}) => {
  const tabRef = useRef(0);
  const layout = useWindowDimensions();
  const routeIdx = route.params?.routteIdx ?? 'Menu1';
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const [selectedFilter, setSelectedFilter] = useState(0);

  useEffect(() => {
    console.log('sel', selectedFilter);
  }, [selectedFilter]);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={String(routeIdx)} navigation={navigation} />

      <View
        style={{
          flex: 1,
          height: 40,
          zIndex: 100,
          top: 110,
          position: 'absolute',
          minWidth: layout.width,
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center', marginLeft: 22}}>
          {arr.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setSelectedFilter(index);
              }}
              style={{
                height: 30,
                backgroundColor:
                  selectedFilter === index ? colors.primary : 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 18,
                paddingHorizontal: 13,
                marginRight: 10,
              }}>
              {selectedFilter === index ? (
                <TextSBold
                  style={{
                    color:
                      selectedFilter === index ? 'white' : colors.fontColorA2,
                  }}>
                  기본순
                </TextSBold>
              ) : (
                <TextRegular>기본순</TextRegular>
              )}
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Tab.Navigator
        initialRouteName={routeIdx}
        sceneContainerStyle={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: 45,
          paddingHorizontal: 22,
        }}
        style={{flex: 1}}
        screenOptions={({route}) => ({
          lazy: true,
          tabBarStyle: {paddingLeft: 22},
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
              duration: 200,
              friction: 10,
              tension: 100,
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
        <Tab.Screen
          name="1인분"
          component={StoreItems}
          initialParams={{cate: '1인분'}}
        />
        <Tab.Screen name="돈까스/회/일식" component={StoreItems} />
        <Tab.Screen name="중식" component={StoreItems} />
        <Tab.Screen name="치킨" component={StoreItems} />
        <Tab.Screen name="카페/디저트" component={StoreItems} />
        <Tab.Screen name="일식" component={StoreItems} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default StoreList;
