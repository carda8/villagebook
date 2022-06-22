import axios from 'axios';
import React, {useEffect} from 'react';
import {Linking, View} from 'react-native';
import {Pressable, Text} from 'react-native';
import NaverMapView from 'react-native-nmap';
import {Polygon} from 'react-native-nmap';
import {Circle} from 'react-native-nmap';
import {Polyline} from 'react-native-nmap';
import {Path} from 'react-native-nmap';
import {Marker} from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import commonStyles from '../../styles/commonStyle';

const Main = ({navigation}) => {
  const NaverMap = () => {
    const P0 = {latitude: 37.564362, longitude: 126.977011};
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const P2 = {latitude: 37.565383, longitude: 126.976292};

    return (
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={true}
        center={{...P0, zoom: 16}}
        onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
        <Marker
          coordinate={P1}
          pinColor="blue"
          onClick={() => console.warn('onClick! p1')}
        />
        <Marker
          coordinate={P2}
          pinColor="red"
          onClick={() => console.warn('onClick! p2')}
        />
        <Path
          coordinates={[P0, P1]}
          onClick={() => console.warn('onClick! path')}
          width={10}
        />
        <Polyline
          coordinates={[P1, P2]}
          onClick={() => console.warn('onClick! polyline')}
        />
        <Circle
          coordinate={P0}
          color={'rgba(255,0,0,0.3)'}
          radius={200}
          onClick={() => console.warn('onClick! circle')}
        />
        <Polygon
          coordinates={[P0, P1, P2]}
          color={`rgba(0, 0, 0, 0.5)`}
          onClick={() => console.warn('onClick! polygon')}
        />
      </NaverMapView>
    );
  };

  useEffect(() => {
    // _getData();
  }, []);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'메인'} navigation={navigation} />
      <NaverMap />
      <View
        style={{
          height: 200,
          padding: 10,
          paddingBottom: 20,
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={() => {
            // Linking.Linking.openURL('nmap://map?&appname=com.OrderBook');
            // navigation.navigate('CallTopNavigator', {routeIdx: 'Call1'});
          }}
          style={{
            flex: 1,
            backgroundColor: 'orange',
            marginRight: 10,
          }}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('CallTopNavigator', {routeIdx: 'Call2'});
          }}
          style={{flex: 1, backgroundColor: 'tomato'}}
        />
      </View>
      <View
        style={{
          height: 200,
          padding: 10,
          paddingBottom: 20,
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('CallTopNavigator', {routeIdx: 'Call5'});
          }}
          style={{
            flex: 1,
            backgroundColor: 'tomato',
            marginRight: 10,
          }}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('CallTopNavigator', {routeIdx: 'Call6'});
          }}
          style={{flex: 1, backgroundColor: 'tomato'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Main;
