import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Filter from '../../../config/Filter';
import TextSBold from '../../../component/text/TextSBold';
import TextRegular from '../../../component/text/TextRegular';
import colors from '../../../styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {setcurrentFilter} from '../../../store/reducers/CategoryReducer';

const FilterView = () => {
  const layout = useWindowDimensions();
  //   const [selectedFilter, setSelectedFilter] = useState(0);
  const dispatch = useDispatch();
  const {currentFilter} = useSelector(state => state.categoryReducer);

  const scrollRef = useRef();
  const filterRef = useRef([]);

  return (
    <View
      style={{
        flex: 1,
        height: 40,
        zIndex: 100,
        top: 110,
        marginLeft: 22,
        position: 'absolute',
        minWidth: layout.width,
      }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        contentContainerStyle={{
          alignItems: 'center',
          paddingRight: 22,
        }}>
        {Filter.filter.map((item, index) => (
          <Pressable
            ref={filterRef[index]}
            key={index}
            onPress={() => {
              // scrollRef.current.scrollTo();
              dispatch(setcurrentFilter(index));
            }}
            style={{
              height: 30,
              backgroundColor:
                currentFilter === index ? colors.primary : 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 18,
              paddingHorizontal: 13,
            }}>
            {currentFilter === index ? (
              <TextSBold
                style={{
                  color: currentFilter === index ? 'white' : colors.fontColorA2,
                }}>
                {item}
              </TextSBold>
            ) : (
              <TextRegular>{item}</TextRegular>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default FilterView;
