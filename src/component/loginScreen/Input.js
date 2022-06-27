import React, {useState} from 'react';
import {TextInput} from 'react-native';
import colors from '../../styles/colors';

const Input = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  return (
    <>
      <TextInput
        value={id}
        onChangeText={setId}
        style={{
          width: '100%',
          height: 50,
          alignSelf: 'flex-start',
          borderWidth: 1,
          borderRadius: 5,
          borderColor: colors.colorE3,
          paddingHorizontal: 20,
          fontSize: 15,
          marginBottom: 4,
        }}
        autoCapitalize="none"
        placeholder={'아이디 또는 이메일을 입력하세요'}
      />
      <TextInput
        value={pw}
        onChangeText={setPw}
        style={{
          width: '100%',
          height: 50,
          alignSelf: 'flex-start',
          borderWidth: 1,
          borderRadius: 5,
          borderColor: colors.colorE3,
          paddingHorizontal: 20,
          fontSize: 15,
          marginBottom: 26,
        }}
        autoCapitalize="none"
        secureTextEntry
        placeholder={'비밀번호를 입력하세요'}
      />
    </>
  );
};

export default Input;
