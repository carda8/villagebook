import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import NaverMapView from 'react-native-nmap';
import {Marker} from 'react-native-nmap';
import colors from '../../styles/colors';

const MiniMap = ({lng, lat, isStore, width, height}) => {
  const layout = useWindowDimensions();
  return (
    <View
      style={{
        paddingHorizontal: isStore ? 0 : 22,
      }}>
      <NaverMapView
        style={{width: width ? width : '100%', height: height ? height : 300}}
        showsMyLocationButton={isStore ? false : true}
        zoomControl={isStore ? false : true}
        scaleBar={false}
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
          width={25}
          height={30}
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
