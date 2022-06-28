import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setCurrent} from '../store/reducers/BottomBarReducer';

const BottomBar = ({navigation}) => {
  const {current} = useSelector(state => state.btBarReducer);
  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const width = layout.width / 5;
  return (
    <View style={{...styles.bottomBar}}>
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
        }}
        onPress={() => {
          // dispatch(setCurrent(1));
          navigation.navigate('LikeMain');
        }}>
        <Image
          source={
            current === 1
              ? require('~/assets/bottom_ic02_on.png')
              : require('~/assets/bottom_ic02_on.png')
          }
          style={{width, height: 60}}
          resizeMode="contain"
        />
      </Pressable>
      <Pressable
        style={{flex: 1, alignItems: 'center'}}
        onPress={() => {
          // dispatch(setCurrent(2));
          navigation.navigate('OrderList');
        }}>
        <Image
          source={
            current === 2
              ? require('~/assets/bottom_ic03_on.png')
              : require('~/assets/bottom_ic03_on.png')
          }
          style={{width, height: 60}}
          resizeMode="contain"
        />
      </Pressable>
      <Pressable
        style={{flex: 1, alignItems: 'center'}}
        onPress={() => {
          dispatch(setCurrent(0));
          navigation.navigate('Main');
        }}>
        <Image
          source={require('~/assets/bottom_ic06.png')}
          resizeMode="contain"
          style={{width, height: 60}}
        />
      </Pressable>
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          dispatch(setCurrent(3));
          navigation.navigate('DiscountMain');
        }}>
        <Image
          source={
            current === 3
              ? require('~/assets/bottom_ic04_on.png')
              : require('~/assets/bottom_ic04_on.png')
          }
          style={{width, height: 60}}
          resizeMode="contain"
        />
      </Pressable>
      <Pressable
        style={{flex: 1, alignItems: 'center'}}
        onPress={() => {
          dispatch(setCurrent(4));
          navigation.navigate('MyPage');
        }}>
        <Image
          source={
            current === 4
              ? require('~/assets/bottom_ic05_on.png')
              : require('~/assets/bottom_ic05_on.png')
          }
          resizeMode="contain"
          style={{width, height: 60}}
        />
      </Pressable>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: 60,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    ...Platform.select({
      android: {elevation: 8},
      ios: {
        shadowColor: '#00000029',
        shadowOpacity: 0.6,
        shadowRadius: 50 / 2,
        shadowOffset: {
          height: 12,
          width: 0,
        },
      },
    }),
  },
});
