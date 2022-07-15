import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import TextBold from '../../component/text/TextBold';
import Header from '../../component/Header';
import {Input} from '../../component/Input';
import {Button} from '../../component/Button';

const FindUserAccount = ({navigation, route}) => {
  const routeData = route.params?.target;
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={routeData} navigation={navigation} />
      <View style={{paddingHorizontal: 22}}>
        <TextBold>휴대폰 인증</TextBold>
        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 7}}>
          <Input flex={1} placeholder={'휴대폰 번호를 입력해주세요.'} />
          <Button borderWidth={1} text="인증번호" />
        </View>
        <Input placeholder={'인증번호를 입력해주세요.'} />

        <View style={{height: 50, marginTop: 30}}>
          <Button
            flex={1}
            text={'다음'}
            onPress={() =>
              navigation.navigate('ResetAccount', {target: routeData})
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FindUserAccount;
