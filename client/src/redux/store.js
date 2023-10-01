import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import imgReducer from './imgSlice';
import clientReducer from './client'
import profileSlice from './profileSlice'
import InvoiceSlice from './invoiceSlice'

const rootReducer = combineReducers({
  user: userReducer,
  img: imgReducer,
  client:clientReducer,
  profile:profileSlice,
  invoice:InvoiceSlice,
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
