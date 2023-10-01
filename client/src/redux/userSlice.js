import {createSlice} from '@reduxjs/toolkit';

const initialState={
    currentUser:null,
    loading:false,
    error:false,
}

export const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading =true;
        },
        loginSuccess:(state,action)=>{
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            state.loading = false;
            state.currentUser=action.payload;
        },
        logingFailure:(state)=>{
            state.loading = false;
            state.error = true;
        },
        logout:(state)=>{
            state.currentUser= null;
            state.loading=false;
            state.error=false;
    localStorage.removeItem('token');

        },

    }
});
 export const {loginStart, loginSuccess,logingFailure,logout}=userSlice.actions;

 export default userSlice.reducer;