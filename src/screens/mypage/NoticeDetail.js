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
  const [HEIGHT, setHEIGHT] = useState({height: 0, rate: 0});
  console.log('route', route.params);
  const layout = useWindowDimensions();

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
          <TextBold style={{color: colors.fontColor2}}>공지</TextBold>
          <TextRegular style={{fontSize: 11, color: colors.fontColorA2}}>
            {dayjs().format('YYYY-MM-DD')}
          </TextRegular>
        </View>
        <View style={{paddingHorizontal: 22, paddingTop: 22}}>
          <TextRegular>{'테스트 메시지'}</TextRegular>
          <TextRegular>{'테스트 메시지'}</TextRegular>
          <TextRegular>{'테스트 메시지'}</TextRegular>
        </View>

        <Image
          source={require('~/assets/banner1.png')}
          onLoad={e => {
            setHEIGHT({
              height: e.nativeEvent.source.height,
              rate: layout.width / e.nativeEvent.source.width,
            });
          }}
          style={{
            width: layout.width,
            height: HEIGHT.height ? HEIGHT.height * HEIGHT.rate : 100,
            backgroundColor: 'red',
          }}
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NoticeDetail;
