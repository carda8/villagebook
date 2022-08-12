import {createSlice} from '@reduxjs/toolkit';

const deliverySlice = createSlice({
  name: 'menu',
  initialState: {deliveryInfo: []},
  reducers: {
    setDeliveryInfo: (state, action) => {
      state.deliveryInfo = action.payload;
    },
  },
});

const {actions, reducer} = deliverySlice;
export const {setDeliveryInfo} = actions;
export const deliveryReducer = reducer;
