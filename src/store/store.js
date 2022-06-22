import {configureStore} from '@reduxjs/toolkit';
import {menuReducer} from './reducers/MenuReducer';

export default configureStore({
  reducer: {menuReducer},
});
