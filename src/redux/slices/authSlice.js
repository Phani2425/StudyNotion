import { createSlice } from "@reduxjs/toolkit";


//koi eka baar kogin karega to local storage ke andar uska token store kardenge then use access karne ka try karenge agar milgaya then acha baat hai use parse kardo:- why parsing??? ------ BEACUSE IN LOCAL STORAGE THING AREE STORED IN JSON FORMAT SO BEFORE STORING IT WE DO "Josn.stringify()" and after retrieving it we do "JSON.parse()" aur agar nehi mila to yaha pe token ka value null store kardunga


const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;