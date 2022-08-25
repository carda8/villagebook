import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'menu',
  initialState: {
    searchResult: [],
    foodResult: [],
    marketResult: [],
    lifestyleResult: [],
    type: '',
    keyword: '',
  },
  reducers: {
    setSearchResult: (state, action) => {
      switch (action.payload.type) {
        case 'food':
          state.foodResult = action.payload.item;
          // console.log(action.payload);
          break;
        case 'market':
          state.marketResult = action.payload.item;
          // console.log(action.payload);
          break;
        case 'lifestyle':
          state.lifestyleResult = action.payload.item;
          // console.log(action.payload);
          break;
        default:
          break;
      }
    },
    setType: (state, action) => {
      state.type = action.payload.type;
      state.keyword = action.payload.keyword;
    },
  },
});

const {actions, reducer} = searchSlice;
export const {setSearchResult, setType} = actions;
export const searchReducer = reducer;
