import {createSlice} from '@reduxjs/toolkit';

const couponSlice = createSlice({
  name: 'menu',
  initialState: {storeCoupon: '', systemCoupon: ''},
  reducers: {
    setStoreCoupon: (state, action) => {
      state.storeCoupon = action.payload;
    },
    setSystemCoupon: (state, action) => {
      state.systemCoupon = action.payload;
    },
    resetCoupon: (state, action) => {
      state.storeCoupon = '';
      state.systemCoupon = '';
    },
  },
});

const {actions, reducer} = couponSlice;
export const {setStoreCoupon, setSystemCoupon, resetCoupon} = actions;
export const couponReducer = reducer;
