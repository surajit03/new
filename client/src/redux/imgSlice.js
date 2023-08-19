import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentImg :null,
    loading:false,
    error:false,
};

export const imgSlice =createSlice({
  name:"img",
  initialState,
  reducers:{
    fetchStart:(state)=>{
        state.loading=true;
    },
    fetchSuccess:(state,action)=>{
        state.loading =false;
        state.currentImg=action.payload;
    },
    fetchFailuer:(state)=>{
        state.loading=false;
        state.error=true;
    }
  }  
});
export const {fetchStart,fetchSuccess,fetchFailuer }=imgSlice.actions

export default imgSlice.reducer;