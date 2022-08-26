import {createSlice} from '@reduxjs/toolkit';

const deliverySlice = createSlice({
  name: 'menu',
  initialState: {deliveryInfo: [], isDelivery: true},
  reducers: {
    setDeliveryInfo: (state, action) => {
      state.deliveryInfo = action.payload;
    },
    setIsDelivery: (state, action) => {
      state.isDelivery = action.payload;
    },
  },
});

const {actions, reducer} = deliverySlice;
export const {setDeliveryInfo, setIsDelivery} = actions;
export const deliveryReducer = reducer;
