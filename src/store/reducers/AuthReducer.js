import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'menu',
  initialState: {userInfo: ''},
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

const {actions, reducer} = authSlice;
export const {setUserInfo} = actions;
export const authReducer = reducer;
