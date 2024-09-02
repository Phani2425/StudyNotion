import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    step:1,
    course:null,
    //this says us wheather acourse can be edited or not
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
        setCourse : (state,value)=>{
            state.course = value.payload;
        },
        setEditCourse : (state,value)=>{
            state.editCourse = value.payload;
        },
        setPaymentLoading : (state,value)=>{
            state.paymentLoading = value.payload;
        },
        resetCourseSlice : (state,value) => {
            state.step = 1;
            state.course = null;
            state.editCourse = false;
        }
    }
})

export const { setStep, setCourse, setEditCourse, setPaymentLoading, resetCourseSlice } = courseSlice.actions;
export default courseSlice.reducer;