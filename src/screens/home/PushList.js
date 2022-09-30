import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import TextBold from '../../component/text/TextBold';
import Header from '../../component/Header';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import TextMedium from '../../component/text/TextMedium';
import colors from '../../styles/colors';
import dayjs from 'dayjs';

const PushList = ({navigation}) => {
  const {userInfo} = useSelector(state => state.authReducer);
  const {mutateGetPushList} = useCustomMutation();
  const [pushList, setPushList] = useState([]);

  const count = useRef(0);

  const _getPushList = more => {
    if (more) {
      count.current += 30;
    }

    const data = {
      mt_id: userInfo.mt_id,
      item_count: count.current,
      limit_count: 30,
    };

    mutateGetPushList.mutate(data, {
      onSettled: res => {
        if (res.result === 'true') {
          let arr = [];
          const items = res.data.arrItems;
          arr.push(items);
          setPushList(prev => prev.concat(arr));
        }
        console.warn(res);
      },
    });
  };

  const renderItem = item => {
    const data = item.item;
    return (
      <View
        style={{
          // backgroundColor: colors.inputBoxBG,
          padding: 14,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderColor,
        }}>
        <View style={{marginBottom: 4}}>
          <TextBold style={{color: colors.fontColor2, fontSize: 15}}>
            {data.pst_title}
          </TextBold>
        </View>
        <View style={{marginBottom: 2}}>
          <TextMedium style={{color: colors.fontColor2}}>
            {data.pst_content}
          </TextMedium>
        </View>
        <TextMedium style={{color: colors.fontColorA, fontSize: 12}}>
          {dayjs(data.pst_wdate).format('YYYY년 MM월 DD일 HH:mm')}
        </TextMedium>
      </View>
    );
  };

  useEffect(() => {
    _getPushList();

    return () => {};
  }, []);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'알림함'} navigation={navigation} />

      <FlatList
        data={pushList}
        keyExtractor={(item, idx) => idx}
        renderItem={item => renderItem(item)}
        ItemSeparatorComponent={
          <View style={{height: 1, width: '100%', backgroundColor: 'black'}} />
        }
        ListEmptyComponent={
          <View style={{padding: 22, alignItems: 'center'}}>
            <TextBold>알림이 없습니다</TextBold>
          </View>
        }
        onEndReached={() => {
          _getPushList(true);
        }}
      />
    </SafeAreaView>
  );
};

export default PushList;
