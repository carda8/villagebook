import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import commonStyles from '../../styles/commonStyle';
import TextBold from '../../component/text/TextBold';
import TextRegular from '../../component/text/TextRegular';
import colors from '../../styles/colors';
import dayjs from 'dayjs';

const NoticeDetail = ({navigation, route}) => {
  const routeData = route.params.data;
  const [HEIGHT, setHEIGHT] = useState({height: 0, rate: 0});
  const layout = useWindowDimensions();
  console.log('route', routeData);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'공지사항'} navigation={navigation} showCart={true} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            height: 70,
            paddingHorizontal: 22,
            paddingVertical: 10,
            justifyContent: 'space-between',
          }}>
          <TextBold style={{color: colors.fontColor2}}>
            {routeData.subject}
          </TextBold>
          <TextRegular style={{fontSize: 11, color: colors.fontColorA2}}>
            {routeData.datetime}
          </TextRegular>
        </View>
        {routeData?.pic.map((item, index) => (
          <Image
            key={index}
            source={{uri: item.file}}
            onLoad={e => {
              setHEIGHT({
                height: e.nativeEvent.source.height,
                rate: layout.width / e.nativeEvent.source.width,
              });
            }}
            style={{
              width: layout.width,
              height: HEIGHT.height ? HEIGHT.height * HEIGHT.rate : 100,
            }}
            resizeMode="contain"
          />
        ))}
        <View style={{paddingHorizontal: 22, paddingTop: 22}}>
          <TextRegular>{routeData.content}</TextRegular>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NoticeDetail;
