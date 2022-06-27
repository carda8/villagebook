import React, {useState} from 'react';
import {Image} from 'react-native';
import {Pressable} from 'react-native';
import TextRegular from '../text/TextRegular';

const AutoLogin = () => {
  const [isAuto, setIsAuto] = useState(false);
  return (
    <Pressable
      onPress={() => setIsAuto(!isAuto)}
      style={{
        marginTop: 15,
        paddingHorizontal: 22,
        alignSelf: 'flex-end',
        flexDirection: 'row',
      }}>
      {isAuto ? (
        <Image
          source={require('../../assets/top_ic_map_on.png')}
          style={{width: 23, height: 23}}
        />
      ) : (
        <Image
          source={require('../../assets/top_ic_map_off.png')}
          style={{width: 23, height: 23}}
        />
      )}
      <TextRegular style={{marginLeft: 7}}>자동로그인</TextRegular>
    </Pressable>
  );
};

export default AutoLogin;
