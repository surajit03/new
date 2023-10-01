import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profiles:null,
    loading: false,
    error: false,
}

export const profileSlice = createSlice({
    name: "profiles",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        endLoading: (state) => {
            state.loading = false;
        },
        fetchProfile: (state, action) => {
            state.loading = false;
            state.profiles = action.payload;
        },
        fetchProfileByUser: (state,action) => {
            state.loading = false;
            state.profiles = action.payload.data;

        },
        creatProfile: (state,action) => {
            state.profiles = [action.payload, ...state.profiles];

        },
        updateProfile: (state,action) => {
            state.profiles = state.profiles.map((profile) => (profile._id === action.payload._id ? action.payload : profile));

        }, deleteClient: (state,action) => {
            state.profiles = state.profiles.filter((profile) => profile._id !== action.payload);

        },

    }
});
export const { startLoading, endLoading, fetchProfile, fetchProfileByUser, creatProfile,updateProfile,deleteClient} = profileSlice.actions;

export default profileSlice.reducer;