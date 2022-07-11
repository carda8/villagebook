import {
  View,
  Text,
  ScrollView,
  FlatList,
  useWindowDimensions,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import TextMedium from '../text/TextMedium';
import ReviewSimple2 from '../reviews/ReviewSimple2';
import colors from '../../styles/colors';
import TextRegular from '../text/TextRegular';
import Chip from '../Chip';
import Dot from '../Dot';
import TextBold from '../text/TextBold';
import RenderItem from './RenderItem';

// 2.1 : 1
const LikeItems = ({data, navigation}) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const layout = useWindowDimensions();
  const IMG_CONTAINER = layout.width * 0.66; //레이아웃 높이
  const IMG_HEIGHT = IMG_CONTAINER * 0.64; //이미지
  const [remove, setRemove] = useState(false);
  console.log('rendered food');

  return (
    <View style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            {remove && (
              <Pressable
                onPress={() => {
                  setRemove(!remove);
                }}
                style={{
                  width: 80,
                  height: 30,
                  backgroundColor: colors.primary,
                  marginRight: 10,
                  marginVertical: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextRegular style={{color: 'white'}}>선택 삭제</TextRegular>
              </Pressable>
            )}
            <Pressable
              onPress={() => {
                setRemove(!remove);
              }}
              style={{
                width: 52,
                height: 30,
                backgroundColor: colors.primary,
                marginVertical: 10,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextRegular style={{color: 'white'}}>
                {remove ? '취소' : '삭제'}
              </TextRegular>
            </Pressable>
          </View>
        )}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={item => (
          <RenderItem item={item} remove={remove} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index}
        onEndReached={() => {}}
      />
    </View>
  );
};

export default React.memo(LikeItems);
