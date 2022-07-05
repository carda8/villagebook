import {createSlice} from '@reduxjs/toolkit';

const CategorySlice = createSlice({
  name: 'category',
  initialState: {
    currentCategory: '',
    currentFilter: '',
  },
  reducers: {
    setcurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setcurrentFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
});

const {actions, reducer} = CategorySlice;
export const {setcurrentCategory, setcurrentFilter} = actions;
export const categoryReducer = reducer;
