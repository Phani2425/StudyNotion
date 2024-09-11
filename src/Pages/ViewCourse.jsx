import React, { useEffect, useState } from 'react'
import CourseSideBar from '../Components/core/ViewCourse/CourseSideBar';
import CourseReviewModal from '../Components/core/ViewCourse/CourseReviewModal';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEntireCourseData, setCourseSectionData, setCompletedLectures, setTotalNoOfLectures } from '../redux/slices/viewCourseSlice';
import { getFullDetailsOfCourse } from '../Services/operations/courseDetailAPI';
import VideoDetails from '../Components/core/ViewCourse/VideoDetails';

const ViewCourse = () => {

  const [reviewModal, setReviewModal] = useState(false);
  const {courseId} = useParams();
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
      const setCourseSpecificData = async (courseId, token) => {
          const result = await getFullDetailsOfCourse(courseId,token);

          //now we will use the data we got from the api calling to set the silce states... why are we using slices for storing these data because these will be accessed in more that one components so redux is the best way to do this

          dispatch(setEntireCourseData(result?.courseDetails));
          dispatch(setCourseSectionData(result?.courseDetails?.courseContent));
          dispatch(setCompletedLectures(result?.completedVideos));
          let totalLecture = 0 ;
          result?.courseDetails?.courseContent?.forEach((section) => totalLecture += section.subSection.length);
          dispatch(setTotalNoOfLectures(totalLecture));


      }

      setCourseSpecificData(courseId, token);

         // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className='relative '>
         <div className='fixed left-0 w-[20%] h-screen'>
             <CourseSideBar setReviewModal={setReviewModal}/>
         </div>
         <div className='w-[calc(100vw-20%)] absolute right-0 min-h-[calc(100vh-3.5rem)] bg-richblack-900 p-4 flex flex-col items-start'>
             <VideoDetails/>
             {/* <div >
                <h1></h1>
                <p></p>
             </div> */}
         </div>

         {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} courseId= {courseId}/>}
    </div>
  )
}

export default ViewCourse