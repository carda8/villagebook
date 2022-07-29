import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import NaverMapView from 'react-native-nmap';
import {Marker} from 'react-native-nmap';
import colors from '../../styles/colors';

const MiniMap = ({lng, lat}) => {
  const layout = useWindowDimensions();
  return (
    <View
      style={{
        paddingHorizontal: 22,
      }}>
      <NaverMapView
        style={{width: '100%', height: 300}}
        showsMyLocationButton={true}
        center={{latitude: Number(lat), longitude: Number(lng), zoom: 16}}
        // scrollGesturesEnabled={false}
        tiltGesturesEnabled={false}
        rotateGesturesEnabled={false}
        onCameraChange={e => {
          //   setPosition({latitude: e.latitude, longitude: e.longitude});
          //   _convertCoor({lon: e.longitude, lat: e.latitude});
        }}
        onMapClick={e => {
          //   setPosition({latitude: e.latitude, longitude: e.longitude});
          //   _convertCoor({lon: e.longitude, lat: e.latitude});
          // setPosition({latitude: e.latitude, longitude: e.longitude});
        }}>
        <Marker
          animateToCoordinate={e => {
            console.log('anime', e);
          }}
          coordinate={{latitude: Number(lat), longitude: Number(lng)}}
          onClick={() => console.log('onClick! p0')}
        />
      </NaverMapView>
    </View>
  );
};

export default MiniMap;
