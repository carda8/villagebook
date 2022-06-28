import {configureStore} from '@reduxjs/toolkit';
import {btBarReducer} from './reducers/BottomBarReducer';
import {menuReducer} from './reducers/MenuReducer';

export default configureStore({
  reducer: {menuReducer, btBarReducer},
});
