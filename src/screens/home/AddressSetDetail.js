import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useState} from 'react';
import colors from '../../styles/colors';
import TextBold from '../../component/text/TextBold';
import TextRegular from '../../component/text/TextRegular';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import {useDispatch, useSelector} from 'react-redux';
import {setPostData} from '../../store/reducers/AddressReducer';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {customAlert} from '../../component/CustomAlert';

const AddressSetDetail = ({navigation, route}) => {
  const addrData = route.params?.addData;
  const [text, setText] = useState('');
  const {postData} = useSelector(state => state.addressReducer);
  const {mutateInsertMainAddr} = useCustomMutation();
  const {userInfo} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  console.log('addrData', addrData);

  const _insertAddr = () => {
    const data = {
      mt_id: userInfo.mt_id,
      ad_zip: addrData.zonecode,
      //도로명 주소 우선 없다면 지번 주소 입력
      ad_addr1:
        addrData.address ??
        addrData.roadAddress ??
        addrData.autoJibunAddress ??
        addrData.jibunAddress,
      ad_addr2: text,
      ad_addr3: '',
      ad_latitude: '',
      ad_longitude: '',
    };

    mutateInsertMainAddr.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true') {
          customAlert('알림', '배송지 등록이 완료되었습니다.');
          navigation.navigate('Main');
        } else {
          customAlert('알림', '배송지 등록을 실패하였습니다.');
        }
        console.log('e', e);
      },
    });
  };

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'상세 주소 입력'} navigation={navigation} />
      <View style={{paddingHorizontal: 22}}>
        <TextBold>상세 주소 입력</TextBold>
        <View style={{marginVertical: 10, marginBottom: 40}}>
          <View style={{marginBottom: 10}}>
            <TextRegular>{postData.addrMain}</TextRegular>
          </View>
          <TextInput
            value={text}
            onChangeText={setText}
            style={{
              height: 50,
              backgroundColor: colors.inputBoxBG,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            placeholder={'상세 주소를 입력해주세요'}></TextInput>
        </View>
        <Pressable
          onPress={() => {
            dispatch(setPostData({...postData, addrSub: text}));
            _insertAddr();
          }}
          style={{
            width: '100%',
            height: 50,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <TextBold style={{color: 'white'}}>설정완료</TextBold>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddressSetDetail;
