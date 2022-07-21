import {createSlice} from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentMethod: '',
    addData: '',
    deliveryData: '',
    lastPrice: '',
    isDelivery: true,
    orderResult: {orderResultData: '', summitedData: ''},
  },
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setLastPrice: (state, action) => {
      state.lastPrice = action.payload.price;
    },
    setIsDeliveryStore: (state, action) => {
      state.isDelivery = action.payload;
    },
    setDeliveryData: (state, action) => {
      state.deliveryData = action.payload;
    },
    setOrderResult: (state, action) => {
      state.orderResult = action.payload;
    },
  },
});

const {actions, reducer} = paymentSlice;
export const {
  setPaymentMethod,
  setLastPrice,
  setIsDeliveryStore,
  setDeliveryData,
  setOrderResult,
} = actions;
export const paymentReducer = reducer;
