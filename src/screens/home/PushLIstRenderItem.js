import {View, Text} from 'react-native';
import React from 'react';
import {Pressable} from 'react-native';
import TextBold from '../../component/text/TextBold';
import TextMedium from '../../component/text/TextMedium';
import dayjs from 'dayjs';
import colors from '../../styles/colors';
import {useState} from 'react';
import {Image} from 'react-native';

const PushLIstRenderItem = ({data}) => {
  const [toggle, setToggle] = useState({id: '', visible: false});

  const _onPressTitle = id => {
    console.log('id', id);
    setToggle({id: id, visible: !toggle.visible});
  };

  return (
    <Pressable
      onPress={() => _onPressTitle(data.od_id)}
      style={{
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
      }}>
      <View
        style={{marginBottom: 4, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <TextBold style={{color: colors.fontColor2, fontSize: 15}}>
            {data.pst_title}
          </TextBold>
        </View>
        <Image
          source={require('~/assets/arrow.png')}
          style={{
            width: 17,
            height: 17,
            // tintColor: 'black',
            transform: [{rotate: toggle.visible ? '180deg' : '0deg'}],
          }}
        />
      </View>
      {toggle.id === data.od_id && toggle.visible && (
        <View style={{marginBottom: 2}}>
          <TextMedium style={{color: colors.fontColor2}}>
            {data.pst_content}
          </TextMedium>
        </View>
      )}
      <TextMedium style={{color: colors.fontColorA, fontSize: 12}}>
        {dayjs(data.pst_wdate).format('YYYY년 MM월 DD일 HH:mm')}
      </TextMedium>
    </Pressable>
  );
};

export default PushLIstRenderItem;
