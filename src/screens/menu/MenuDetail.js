import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Header from '../../component/Header';
import ImageSwipe from '../../component/menuDetail/ImageSwipe';
import MenuList from '../../component/menuDetail/MenuList';
import MenuDesc from '../../component/menuDetail/MenuDesc';
import commonStyles from '../../styles/commonStyle';
import colors from '../../styles/colors';
import TextRegular from '../../component/text/TextRegular';
import Dot from '../../component/Dot';
import {color} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import TextMedium from '../../component/text/TextMedium';
import TextBold from '../../component/text/TextBold';
import TextNotoM from '../../component/text/TextNotoM';
import TextNotoR from '../../component/text/TextNotoR';
import TextNotoB from '../../component/text/TextNotoB';
import DividerL from '../../component/DividerL';

const MenuDetail = ({navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const arr = ['토스트', '음료', '토스트', '음료', '토스트', '주류', 8, 9];
  const arrTop = [1, 2, 3];
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);
  const [temp, setTemp] = useState();
  const [headerTrigger, setHeaderTrigger] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [selected, setSelected] = useState({idx: '', isScrolling: false});

  const scrollRef = useRef();
  const scrollRefSub = useRef();
  const focusTarget = useRef([]);
  const chipTarget = useRef([]);

  const chipWidth = 80;

  useEffect(() => {
    console.log('index', selected);
  }, [selected]);

  useEffect(() => {
    if (chipTarget.current[selected.idx]) {
      chipTarget.current[selected.idx].measureLayout(
        scrollRefSub.current,
        (left, top, width, height) => {
          scrollRefSub.current.scrollTo({
            x: left - layout.width / 3 - 10,
            y: 0,
            animated: true,
          });
        },
      );
    }
  }, [selected]);

  return (
    <>
      <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
        <View
          style={{
            zIndex: trigger ? 1000 : -1,
            top: 50,
            position: 'absolute',
            opacity: trigger ? 1 : 0,
            backgroundColor: 'white',
          }}>
          <ScrollView
            horizontal
            hitSlop={20}
            ref={scrollRefSub}
            showsHorizontalScrollIndicator={false}>
            {arr.map((item, index) => (
              <Pressable
                disabled={!trigger}
                key={index}
                ref={el => (chipTarget.current[index] = el)}
                onPress={() => {
                  focusTarget.current[index].measureLayout(
                    scrollRef.current,
                    (left, top, width, height) => {
                      scrollRef.current.scrollTo({
                        y: top - 90,
                        animated: true,
                      });
                      console.log('position', left, top, width, height);
                    },
                  );

                  chipTarget.current[index].measureLayout(
                    scrollRefSub.current,
                    (left, top, width, height) => {
                      console.log('widht', width);
                      scrollRefSub.current.scrollTo({
                        x: left - layout.width / 3 - 10,

                        animated: true,
                      });
                    },
                  );
                  setSelected({idx: index, isScrolling: false});
                }}
                style={{
                  height: 50,
                  // width: chipWidth,
                  minWidth: 87,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor:
                    selected.idx === index ? colors.chipBorder : colors.colorE3,
                  margin: 10,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextMedium style={{fontSize: 17}}>{item}</TextMedium>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <ScrollView
          ref={scrollRef}
          stickyHeaderIndices={[3]}
          // contentOffset={{x: 0, y: 100}}
          // scrollEnabled={false}
          scrollEventThrottle={100}
          onScrollBeginDrag={e => {
            if (selected.isScrolling !== true) {
              setSelected({...selected, isScrolling: true});
            }
          }}
          onScroll={e => {
            const positionY = e.nativeEvent.contentOffset.y;
            if (positionY >= 300 && headerTrigger === false)
              setHeaderTrigger(true);
            if (positionY <= 300 && headerTrigger === true)
              setHeaderTrigger(false);

            if (positionY >= temp && trigger === false) setTrigger(true);
            if (positionY <= temp && trigger === true) setTrigger(false);
            if (selected.isScrolling && index === 0) {
              arr.map((item, index) => {
                focusTarget.current[index].measureLayout(
                  scrollRef.current,
                  (left, top, width, height) => {
                    if (
                      positionY > top - 100 &&
                      positionY < top + 30 &&
                      selected.idx !== index
                    ) {
                      setSelected({...selected, idx: index});
                    }
                  },
                );
              });
            }
          }}>
          <Header
            navigation={navigation}
            showLike={true}
            showShare={true}
            iconColor={'white'}
            title={''}
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              position: 'absolute',
              zIndex: 100,
            }}
          />

          <ImageSwipe />
          <MenuDesc />
          <View>
            {/* 메뉴, 정보, 리뷰 탭 */}
            <View
              style={{
                flexDirection: 'row',
                borderTopColor: colors.borderColor,
                height: 50,
              }}>
              <Pressable
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopWidth: index === 0 ? 2 : 1,
                  borderBottomWidth: index === 0 ? 0 : 1,
                  borderRightWidth: index === 0 ? 1 : 0,
                  borderRightColor: colors.borderColor,
                  borderTopColor:
                    index === 0 ? colors.borderColor22 : colors.borderColor,
                  borderBottomColor: colors.borderColor,
                }}
                onPress={() => {
                  setIndex(0);
                }}>
                <TextMedium style={{fontSize: 17}}>메뉴</TextMedium>
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopWidth: index === 1 ? 2 : 1,
                  borderBottomWidth: index === 1 ? 0 : 1,
                  borderRightWidth: index === 1 ? 1 : 0,
                  borderRightColor: colors.borderColor,
                  borderLeftWidth: index === 1 ? 1 : 0,
                  borderLeftColor: colors.borderColor,
                  borderTopColor:
                    index === 1 ? colors.borderColor22 : colors.borderColor,
                  borderBottomColor: colors.borderColor,
                }}
                onPress={() => {
                  setIndex(1);
                }}>
                <TextMedium style={{fontSize: 17}}>정보</TextMedium>
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopWidth: index === 2 ? 2 : 1,
                  borderBottomWidth: index === 2 ? 0 : 1,
                  borderLeftWidth: index === 2 ? 1 : 0,
                  borderLeftColor: colors.borderColor,
                  borderTopColor:
                    index === 2 ? colors.borderColor22 : colors.borderColor,
                  borderBottomColor: colors.borderColor,
                }}
                onPress={() => {
                  setIndex(2);
                }}>
                <TextMedium style={{fontSize: 17}}>리뷰</TextMedium>
              </Pressable>
            </View>
          </View>
          {index === 0 && (
            <>
              <View
                style={{flex: 1}}
                onLayout={e => {
                  setTemp(e.nativeEvent.layout.y + 20);
                }}>
                <View style={{paddingHorizontal: 22, paddingVertical: 29}}>
                  <TextRegular style={{fontSize: 15}}>
                    수제버거 맛나버거가 부산에 상륙했습니다! 소고기 패티에
                    신선한 야채와 치즈의 만남! 리뷰이벤트준비했으니 많이많이
                    참여해주세요!
                  </TextRegular>
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 20,
                    paddingHorizontal: 22,
                    backgroundColor: colors.couponBG,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 11,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Dot
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 8 / 2,
                        backgroundColor: colors.borderColor22,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'CoreGothicD-CoreGothicDBold',
                        color: colors.fontColor2,
                        fontSize: 22,
                        marginHorizontal: 14,
                      }}>
                      대표메뉴
                    </Text>
                    <Dot
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 8 / 2,
                        backgroundColor: colors.borderColor22,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    {arrTop.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          flex: 1,
                          padding: 22,
                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderColor: colors.primary,
                          marginBottom: 10,
                          borderRadius: 12,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              width: 80,
                              height: 80,
                              borderWidth: 1,
                              borderRadius: 10,
                              marginRight: 15,
                              borderColor: colors.borderColor,
                              overflow: 'hidden',
                            }}>
                            <FastImage
                              source={require('~/assets/dummy/CK_tica114m19040204_l.jpg')}
                              resizeMode={FastImage.resizeMode.cover}
                              style={{flex: 1}}
                            />
                          </View>
                          <View style={{flex: 1}}>
                            <TextMedium
                              style={{fontSize: 17, color: colors.fontColor2}}>
                              맵달맵달 리챔
                            </TextMedium>
                            <TextMedium
                              style={{fontSize: 15, color: colors.fontColor8}}>
                              계란+콘+모짜렐라치즈+리챔3장+ 핫스모크소스
                            </TextMedium>
                          </View>
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                          <TextBold
                            style={{fontSize: 17, color: colors.fontColor2}}>
                            3,700원
                          </TextBold>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                {arr.map((item, index) => (
                  <View key={index}>
                    <View
                      style={{
                        height: 50,
                        paddingVertical: 15,
                        paddingHorizontal: 22,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: colors.borderColor,
                      }}>
                      <Text style={{color: colors.fontColor2}}>{item}</Text>
                    </View>
                    <View
                      key={index}
                      ref={el => (focusTarget.current[index] = el)}
                      style={{
                        height: 400,
                        backgroundColor: 'white',
                      }}>
                      <View style={{flex: 1}}>
                        {arrTop.map((item, index) => (
                          <View
                            key={index}
                            style={{
                              flex: 1,
                              padding: 22,
                              backgroundColor: 'white',
                              borderBottomWidth: 1,
                              borderColor: colors.borderColor,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  width: 80,
                                  height: 80,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                  marginRight: 15,
                                  borderColor: colors.borderColor,
                                  overflow: 'hidden',
                                }}>
                                <FastImage
                                  source={require('~/assets/dummy/CK_tica114m19040204_l.jpg')}
                                  resizeMode={FastImage.resizeMode.cover}
                                  style={{flex: 1}}
                                />
                              </View>
                              <View style={{flex: 1}}>
                                <TextMedium
                                  style={{
                                    fontSize: 17,
                                    color: colors.fontColor2,
                                  }}>
                                  맵달맵달 리챔
                                </TextMedium>
                                <TextMedium
                                  style={{
                                    fontSize: 15,
                                    color: colors.fontColor8,
                                  }}>
                                  계란+콘+모짜렐라치즈+리챔3장+ 핫스모크소스
                                </TextMedium>
                                <TextBold
                                  style={{
                                    fontSize: 17,
                                    color: colors.fontColor2,
                                  }}>
                                  3,700원
                                </TextBold>
                              </View>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {index === 1 && (
            <View style={{flex: 1}}>
              <View
                style={{
                  paddingVertical: 32,
                  paddingHorizontal: 22,
                }}>
                <TextNotoM style={{fontSize: 17}}>매장정보</TextNotoM>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 13,
                    flexDirection: 'row',
                  }}>
                  <View style={{}}>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      상호
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      대표자명
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      전화번호
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      사업자번호
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      주소
                    </TextRegular>
                  </View>

                  <View style={{marginLeft: 22}}>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      맛나버거 부산대점
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      김맛나
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      010-1234-5678
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      123-45-67890
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      부산광역시 금정구 금정로 225
                    </TextRegular>
                  </View>
                </View>
              </View>
              <DividerL />
              <View
                style={{
                  paddingVertical: 32,
                  paddingHorizontal: 22,
                }}>
                <TextNotoM style={{fontSize: 17}}>영업시간</TextNotoM>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 13,
                    flexDirection: 'row',
                  }}>
                  <View style={{}}>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      평일
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      토요일
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      BREAK TIME
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor99, marginBottom: 11}}>
                      휴무일
                    </TextRegular>
                  </View>

                  <View style={{marginLeft: 22}}>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      10시~21시
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      10시~21시
                    </TextRegular>
                    <TextRegular
                      style={{color: colors.fontColor3, marginBottom: 11}}>
                      10시~21시
                    </TextRegular>
                    <TextRegular style={{color: colors.fontColor3}}>
                      매월 둘째 월요일
                    </TextRegular>
                  </View>
                </View>
              </View>
            </View>
          )}
          {index === 2 && (
            <View style={{flex: 1}}>
              <View style={{paddingHorizontal: 22, paddingVertical: 29}}>
                <TextRegular style={{fontSize: 15}}>
                  리뷰 이벤트를 진행하시면 서비스로 OO을 드립니다. 참여시려면
                  주문시 비고란에 리뷰 참여라고 입력 하시고 반드시 리뷰를
                  작성해주세요~
                </TextRegular>
              </View>

              <View
                style={{
                  height: 227,
                  backgroundColor: '#F5F5F5',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <TextBold style={{fontSize: 15}}>이 상품에 </TextBold>
                  <TextBold style={{fontSize: 15, color: colors.primary}}>
                    {'00명'}
                  </TextBold>
                  <TextBold style={{fontSize: 15}}>이</TextBold>
                </View>

                <TextBold style={{fontSize: 15}}>
                  소중한 리뷰를 남겨주었습니다.
                </TextBold>

                <TextBold style={{fontSize: 44, color: colors.primary}}>
                  {''}4.3
                </TextBold>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('~/assets/ico_star_on.png')}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                  <Image
                    source={require('~/assets/ico_star_on.png')}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                  <Image
                    source={require('~/assets/ico_star_on.png')}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                  <Image
                    source={require('~/assets/ico_star_on.png')}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />

                  <Image
                    source={require('~/assets/ico_star_on.png')}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          )}

          <DividerL />
          <View
            style={{
              paddingHorizontal: 22,
              paddingVertical: 20,
              backgroundColor: 'white',
            }}>
            <TextNotoM
              style={{
                fontSize: 17,
                color: colors.fontColor2,
                includeFontPadding: false,
                marginBottom: 7,
              }}>
              원산지 표기
            </TextNotoM>
            <TextNotoR
              style={{
                fontSize: 13,
                color: colors.fontColor8,
                includeFontPadding: false,
              }}>
              햄치즈, 햄스페셜, 햄치즈포테이토(햄-돼지고기 : 국내산, 닭고기 :
              국내산)햄치즈, 햄스페셜, 햄치즈포테이토(햄-돼지고기 : 국내산,
              닭고기 : 국내산)햄치즈, 햄스페셜, 햄치즈포테이토(햄-돼지고기 :
              국내산, 닭고기 : 국내산)햄치즈, 햄스페셜,
              햄치즈포테이토(햄-돼지고기 : 국내산, 닭고기 : 국내산)
            </TextNotoR>
          </View>

          <View
            style={{
              paddingHorizontal: 22,
              paddingVertical: 20,
              backgroundColor: colors.inputBoxBG,
              marginTop: 20,
            }}>
            <TextNotoB
              style={{
                fontSize: 14,
                color: colors.fontColor3,
                includeFontPadding: false,
                marginBottom: 7,
              }}>
              유의사항
            </TextNotoB>
            <TextNotoR
              style={{
                fontSize: 13,
                color: colors.fontColor8,
                includeFontPadding: false,
              }}>
              메뉴사진은 연출된 이미지로 실제 조리된 음식과 다를수 있습니다.
              상단 메뉴 및 가격은 업소에서 제공한 정보를 기준으로 작성되었으며
              변동될 수 있습니다.
            </TextNotoR>
          </View>

          <View
            style={{
              paddingHorizontal: 22,
              paddingVertical: 20,
              backgroundColor: colors.inputBoxBG,
            }}>
            <TextNotoB
              style={{
                fontSize: 14,
                color: colors.fontColor3,
                includeFontPadding: false,
                marginBottom: 7,
              }}>
              유의사항
            </TextNotoB>
            <TextNotoR
              style={{
                fontSize: 13,
                color: colors.fontColor8,
                includeFontPadding: false,
              }}>
              메뉴사진은 연출된 이미지로 실제 조리된 음식과 다를수 있습니다.
              상단 메뉴 및 가격은 업소에서 제공한 정보를 기준으로 작성되었으며
              변동될 수 있습니다.
            </TextNotoR>
          </View>
          <View
            style={{
              paddingHorizontal: 22,
              paddingVertical: 20,
              backgroundColor: colors.inputBoxBG,
            }}>
            <TextNotoB
              style={{
                fontSize: 14,
                color: colors.fontColor3,
                includeFontPadding: false,
                marginBottom: 7,
              }}>
              유의사항
            </TextNotoB>
            <TextNotoR
              style={{
                fontSize: 13,
                color: colors.fontColor8,
                includeFontPadding: false,
              }}>
              메뉴사진은 연출된 이미지로 실제 조리된 음식과 다를수 있습니다.
              상단 메뉴 및 가격은 업소에서 제공한 정보를 기준으로 작성되었으며
              변동될 수 있습니다.
            </TextNotoR>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MenuDetail;
