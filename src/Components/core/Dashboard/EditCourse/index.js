import React, { useEffect, useState } from 'react'
import RenderSteps from '../AddCourse/RenderSteps'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse,setEditCourse } from '../../../../redux/slices/courseSlice';
import { getCourseDetails } from '../../../../Services/operations/courseDetailAPI';

const EditCourse = () => {

   const {courseId} = useParams();
   const dispatch = useDispatch();

   const {course} = useSelector((state) => state.course);
   const {token} = useSelector((state) => state.auth);

   const [loading,setLoading] = useState(false);


   //function which will make call to the service layer for getting the course details
   const fetchCourseDetails = async () => {
    setLoading(true);
    try{
        const result = await getCourseDetails (courseId);
        if(result){
            //set the course variable from which the whole course addition form will take data and show us
            dispatch(setCourse(result));

            //printing the course
            console.log('data from the course details', result);

            //set the form in edit mode so that form prefills all the data as per the logic we have written in them
            dispatch(setEditCourse(true));
        }
    }catch(err){
        console.log('error occured while fetching course details from courseId in editCourse folder:- ', err.message);
        console.error(err.message);

    }finally{
        setLoading(false);
    }
   }

   //page load hote hii hame course details chahiye fromthe course id we got from the url
   useEffect(() => {
      fetchCourseDetails();
   },[]);


  return (
    <div className='flex flex-col items-center gap-5'>
        <h1 className='text-richblack-50 font-bold text-3xl'>Edit Course</h1>

        {
            loading ? <div className='loading'></div> : (course ? (<RenderSteps/>) : (<div className='text-white text-2xl font-semibold'>Course Not Found</div>)) 
        }
         
    </div>
  )
}

export default EditCourse