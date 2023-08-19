import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import imgReducer from './imgSlice';

const rootReducer = combineReducers({
  user: userReducer,
  img: imgReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
