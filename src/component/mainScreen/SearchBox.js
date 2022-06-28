import React from 'react';
import {Image, Pressable, TextInput, View} from 'react-native';
import colors from '../../styles/colors';

const SearchBox = () => {
  return (
    <View style={{width: '100%', height: 50, flexDirection: 'row'}}>
      <TextInput
        style={{
          flex: 1,
          backgroundColor: colors.inputBoxBG,
          paddingHorizontal: 17,
          borderRadius: 10,
          marginRight: 8,
        }}
        placeholder={'맛집검색을 해보세요'}
      />
      <Pressable
        style={{
          width: 50,
          height: '100%',
          borderRadius: 10,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('~/assets/ico_search.png')}
          style={{width: 18, height: 18}}
        />
      </Pressable>
    </View>
  );
};

export default SearchBox;
