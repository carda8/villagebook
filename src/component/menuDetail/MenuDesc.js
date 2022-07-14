import React from 'react';
import {
  Image,
  Linking,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import colors from '../../styles/colors';
import Divider from '../Divider';
import ReviewSimple2 from '../reviews/ReviewSimple2';
import TextLight from '../text/TextLight';
import MenuDescTab from './MenuDescTab';

const MenuDesc = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const FirstRoute = () => (
    <View style={{flexGrow: 1, backgroundColor: '#ff4081'}}>
      <Text>123</Text>
    </View>
  );

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#673ab7'}}>
      <Text>123</Text>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  console.log('MenuDesc rendered');
  return (
    <>
      <View
        style={{
          top: -40,
          width: 81,
          height: 81,
          marginHorizontal: 22,
          borderRadius: 30,
          backgroundColor: colors.storeIcon,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('~/assets/ico_star_on.png')}
          resizeMode="contain"
          style={{flex: 1}}
        />
      </View>
      <View style={{top: -27}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 22,
          }}>
          <View>
            <Text style={{fontSize: 22}}>맛나버거 부산대점(test)</Text>
            <ReviewSimple2 />
          </View>

          <View style={{}}>
            <Pressable
              onPress={() => {
                Linking.openURL('tel:01042613948');
              }}
              style={{
                width: 51,
                height: 51,
                borderRadius: 51 / 2,
                borderWidth: 1,
                borderColor: colors.colorE3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('~/assets/ico_call.png')}
                resizeMode="contain"
                style={{width: 25, height: 25}}
              />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.couponBG,
            marginHorizontal: 22,
            height: 50,
            borderRadius: 8,
            marginTop: 19,
          }}>
          <Text
            style={{fontWeight: 'bold', fontSize: 15, color: colors.primary}}>
            이 매장의 할인 쿠폰받기
          </Text>
        </Pressable>
        <MenuDescTab />
      </View>
    </>
  );
};

export default React.memo(MenuDesc);
