import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'category',
  initialState: {
    storeCode: '',
    mainCount: 1,
    mainItemCount: [], //사이드(추가) 제외 본품 수량
    mainReqired: '',
    subItems: [], //{itemCode: '', itemCount: '', itemPrice: ''}
    totalPrice: 0,
  },
  reducers: {
    setMainCount: (state, action) => {
      state.mainCount = action.payload.count;
      state.totalPrice = action.payload.price;
    },
    setSubMenu: (state, action) => {
      state.subItems.push([action.payload]);
      state.totalPrice += action.payload[0].itemPrice;
    },
    removeSubMenu: (state, action) => {
      state.subItems.pop();
      state.totalPrice -= action.payload[0].itemPrice;
    },
    setRequired: (state, action) => {
      state.mainReqired = action.payload;
    },
  },
});

const {actions, reducer} = cartSlice;
export const {setMainCount, setSubMenu, removeSubMenu, setRequired} = actions;
export const cartReducer = reducer;
