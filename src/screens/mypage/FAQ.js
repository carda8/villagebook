import {View, Text, SafeAreaView, FlatList, Pressable} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import colors from '../../styles/colors';
import TextBold from '../../component/text/TextBold';
import Divider from '../../component/Divider';
import DividerL from '../../component/DividerL';
import dayjs from 'dayjs';
import TextRegular from '../../component/text/TextRegular';
import TextLight from '../../component/text/TextLight';
import TextMedium from '../../component/text/TextMedium';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const FAQ = ({navigation}) => {
  const {mutateGetFaqList} = useCustomMutation();
  const {userInfo} = useSelector(state => state.authReducer);
  const [list, setList] = useState([]);

  const itemLimit = useRef(0);

  const _getFaqList = () => {
    itemLimit.current = 0;
    const data = {
      item_count: itemLimit.current,
      limit_count: '10',
      mt_id: userInfo.mt_id,
    };

    mutateGetFaqList.mutate(data, {
      onSettled: e => {
        if (e.result === 'true') setList(e.data.arrItems);
        console.log('e', e);
      },
    });
  };

  const _getMoreList = () => {
    itemLimit.current += 10;

    const data = {
      item_count: itemLimit.current,
      limit_count: '10',
      mt_id: userInfo.mt_id,
    };

    mutateGetFaqList.mutate(data, {
      onSettled: e => {
        if (e.result === 'true' && e.data.arrItems.length > 0) {
          console.log('concat', list.concat(e.data.arrItems));
          setList(prev => prev.concat(e.data.arrItems));
        }
        console.log('e', e);
      },
    });
  };

  const renderItem = item => {
    // console.log('item', item);
    const data = item.item;
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('FAQDetail', {boardIndex: data.qa_id});
        }}
        style={{
          height: 70,
          paddingHorizontal: 22,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderColor,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <TextRegular>{data.qa_subject}</TextRegular>
          <TextLight style={{fontSize: 12, marginLeft: 10}}>
            {data.qa_datetime}
          </TextLight>
        </View>
        <TextMedium>{data.qa_status == 0 ? '답변대기' : '답변완료'}</TextMedium>
      </Pressable>
    );
  };

  useEffect(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      _getFaqList();
    }, []),
  );

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'1:1문의'} navigation={navigation} showCart={true} />
      <FlatList
        data={list}
        ListHeaderComponent={() => (
          <>
            <Pressable
              onPress={() => {
                navigation.navigate('FAQWrite');
              }}
              style={{
                height: 55,
                marginVertical: 10,
                backgroundColor: colors.couponBG,
                marginHorizontal: 22,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 7,
              }}>
              <TextBold style={{color: colors.fontColor2}}>문의하기</TextBold>
            </Pressable>
            <DividerL />
          </>
        )}
        ListEmptyComponent={<TextRegular>등록된 리뷰가 없습니다.</TextRegular>}
        onEndReached={() => {
          _getMoreList();
        }}
        renderItem={item => renderItem(item)}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default FAQ;
