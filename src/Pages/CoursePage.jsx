import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseDetails } from '../Services/operations/courseDetailAPI';
import RatingStars from '../Components/core/Common/RatingStars';
import { getAverageRating } from '../utils/avgRating';
import CourseBuyCard from '../Components/core/CoursePage/CourseBuyCard';
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineLiveTv } from "react-icons/md";
import ConfirmationModal from "../Components/core/Common/ConfirmationModal";
import Footer from '../Components/core/Common/Footer';

const CoursePage = () => {

  const {courseId} = useParams();
  const [course, setcourse] = useState(null);
  const[loading,setloading] = useState(false); 
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const navigate = useNavigate();

  const [openSectionsArray, setopenSectionsArray] = useState([]);

  const fetchCourseDetails = async (courseId) => {
    setloading(true);  // show loading state before fetching data
    try{
         const result = await getCourseDetails (courseId);
         if(!result){
            console.log('No course found with this id');
            return;
         }
         console.log('result:- ',result);
         setcourse(result);
    }catch(err){
        console.log('Error occured while fetching course details: ',err.message);
        console.error(err.message);
        return;  // return to avoid showing loading state after error occurs.  If you want to show loading state even after error, remove this return statement.
    }finally{
        setloading(false);  // hide loading state after fetching data
    }
  }


  //useEffect chaing(very very itresting concept)
  useEffect(()=> {
     fetchCourseDetails(courseId);
  },[courseId]);

  useEffect(()=> {
     if(course){
        const avgRating = getAverageRating(course?.ratingAndReview);
        console.log(avgRating);
        setAvgReviewCount(avgRating);  // update the average rating when course details are fetched.
     }
     else{
        return;
     }
  },[course]);


  if(loading) {
    return (<div className='h-full w-full flex justify-center items-center'><div className='loader'></div></div>)
  }

  const isOpen = (index) => {
    if(openSectionsArray.length === 0){
      return false;
    }
    else{
      return openSectionsArray.includes(index) ? true : false
    }
  }


  return (
       <>
<div className='bg-richblack-800 flex flex-col items-start'>

{/* section 1 */}
<div className='w-9/12 mx-auto relative text-white flex justify-between items-start py-24'>
   <div className='flex flex-col gap-2'>
      <h1 className='text-3xl font-bold'>{course?.courseName}</h1>
      <p className='text-richblack-300'>{course?.courseDescription}</p>
      <div className='flex gap-1'>
        <span className='text-yellow-50'>{avgReviewCount}</span>
       <RatingStars Review_Count={avgReviewCount} />
       <span>{`(${course?.ratingAndReview?.length} reviews)`}</span>
       <span>{`${course?.studentsEnrolled?.length} students enrolled`}</span>
      </div>
   </div>
   <div className='absolute w-[30%] h-fit p-4 bg-richblack-700 right-0 top-6'>
      <CourseBuyCard course={course} setConfirmationModal={setConfirmationModal}/>
   </div>

</div>


</div>

<div className='bg-richblack-900 w-9/12 mx-auto flex flex-col items-start my-5 '>
        {/* section 2 */}
    <div className= 'w-[65%] text-white flex flex-col gap-7'>
    <div className=' flex flex-col gap-2 p-5 border border-richblack-500'>
       <h1 className='text-2xl font-semibold'>What you'll learn</h1>
       <p className='text-richblack-300'>{course?.whatYouWillLearn}</p>
    </div>
    <div className='flex flex-col gap-3'>
     <h1 className='text-2xl font-semibold'>Course Content</h1>
     <div className='flex justify-between items-center'>
     <p>{`${course?.courseContent?.length} section(s) ${(course?.courseContent?.flatMap((section)=> {return section.subSection}))?.length} lecture(s) 10s total length`}</p>
     <div className='text-yellow-50 cursor-pointer' onClick={()=>{
      console.log('collapsing all sections');
      setopenSectionsArray([]);
      console.log('printing the arra7y:- ', openSectionsArray)}}>Collapse all sections</div>
     </div>
     
     <div>
        {course?.courseContent?.map((section,index) => (
          <details key={index}  open={isOpen(index)} onClick={()=>{
            console.log(openSectionsArray);
            setopenSectionsArray(prevSections => prevSections.includes(index)? prevSections.filter(i => i!== index) : [...prevSections, index]);
          }}>
            <summary className='flex px-4 py-3 gap-3 items-center cursor-pointer bg-richblack-600 justify-between'>
            <div className='flex gap-2 items-center '>
            <MdKeyboardArrowDown size={24} />
            <span className='text-lg'>{section.sectionName}</span>
            </div>

            <div className='text-yellow-100'>
              {`${section?.subSection.length} lecture(s)`}
            </div>
            </summary>

            <div className='flex flex-col gap-2'>
              {section?.subSection?.map((subSection,index) => (
                
                    <div className='bg-richblack-900 px-4 py-3 flex-col gap-1' key={index} >
                        <div className='flex gap-3' onClick={(e)=>{e.stopPropagation()}}>
                        <MdOutlineLiveTv />
                        <p>{subSection?.title}</p>
                        </div>
                        <p className='text-richblack-300 mx-6'>{subSection?.subSectionDescription}</p>
                    </div>
               
              ))}
            </div>
          </details>
        ))}
     </div>

     {/* authors div */}
     <div className='flex flex-col gap-4 mt-10'>
       <h1 className='text-2xl font-semibold'>Author</h1>
       <div className='flex flex-row gap-2 items-center'>
        <img className='h-9 w-9 rounded-full' src={course?.instructor?.image} alt='instructorImage'/>
        <span className='text-lg text-richblack-25'>{`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}</span>
       </div>
       <p className=' text-richblack-5'>I will be leading this course with my utmost dedication and dicipline........</p>
     </div>
    </div>
 </div>
</div>

<Footer/>

  {
    confirmationModal && 
    (<ConfirmationModal
    text1='You are not loged in'
    text2="login to proceed"
    btn1Text='Login'
    btn1Handler = {() => {navigate('/login')}}
    btn2Text = 'Cancel'
    btn2Handler = {()=>{setConfirmationModal(false)}}
    />)
  }


       </>
  )
}

export default CoursePage