import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
   totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setTotalItems(state,value) {
            state.totalItems = value.payload;

        },
        //add to cart
        //remove from cart
        //reset cart
    }
});

export const { setToken } = cartSlice.actions;
export default cartSlice.reducer;