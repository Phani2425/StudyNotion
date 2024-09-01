import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    step:1,
    //now it is null upon fetching courses an array  willl be assigned to it either empty or having some elements
    courses:null,
    editCourse:false,
    paymentLoading:false,
}

 const courseSlice = createSlice({
    name:'course',
    initialState,
    reducers: {
        setStep : (state,value) => {
            state.step = value.payload;
        },
        setCourses : (state,value)=>{
            state.courses = value.payload;
        },
        setEditCourse : (state,value)=>{
            state.editCourse = value.payload;
        },
        setPaymentLoading : (state,value)=>{
            state.paymentLoading = value.payload;
        },
        resetCourseSlice : (state,value) => {
            state.step = 1;
            state.courses = null;
            state.editCourse = false;
        }
    }
})

export const { setStep, setCourses, setEditCourse, setPaymentLoading, resetCourseSlice } = courseSlice.actions;
export default courseSlice.reducer;