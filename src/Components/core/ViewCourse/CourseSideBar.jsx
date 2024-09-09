import React,{useEffect, useState} from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";

const CourseSideBar = ({setReviewModal}) => {

    const location = useLocation();

    const {sectionId, subsectionId} = useParams();

    //it is required bcs expect the active section all other sectio  will be closed
   const [activeStatus, setactiveStatus] = useState(sectionId);
   //the lectue which is playing currently will be highlighted in the sidebar so we need a state variable for that
   const [lecturePlaying, setlecturePlaying] = useState(subsectionId);
   //back button pain navigate bi darkar
   const navigate = useNavigate();

   //fetching data from the redux slices that we have seted in the "viewCourse" page using useeffect hook

   const { courseEntireData, courseSectionData, totalNoOfLectures, completedLectures } = useSelector((state) => state.viewCourse);


   useEffect(() => {
    //a syntax of defining a function and calling it that time
       ;(()=>{
        //now we will try to findout the section currently opened and the id of the lecture currently playing so that we can highlight that

        //finding index of section opened
         const currentSectionIndex = courseEntireData?.courseContent?.findIndex((section) => section._id === sectionId);

         //finding index of cuurnt playing lecture
         const currentLectureIndex = courseEntireData?.courseContent?.[currentSectionIndex]?.subSections?.findIndex((subSection) => subSection._id === subsectionId);

         //finding the id of the lecture so that i can highlight that
         const currentLectureId = courseEntireData?.[currentSectionIndex]?.subSection?.[currentLectureIndex]._id;

         setactiveStatus(courseSectionData?.[currentSectionIndex]?._id);
         setlecturePlaying(currentLectureId);
       })()
   }, [location.pathname, courseEntireData , courseSectionData])

  return (
    <div className=' flex flex-col gap-4 bg-richblack-800 h-screen text-white'>
        <div className='flex justify-between px-4 py-3  '>
        <div className='flex bg-richblack-100 h-9 w-9 rounded-full justify-center items-center text-richblack-800 cursor-pointer' onClick={() => {navigate('/dashboard/enrolled-courses')}}><IoIosArrowBack size={24} /></div>
        <button onClick={() => setReviewModal(true) } className='flex bg-yellow-50
        cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 '>Add Review</button>
        </div>

        <div className="flex flex-col px-4 py-3">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
        </div>


        {/* section and subsection data */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
             {
                courseSectionData?.map((section,index) => (
                    <div
                     className="mt-2 cursor-pointer text-sm text-richblack-5"
                    key={index}
                    onClick={() => {setactiveStatus(section?._id)}}
                    >

                        {/* section */}
                        <div  className="flex flex-row justify-between bg-richblack-600 px-5 py-3">
                            <div className="w-[70%] font-semibold">{section?.sectionName}</div>
                            <div className={`${activeStatus === section?._id ? 'rotate-180' : 'rotate-0'} transition-all duration-200`}><IoIosArrowDown size={22}/></div>
                        </div>

                        {/* subsection of the upper section */}
                        {/* but this will be only vissible when its corresponding section is selected or active */}

                        {
                            activeStatus === section?._id && (
                                <div>
                                    {
                                        section?.subSection?.map((subsection,index) => (
                                            <div key={index}  className={`flex gap-3  px-5 py-2 ${
                                                lecturePlaying === subsection._id
                                                  ? "bg-yellow-200 font-semibold text-richblack-800"
                                                  : "hover:bg-richblack-900"
                                              } `}
                                              onClick={() => {
                                                navigate(
                                                  `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subsection?._id}`
                                                )
                                                setlecturePlaying(subsection._id)
                                              }}>
                                                <input 
                                                readOnly
                                                type="checkbox" checked={completedLectures?.includes(subsection._id) ? true :false} />

                                                <p>{subsection?.title}</p>
                                            </div>


                                        ))
                                    }
                                </div>
                            )
                        }

                    </div>
                ))
             }
        </div>

    </div>
  )
}

export default CourseSideBar