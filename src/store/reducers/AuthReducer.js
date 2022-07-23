import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'menu',
  initialState: {userInfo: '', autoLogin: '', fcmToken: ''},
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
  },
});

const {actions, reducer} = authSlice;
export const {setUserInfo, setFcmToken} = actions;
export const authReducer = reducer;
