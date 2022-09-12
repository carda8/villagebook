import React from 'react';
import {FlatList, Pressable, View} from 'react-native';

const MenuMain = ({navigation}) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const renderItem = item => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('MenuDetail');
        }}
        style={{
          height: 100,
          backgroundColor: 'gray',
          margin: 20,
        }}></Pressable>
    );
  };
  const ListHeaderComponent = () => {
    return (
      <View
        style={{height: 100, width: '100%', backgroundColor: 'tomato'}}></View>
    );
  };
  return (
    <>
      <View style={{flexDirection: 'column', flex: 1}}>
        <FlatList
          data={arr}
          stickyHeaderIndices={[0]}
          // StickyHeaderComponent={() => <ListHeaderComponent />}
          ListHeaderComponent={<ListHeaderComponent />}
          renderItem={item => renderItem(item)}
          keyExtractor={(item, index) => index}
        />
      </View>
    </>
  );
};

export default MenuMain;
