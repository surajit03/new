import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice';

// const rootReducer =combineReducers({user:userReducer,})

export default configureStore({
    reducer:{
        user :userReducer
    },
})