import {useFormik} from 'formik';
import React, {useState} from 'react';
import {TextInput} from 'react-native';
import colors from '../../styles/colors';

const Input = ({fm}) => {
  return (
    <>
      <TextInput
        value={fm.values.mt_id}
        onChangeText={fm.handleChange('mt_id')}
        onBlur={fm.handleBlur('mt_id')}
        error={fm.errors}
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
        placeholder={'아이디를 입력하세요'}
      />
      <TextInput
        value={fm.values.mt_pwd}
        onChangeText={fm.handleChange('mt_pwd')}
        onBlur={fm.handleBlur('mt_pwd')}
        error={fm.errors}
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
