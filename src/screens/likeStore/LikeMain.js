import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import BottomBar from '../../component/BottomBar';
import Header from '../../component/Header';
import colors from '../../styles/colors';
import LikeItems from '../../component/likeStoreScreen/LikeItems';
import {encode} from 'jwt-simple';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useSelector} from 'react-redux';
import Loading from '../../component/Loading';

const LikeMain = ({navigation}) => {
  const [tabIdx, setTabIdx] = useState(0);
  const {mutateGetLikeList} = useCustomMutation();
  const {userInfo} = useSelector(state => state.authReducer);
  const [list, setList] = useState();
  const itemLimit = useRef(0);

  const _getList = type => {
    const data = {
      item_count: itemLimit.current,
      limit_count: 20,
      mt_id: userInfo.mt_id,
      jumju_type: type,
    };
    console.log('data', data);
    mutateGetLikeList.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true') setList(e.data.arrItems);
        else setList([]);
      },
    });
  };

  useEffect(() => {
    _getList('food');
  }, []);

  if (!list) return <Loading />;

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'단골찜'} navigation={navigation} showCart={true} />
      <View
        style={{
          ...styles.tabContainer,
        }}>
        <Pressable
          style={{
            ...styles.tabItemContainer,
          }}
          onPress={() => {
            setTabIdx(0);
            _getList('food');
          }}>
          <View
            style={{
              borderBottomWidth: tabIdx === 0 ? 2 : 0,
              ...styles.tabItem,
            }}>
            <Text
              style={{
                color: tabIdx === 0 ? colors.fontColor2 : colors.fontColorA2,
              }}>
              맛집
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={{
            ...styles.tabItemContainer,
          }}
          onPress={() => {
            setTabIdx(1);
            _getList('market');
          }}>
          <View
            style={{
              borderBottomWidth: tabIdx === 1 ? 2 : 0,
              ...styles.tabItem,
            }}>
            <Text
              style={{
                color: tabIdx === 1 ? colors.fontColor2 : colors.fontColorA2,
              }}>
              마켓
            </Text>
          </View>
        </Pressable>
        {/* <Pressable
          style={{
            ...styles.tabItemContainer,
          }}
          onPress={() => {
            setTabIdx(2);
          }}>
          <View
            style={{
              borderBottomWidth: tabIdx === 2 ? 2 : 0,
              ...styles.tabItem,
            }}>
            <Text
              style={{
                color: tabIdx === 2 ? colors.fontColor2 : colors.fontColorA2,
              }}>
              편의
            </Text>
          </View>
        </Pressable> */}
      </View>

      {tabIdx === 0 && (
        <View style={{flex: 1, paddingHorizontal: 22}}>
          <LikeItems navigation={navigation} data={list}></LikeItems>
        </View>
      )}
      {tabIdx === 1 && (
        <View style={{flex: 1, paddingHorizontal: 22}}>
          <LikeItems navigation={navigation} data={list}></LikeItems>
        </View>
      )}
      {/* {tabIdx === 2 && (
        <View style={{flex: 1, paddingHorizontal: 22}}>
          <LikeItems navigation={navigation} data={[1, 2, 3, 4, 5]}></LikeItems>
        </View>
      )} */}
      {/* <BottomBar navigation={navigation} /> */}
    </SafeAreaView>
  );
};

export default LikeMain;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    height: 40,
    marginTop: 13,
  },
  tabItemContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    borderBottomColor: colors.borderColor22,
    width: 70,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 9,
  },
});
