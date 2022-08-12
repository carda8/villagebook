import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'menu',
  initialState: {searchResult: [], type: '', keyword: ''},
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
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
