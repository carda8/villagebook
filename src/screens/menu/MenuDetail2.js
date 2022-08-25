import {View, Text, ScrollView, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import {SectionList} from 'react-native';
import Header from '../../component/Header';

const MenuDetail2 = () => {
  const data = [
    {key: 0, title: 'title1', data: [1]},
    {key: 1, title: 'title2', data: [1]},
  ];

  const renderItem = item => {
    console.log('ITEM::', item);
    return (
      <View
        style={{
          flex: 1,
          height: 400,
          backgroundColor: item.index % 2 === 1 ? 'teal' : 'tomato',
        }}>
        <Text>{item.item}</Text>
      </View>
    );
  };

  const sectionHeader = section => {
    if (section.key !== 1) return <></>;
    return (
      <View style={{width: '100%', height: 50, backgroundColor: 'linen'}}>
        <Text>{section.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      {/* <Header title={'detail'} /> */}
      <SectionList
        sections={data}
        stickyHeaderIndices
        stickySectionHeadersEnabled
        keyExtractor={(item, index) => index}
        renderItem={item => renderItem(item)}
        renderSectionHeader={({section}) => sectionHeader(section)}
        onViewableItemsChanged={item => console.log('Changed', item)}
      />
    </SafeAreaView>
  );
};

export default MenuDetail2;
