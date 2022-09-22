import {createSlice} from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'menu',
  initialState: {
    trigger: false,
    currentAdd: '',
    postData: {addrId: '', addrMain: '', addrSub: '', zipCode: ''},
  },
  reducers: {
    setCurrentAdd: (state, action) => {
      state.currentAdd = action.payload;
    },
    setPostData: (state, action) => {
      state.postData = action.payload;
    },
    setTrigger: (state, action) => {
      state.trigger = action.payload;
    },
  },
});

const {actions, reducer} = addressSlice;
export const {setCurrentAdd, setPostData, setTrigger} = actions;
export const addressReducer = reducer;
