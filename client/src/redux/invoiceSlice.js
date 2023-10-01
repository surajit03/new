import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoices:null,
    loading: false,
    error: false,
}

export const InvoiceSlice = createSlice({
    name: "invoices",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        endLoading: (state) => {
            state.loading = false;
        },
        fetchAll: (state, action) => {
            state.invoices = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.numberOfPages = action.payload.numberOfPages;

        },
        fetchInvoiceByUser: (state,action) => {
            state.invoices = action.payload.data;

        },
        getInvoice: (state,action) => {
            state.invoices = action.payload;

        },
        creatInvoice: (state,action) => {
            state.invoices = [action.payload, ...state.invoices];

        },
        updateInvoice: (state,action) => {
            state.invoices = state.invoices.map((invoice) => (invoice._id === action.payload._id ? action.payload : invoice));

        }, 
        deleteInvoice: (state,action) => {
            state.invoices = state.invoices.filter((invoice) => invoice._id !== action.payload);

        },

    }
});
export const { startLoading, endLoading, fetchAll, fetchInvoiceByUser, getInvoice,creatInvoice,updateInvoice,deleteInvoice} = InvoiceSlice.actions;

export default InvoiceSlice.reducer;