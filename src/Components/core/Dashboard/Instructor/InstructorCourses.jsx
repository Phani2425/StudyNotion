import React, { useEffect, useState } from 'react'
import { setCourses } from '../../../../redux/slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import {getAllCoursesOfInstructor} from '../../../../Services/operations/courseDetailAPI'
import CoursesTable from './CourseTable';
import IconBtn from '../../Common/IconBtn';
import { IoIosAddCircleOutline } from "react-icons/io";

const InstructorCourses = () => {

  //loading will be true before calling the function of service layer and false whrn that function return us the result and we set that result to course state variable of the corseSlice
  const [loading,setloading] = useState(false);
 //getting instance of dispatch so that i can dispatch a action of setting the course state variable equal to the fetched courses
 const dispatch = useDispatch(); 

 //getting token which will bee passed to function of service layer and inturn it will be passed to the backend api as "Authorisation header"
 const {token} = useSelector((state) => state.auth);

  const fetchAllCoursesForInstructor = async () => {
    setloading(true);
    try{

     const fetchedCourses = await getAllCoursesOfInstructor(token);
     dispatch(setCourses(fetchedCourses));
     setloading(false);

    }catch(err){
      console.log('error occured while calling function from service layer :- ',err.message);
      setloading(false);
    }
  }

  useEffect(()=>{
     fetchAllCoursesForInstructor();
  },[]);

  return (
    <div>

       {
        loading ? <div className='flex justify-center items-center w-full h-full'><div className='loading'></div></div> : 
        (
          <div className='flex flex-col gap-6 items-start p-5'>
              <h1 className='text-richblack-50 text-4xl font-bold'>My Courses</h1>
              <CoursesTable/>
              <div className='self-end'>
              <IconBtn
              text={'New'}
              
              >
                <IoIosAddCircleOutline />
              </IconBtn>
              </div>
          </div>
        )
       }

    </div>
  )
}

export default InstructorCourses