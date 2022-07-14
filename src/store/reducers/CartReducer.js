import {createSlice} from '@reduxjs/toolkit';

//다른 가게 담으면 사라짐

const cartSlice = createSlice({
  name: 'category',
  initialState: {
    //담기를 하기 전까지는 사라지지는 않는다.
    //담기버튼을 누르지 않으면 화면을 벗어날때 모두 초기화 (saved 제외)
    //saved는 가게 코드가 바뀌지 않는 이상 안바뀜
    currentStoreCode: '', //현재 가게의 고유코드
    mainCount: {count: 1, mainItemCode: ''}, // 본품 기본 수량 : 1
    selectedMainOption: {},
    subItems: [],
    //{itemCode: '', itemCount: '', itemPrice: '', itemDesc: ''}

    totalPrice: 0, //주문시 최종 금액?
    //최종금액은 그냥 배열에서 가격 골라서 합산해서 표시

    savedItem: {savedStoreCode: '', savedItems: []}, // 담기 버튼을 눌렀을때 아이템이 담길 배열
  },
  reducers: {
    initOption: (state, action) => {
      state.mainCount.count = action.payload.count;
      state.mainCount.mainItemCode = action.payload.mainItemCode;
      state.totalPrice = action.payload.price;
      state.selectedMainOption = {};
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
    saveItem: (state, action) => {
      state.savedItem.push(action.payload);
    },
    removeSavedItem: (state, action) => {
      state.savedItem.filter(() => {});
    },
    setCurrentStoreCode: (state, action) => {
      console.log('code action', action);
      state.currentStoreCode = action.payload;
    },
    setMainRequired: (state, action) => {
      if (state.selectedMainOption[action.payload.key]?.val) {
        state.totalPrice -= state.selectedMainOption[action.payload.key].price;
        state.totalPrice += action.payload.price;
      } else state.totalPrice += action.payload.price;
      state.selectedMainOption[action.payload.key] = {
        val: action.payload.value,
        price: action.payload.price,
      };
    },
    saveItem: (state, action) => {
      console.log('action saved', action.payload);
      state.savedItem.savedStoreCode = action.payload.storeCode;
      state.savedItem.savedItems.push(action.payload.items);
    },
  },
});

const {actions, reducer} = cartSlice;

export const {
  initOption,
  setMainCount,
  setSubMenu,
  removeSubMenu,
  removeSavedItem,
  saveItem,
  setCurrentStoreCode,

  setMainRequired,
} = actions;
export const cartReducer = reducer;
