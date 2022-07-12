import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import colors from '../styles/colors';

export const Input = ({
  flex,
  marginTop,
  marginBottom,
  secureTextEntry,
  placeholder,
  formik,
  value,
  keyboardType,
}) => {
  return (
    <TextInput
      autoCapitalize="none"
      value={formik.values[value]}
      onChangeText={
        // val.replace(/\s/g, '');
        formik.handleChange(value)
      }
      onBlur={formik.handleBlur(value)}
      error={formik.errors}
      style={{
        ...styles.input,
        flex: flex,
        marginTop,
        marginBottom,
      }}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType ?? null}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
  },
});
