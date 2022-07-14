import {configureStore} from '@reduxjs/toolkit';
import {btBarReducer} from './reducers/BottomBarReducer';
import {cartReducer} from './reducers/CartReducer';
import {categoryReducer} from './reducers/CategoryReducer';
import {menuReducer} from './reducers/MenuReducer';
import {paymentReducer} from './reducers/PaymentReducer';
import {pushReducer} from './reducers/PushReducer';

export default configureStore({
  reducer: {
    menuReducer,
    btBarReducer,
    pushReducer,
    categoryReducer,
    cartReducer,
    paymentReducer,
  },
});
