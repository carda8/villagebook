import {createSlice} from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentMethod: '',
    addData: '',
    deliveryData: '',
    lastPrice: '',
    isDelivery: '',
  },
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setLastPrice: (state, action) => {
      state.lastPrice = action.payload;
    },
  },
});

const {actions, reducer} = paymentSlice;
export const {setPaymentMethod, setLastPrice} = actions;
export const paymentReducer = reducer;
