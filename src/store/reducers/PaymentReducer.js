import {createSlice} from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentMethod: '',
  },
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

const {actions, reducer} = paymentSlice;
export const {setPaymentMethod} = actions;
export const paymentReducer = reducer;
