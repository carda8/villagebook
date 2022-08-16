import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import TextBold from '../../component/text/TextBold';
import Header from '../../component/Header';
import colors from '../../styles/colors';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useSelector} from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {customAlert} from '../../component/CustomAlert';

const FAQWrite = ({navigation, route}) => {
  const {mutatePostFaq} = useCustomMutation();
  const isEdit = route.params?.isEdit;
  const routeData = route.params?.data;
  const {userInfo} = useSelector(state => state.authReducer);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [img, setImg] = useState([]);
  const [fsImage, setFsImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalPic, setModalPic] = useState(false);

  const _postFaq = () => {
    const data = {
      mt_id: userInfo.mt_id,
      qa_title: title,
      qa_content: body,
      // qa_img1: {},
      // qa_img2: {},
      isFaq: true,
      imgArr: fsImage,
    };
    if (isEdit) {
      data.qa_id = routeData.qa_id;
    }

    console.log('data', data);
    mutatePostFaq.mutate(data, {
      onSettled: e => {
        if (e.result === 'true') {
          customAlert('알림', '문의 작성이 완료되었습니다.');
          navigation.navigate("FAQ");
        }
        console.log('e', e);
      },
    });
  };

  console.log('imgs', imageUrl);

  const _setProfileImage = () => {
    if (fsImage.length === 5)
      return customAlert('알림', '리뷰 사진은 최대 5장 등록가능합니다.');

    ImageCropPicker.openCamera({
      cropping: true,
    }).then(image => {
      let temp = image.path.split('.');
      const convert = {
        uri: image.path,
        name: image.modificationDate + '.' + temp[temp.length - 1],
        type: image.mime,
      };
      console.log('convert', convert);
      console.log('image :', image);
      setModalPic(!modalPic);
      setFsImage(prev => [...prev, convert]);
      setImageUrl(prev => [...prev, {url: convert.uri}]);
    });
  };

  const _setProfileImageFromLocal = () => {
    if (fsImage.length === 5)
      return customAlert('알림', '리뷰 사진은 최대 5장 등록가능합니다.');

    ImageCropPicker.openPicker({}).then(image => {
      let temp = image.path.split('.');
      const convert = {
        uri: image.path,
        name: image.modificationDate + '.' + temp[temp.length - 1],
        type: image.mime,
      };
      console.log('convert', convert);
      console.log('image :', image);
      setModalPic(!modalPic);
      setFsImage(prev => [...prev, convert]);
      setImageUrl(prev => [...prev, {uri: convert.uri}]);
    });
  };

  const _removeImage = itemUri => {
    let arr = [...fsImage];
    let temp = arr.filter(item => item.uri !== itemUri);
    setFsImage(temp);
    // console.log('temp', temp);
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(routeData.qa_subject);
      setBody(routeData.qa_content);
      // setim
    }
  }, []);

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'1:1문의'} navigation={navigation} showCart={true} />
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 22, marginTop: 20}}>
          <TextBold>제목</TextBold>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="제목을 입력하세요"
            style={{
              ...commonStyles.inputContainer,
              marginTop: 5,
              marginBottom: 20,
            }}></TextInput>
          <TextBold>문의내용</TextBold>
          <TextInput
            value={body}
            onChangeText={setBody}
            textAlignVertical="top"
            multiline
            maxLength={500}
            placeholder={'문의내용을 입력하세요(최대 500자)'}
            style={{
              ...commonStyles.inputContainer,
              marginTop: 5,
              marginBottom: 20,
              height: 200,
            }}></TextInput>

          <View style={{flexDirection: 'row', marginBottom: 20}}>
            {fsImage.length > 0 &&
              fsImage.map((item, index) => (
                <Pressable
                  key={item.name + index}
                  onPress={() => {
                    setModal(!modal);
                  }}
                  style={{
                    flex: 1,
                    maxWidth: 100,
                    height: 100,
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginHorizontal: 3,
                    marginTop: 10,
                  }}>
                  <Pressable
                    onPress={() => {
                      _removeImage(item.uri);
                    }}
                    style={{
                      position: 'absolute',
                      zIndex: 100,
                      right: 3,
                      top: 3,
                    }}>
                    <Image
                      source={require('~/assets/pop_close.png')}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: colors.primary,
                      }}
                    />
                  </Pressable>
                  <Image
                    source={{uri: item.uri ? item.uri : null}}
                    style={{
                      flex: 1,
                      height: 100,
                      backgroundColor: colors.inputBoxBG,
                    }}
                  />
                </Pressable>
              ))}
          </View>

          <Pressable
            onPress={() => setModalPic(!modalPic)}
            style={{
              height: 70,
              backgroundColor: colors.inputBoxBG,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('~/assets/btn_add.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: colors.fontColor2,
                marginRight: 10,
              }}
            />
            <TextBold
              style={{color: colors.fontColor2, includeFontPadding: false}}>
              문의사진을 등록해주세요. (최대 5개)
            </TextBold>
          </Pressable>

          <Pressable
            onPress={() => !mutatePostFaq.isLoading && _postFaq()}
            style={{
              height: 50,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.couponBG,
              borderRadius: 10,
            }}>
            {mutatePostFaq.isLoading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <TextBold style={{color: colors.fontColor2}}>
                {isEdit ? '수정하기' : '문의하기'}
              </TextBold>
            )}
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        useNativeDriver
        enablePreload
        saveToLocalByLongPress={false}
        loadingRender={() => (
          <ActivityIndicator size={'large'} color={colors.primary} />
        )}
        transparent
        visible={modal}
        onRequestClose={() => setModal(!modal)}>
        <ImageViewer imageUrls={imageUrl} />
      </Modal>

      <Modal
        transparent
        visible={modalPic}
        onRequestClose={() => {
          setModalPic(!modalPic);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            paddingHorizontal: 22,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: 70,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
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
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => _setProfileImage()}
                style={{
                  flex: 1,
                  height: 70,
                  backgroundColor: colors.mainBG1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('~/assets/btn_add.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: colors.fontColor2,
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                  resizeMode="contain"
                />
                <TextBold
                  style={{
                    color: colors.fontColor2,
                    includeFontPadding: false,
                    flex: 1,
                  }}>
                  사진 촬영
                </TextBold>
              </Pressable>

              <Pressable
                onPress={() => _setProfileImageFromLocal()}
                style={{
                  flex: 1,
                  height: 70,
                  backgroundColor: colors.mainBG2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('~/assets/btn_add.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: colors.fontColor2,
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                  resizeMode="contain"
                />
                <TextBold
                  style={{
                    flex: 1,
                    color: colors.fontColor2,
                    includeFontPadding: false,
                  }}>
                  갤러리 가져오기
                </TextBold>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FAQWrite;
