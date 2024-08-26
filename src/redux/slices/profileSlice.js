import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user:null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setToken(state,value) {
            state.user = value.payload;

        }
    }
});

export const { setToken } = profileSlice.actions;
export default profileSlice.reducer;