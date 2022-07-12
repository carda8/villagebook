import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import colors from '../styles/colors';

export const Input = ({
  flex,
  marginTop,
  marginBottom,
  secureTextEntry,
  placeholder,
}) => {
  return (
    <TextInput
      autoCapitalize="none"
      style={{
        ...styles.input,
        flex: flex,
        marginTop,
        marginBottom,
      }}
      placeholder={placeholder}
      secureTextEntry
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
