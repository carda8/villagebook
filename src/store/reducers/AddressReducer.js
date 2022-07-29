import {createSlice} from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'menu',
  initialState: {
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
  },
});

const {actions, reducer} = addressSlice;
export const {setCurrentAdd, setPostData} = actions;
export const addressReducer = reducer;
