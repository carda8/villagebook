import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';

const Test = () => {
  const [temp, setTemp] = useState();
  const [temp2, setTemp2] = useState();
  const arr = [1, 2, 3, 4];

  return (
    <View style={{flex: 1}}>
      {arr.map((item, index) => (
        <Pressable
          style={{
            width: 100,
            height: 50,
            margin: 20,
            backgroundColor: temp === index ? 'teal' : 'tomato',
          }}
          onPress={() => {
            setTemp(index);
          }}></Pressable>
      ))}

      {arr.map((item, index) => (
        <Pressable
          style={{
            width: 100,
            height: 50,
            margin: 20,
            backgroundColor: temp2 === index ? 'linen' : 'gray',
          }}
          onPress={() => {
            setTemp2(index);
          }}></Pressable>
      ))}
    </View>
  );
};

export default Test;
