import React, {useEffect, useRef, useState} from 'react';
import {Image, Modal, Pressable, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {setSearchResult, setType} from '../../store/reducers/SearchReducer';
import colors from '../../styles/colors';
import {customAlert} from '../CustomAlert';
import TextBold from '../text/TextBold';

const SearchBox = ({onPress, isMain, isSub, navigation, category}) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const {mutateSearch} = useCustomMutation();
  const {currentLocation} = useSelector(state => state.locationReducer);
  const search = useSelector(state => state.searchReducer);
  const list = ['food', 'market', 'lifestyle'];
  // const _pressSearch = () => {
  //   if (!isMain && !isSub) setModal(true);
  // };
  console.log('props,', isSub, category);

  const limitItem = useRef(0);

  const _getResult = async data => {
    let result;
    result = await mutateSearch.mutateAsync(data, {
      onSettled: e => {
        if (e.result === 'true') {
          console.log('e', e);
        }
      },
    });
    let temp = result.data.arrItems;
    temp = temp.filter(item => item !== null);
    return temp;
  };

  const _search = type => {
    if (!keyword.trim()) return customAlert('알림', '검색어를 입력해주세요');
    dispatch(setType({type: type, keyword: keyword}));
    list.map(async (item, index) => {
      const data = {
        item_count: limitItem.current,
        limit_count: 20,
        stx: keyword,
        mb_jumju_type: item,
        mb_lat: currentLocation.lat,
        mb_lng: currentLocation.lon,
      };
      let temp = await _getResult(data);
      console.log('temp', temp);
      dispatch(setSearchResult({type: item, item: temp}));
    });
    navigation.navigate('SearchResult', {isSub: isSub, category: category});
  };

  return (
    <>
      <Pressable
        onPress={() => (onPress ? onPress() : _search())}
        style={{width: '100%', height: 50, flexDirection: 'row'}}>
        <TextInput
          editable={isMain || isSub ? false : true}
          style={{
            flex: 1,
            backgroundColor: colors.inputBoxBG,
            paddingHorizontal: 17,
            borderRadius: 10,
            marginRight: 8,
            height: 50,
          }}
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={() => (onPress ? onPress() : _search())}
          placeholder={'동네북을 펼쳐주세요.'}
        />
        {/* <Pressable
          onPress={() => {
            setModal(!modal);
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius:10,
            backgroundColor: colors.mainBG1,
          }}></Pressable>
           */}
        <Pressable
          onPress={() => (onPress ? onPress() : _search())}
          style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('~/assets/ico_search.png')}
            style={{width: 18, height: 18}}
          />
        </Pressable>
      </Pressable>
    </>
  );
};

export default SearchBox;

{
  /* <Modal
        transparent
        onRequestClose={() => setModal(!modal)}
        visible={modal}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: 'white',
              ...Platform.select({
                ios: {
                  shadowColor: '#00000029',
                  shadowOpacity: 0.6,
                  shadowRadius: 50 / 2,
                  shadowOffset: {
                    height: 12,
                    width: 0,
                  },
                },
                android: {
                  elevation: 5,
                },
              }),
            }}>
            <Pressable
              onPress={() => {
                setModal(!modal);
                _search('food');
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextBold style={{fontSize: 17}}>맛집 검색</TextBold>
            </Pressable>
            <Pressable
              onPress={() => {
                setModal(!modal);
                _search('market');
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: colors.borderColor,
              }}>
              <TextBold style={{fontSize: 17}}>마켓 검색</TextBold>
            </Pressable>
            <Pressable
              onPress={() => {
                setModal(!modal);
                _search('lifestyle');
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextBold style={{fontSize: 17}}>편의 검색</TextBold>
            </Pressable>
          </View>
        </View>
      </Modal> */
}
