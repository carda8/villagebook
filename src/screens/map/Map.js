import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
import NaverMapView from 'react-native-nmap';
import {Marker} from 'react-native-nmap';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import {View} from 'react-native';
import {TextInput} from 'react-native';

const Map = ({navigation, route}) => {
  const routeData = route.params?.data ?? 'no data';
  console.log('ROUTE DATA ::', routeData);
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });
  const [mapInit, setMapInit] = useState(false);
  const [converted, setConverted] = useState();
  const layout = useWindowDimensions();

  const requestPermissions = async callback => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    callback();
  };

  const _getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setPosition({latitude: latitude, longitude: longitude});
        setMapInit({latitude: latitude, longitude: longitude});
        // console.log('cur location', latitude, longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const _convertCoor = ({lon, lat}) => {
    axios
      .get(
        `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lon},${lat}&sourcecrs=epsg:4326&orders=roadaddr&output=json`,
        {
          headers: {
            'X-NCP-APIGW-API-KEY-ID': 'xrlljtjdfz',
            'X-NCP-APIGW-API-KEY': 'q4OXI3sMewxtgAn6iWrN5Meiluu1GAegJVKlmxwT',
          },
        },
      )
      .then(result => {
        console.log('Conversion ::', result);
        setConverted(result.data.results[0]);
      })
      .catch(err => console.error('Conversion Err ::', err));
  };

  useEffect(() => {
    requestPermissions(_getCurrentLocation);
  }, []);

  if (!mapInit) return <ActivityIndicator style={{flex: 1}} />;

  return (
    <SafeAreaView>
      <Header title={'주소 설정'} navigation={navigation} />
      <NaverMapView
        style={{width: '100%', height: layout.height - 190}}
        showsMyLocationButton={true}
        center={{...mapInit, zoom: 16}}
        // scrollGesturesEnabled={false}
        tiltGesturesEnabled={false}
        rotateGesturesEnabled={false}
        onCameraChange={e => {
          setPosition({latitude: e.latitude, longitude: e.longitude});
          _convertCoor({lon: e.longitude, lat: e.latitude});
        }}
        onMapClick={e => {
          setPosition({latitude: e.latitude, longitude: e.longitude});
          _convertCoor({lon: e.longitude, lat: e.latitude});
          // setPosition({latitude: e.latitude, longitude: e.longitude});
        }}
      >
        <Marker
          animateToCoordinate={e => {
            console.log('anime', e);
          }}
          coordinate={position}
          onClick={() => console.log('onClick! p0')}
        />
      </NaverMapView>
      <View
        style={{
          width: '100%',
          height: 170,
          zIndex: 100,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: 'linen',
          padding: 20,
        }}
      >
        <Text style={{fontSize: 15}}>
          {console.log(converted)}
          {converted
            ? `${converted.region.area1.name} ${converted.region.area2.name} ${converted.land.name} ${converted.land.number1}`
            : '앗! 주소를 찾을 수 없어요!'}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('AddressSearch');
          }}
          style={{
            backgroundColor: 'white',
            alignSelf: 'flex-start',
            borderRadius: 10,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>주소 직접 입력</Text>
        </Pressable>
        <TextInput
          autoCapitalize={'none'}
          placeholder={'상세주소 입력'}
          style={{
            backgroundColor: 'white',
            marginVertical: 10,
            borderRadius: 10,
            padding: 5,
          }}
        ></TextInput>
      </View>
    </SafeAreaView>
  );
};

export default Map;
