import {createSlice} from '@reduxjs/toolkit';

//다른 가게 담으면 사라짐

const cartSlice = createSlice({
  name: 'category',
  initialState: {
    //담기를 하기 전까지는 사라지지는 않는다.
    //담기버튼을 누르지 않으면 화면을 벗어날때 모두 초기화 (saved 제외)
    //saved는 가게 코드가 바뀌지 않는 이상 안바뀜
    currentStoreCode: '', //현재 가게의 고유코드
    mainCount: {count: 1, mainItemCode: '', menuName: '', mainPrice: 0}, // 본품 기본 수량 : 1
    itemCount: 1,
    // selectedMainOption: {},
    selectedMainOption: [],
    subItems: [],
    //{itemCode: '', itemCount: '', itemPrice: '', itemDesc: ''}
    requiredCount: 0,
    totalPrice: 0, //주문시 최종 금액?
    //최종금액은 그냥 배열에서 가격 골라서 합산해서 표시
    storeLogoUrl: '',
    savedItem: {savedStoreCode: '', savedItems: []}, // 담기 버튼을 눌렀을때 아이템이 담길 배열
  },
  reducers: {
    initOption: (state, action) => {
      state.mainCount.count = action.payload.count;
      state.mainCount.mainItemCode = action.payload.mainItemCode;
      state.mainCount.menuName = action.payload.manuName;
      state.mainCount.mainPrice = action.payload.mainPrice;
      state.totalPrice = action.payload.price;
      state.selectedMainOption = [];
      state.subItems = [];
    },
    setMainCount: (state, action) => {
      state.mainCount.count = action.payload.count;
      state.mainCount.mainItemCode = action.payload.mainItemCode;
      state.totalPrice = action.payload.price;
    },
    setSubMenu: (state, action) => {
      state.subItems.push(action.payload);
      state.totalPrice += action.payload.itemPrice;
    },
    removeSubMenu: (state, action) => {
      state.subItems.pop();
      state.totalPrice -= action.payload.itemPrice;
    },
    // saveItem: (state, action) => {
    //   state.savedItem.push(action.payload);
    // },
    removeSavedItem: (state, action) => {
      state.savedItem.filter(() => {});
    },
    setCurrentStoreCode: (state, action) => {
      console.log('code action', action);
      state.currentStoreCode = action.payload;
    },
    setMainRequired: (state, action) => {
      if (state.selectedMainOption[action.payload.index]?.idx) {
        // state.totalPrice -= action.payload.data.price;
        state.totalPrice -=
          state.selectedMainOption[action.payload.index]?.price;
        state.totalPrice += action.payload.data.price;
      } else state.totalPrice += action.payload.data.price;
      state.selectedMainOption[action.payload.index] = action.payload.data;
      // state.selectedMainOption.push(action.payload);
      // state.selectedMainOption[action.payload.key] = {
      //   idx: action.payload.idx,
      //   name: action.payload.name,
      //   value: action.payload.value,
      //   price: action.payload.price,
      // };
    },
    setRequiredCount: (state, action) => {
      state.requiredCount = action.payload;
    },
    setStoreLogo: (state, action) => {
      state.storeLogoUrl = action.payload;
    },
    setMainCountFromCart: (state, action) => {
      state.savedItem.savedItems[action.payload.index].main.count =
        action.payload.count;
      state.savedItem.savedItems[action.payload.index].totalPrice =
        action.payload.price;
    },
    saveItem: (state, action) => {
      console.log('action saved', action.payload);
      state.savedItem.savedStoreCode = action.payload.storeCode;
      state.savedItem.savedItems.push(action.payload.items);
    },
    removeItem: (state, action) => {
      console.log('removeItem', action.payload);
      let temp = state.savedItem.savedItems.filter(
        (item, index) => index !== action.payload.index,
      );
      state.savedItem.savedItems = temp;
    },
    resetSavedItem: (state, action) => {
      state.savedItem = {savedStoreCode: {}, savedItems: []};
    },
  },
});

const {actions, reducer} = cartSlice;

export const {
  initOption,
  setMainCount,
  setSubMenu,
  setStoreLogo,
  removeSubMenu,
  removeSavedItem,
  saveItem,
  setCurrentStoreCode,
  setRequiredCount,
  setMainRequired,
  setMainCountFromCart,
  removeItem,
  resetSavedItem,
} = actions;
export const cartReducer = reducer;
