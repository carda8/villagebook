import React from 'react';
import {Text, View} from 'react-native';

const MenuSubs = () => {
  console.log('Menusubs rendered');
  return (
    <>
      <View
        style={{
          flex: 1,
          top: -50,
          height: 200,
          marginHorizontal: 20,
          backgroundColor: 'gray',
        }}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>TITLE</Text>
      </View>
      <View
        style={{
          flex: 1,
          top: -40,
          height: 40,
          marginHorizontal: 20,
          backgroundColor: 'gray',
        }}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>COUPONE</Text>
      </View>
      <View
        style={{
          flex: 1,
          top: -30,
          height: 200,
          marginHorizontal: 20,
          backgroundColor: 'gray',
        }}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>DETAIL</Text>
      </View>
    </>
  );
};

export default React.memo(MenuSubs);
