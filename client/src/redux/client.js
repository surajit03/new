import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentClient: [],
    loading: false,
    error: false,
    currentPage: null,
    numberOfPages: null,
}

export const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        endLoading: (state) => {
            state.loading = false;
        },
        fetchClient: (state, action) => {
            state.currentClient = action.payload;
        },

        fetchClientByUser: (state, action) => {
            try {
              state.currentClient = action.payload;
            } catch (error) {
              console.error('Error processing fetchClientByUser action:', error);
            }
          },
          
          
        allClient: (state,action) => {
            state.currentClient = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.numberOfPages = action.payload.numberOfPages;

        },
        addNewClient: (state,action) => {
            state.currentClient = [action.payload, ...state.currentClient];

        },
        updateClient: (state,action) => {
            state.currentClient = state.currentClient.map((client) => (client._id === action.payload._id ? action.payload : client));

        }, deleteClient: (state,action) => {
            state.currentClient = state.currentClient.filter((client) => client._id !== action.payload);

        },

    }
});
export const { startLoading, endLoading, fetchClient, fetchClientByUser,allClient, addNewClient,updateClient,deleteClient} = clientSlice.actions;

export default clientSlice.reducer;