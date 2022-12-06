import {createSlice} from '@reduxjs/toolkit';

const couponSlice = createSlice({
  name: 'menu',
  initialState: {storeCoupon: '', systemCoupon: '', couponbookData: ''},
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
    setCouponBookMenus: (state, action) => {
      state.couponbookData = action.payload;
    },
  },
});

const {actions, reducer} = couponSlice;
export const {
  setStoreCoupon,
  setSystemCoupon,
  resetCoupon,
  setCouponBookMenus,
} = actions;
export const couponReducer = reducer;
