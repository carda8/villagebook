import React from 'react';
import {View, StyleSheet, ListRenderItem, ScrollView} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';
const HEADER_HEIGHT = 1000;

const Test = ({head}) => {
  const DATA = [0, 1, 2, 3, 4];
  const identity = v => v + '';

  const Header = () => {
    return <View style={styles.header} />;
  };

  const renderItem = React.useCallback(index => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    );
  }, []);

  return (
    <Tabs.Container
      renderHeader={Header}
      headerHeight={HEADER_HEIGHT} // optional
    >
      <Tabs.Tab name="A"></Tabs.Tab>
      <Tabs.Tab name="B">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
});

export default Test;
