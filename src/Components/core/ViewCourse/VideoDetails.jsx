import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateCompletedLectures } from '../../../redux/slices/viewCourseSlice';
import "video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';
import IconBtn from '../Common/IconBtn';
import { markLectureAsComplete } from '../../../Services/operations/courseDetailAPI';

const VideoDetails = () => {

    const {courseId, sectionId, subsectionId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const playerRef = useRef();
    const {token} = useSelector((state) => state.auth);
    const {courseSectionData, courseEntireData, completedLectures, totalNoOfLectures } = useSelector((state) => state.viewCourse);

    const [videoData, setvideoData] = useState([]);
    const [videoEnded, setvideoEnded] = useState(false);
    const [loading, setloading] = useState(false);
    const [PreviewSource, setPreviewSource] = useState('');

    useEffect(() => {
        ;(async () => {
          if (!courseSectionData.length) return
          if (!courseId && !sectionId && !subsectionId) {
            navigate(`/dashboard/enrolled-courses`)
          } else {
            // console.log("courseSectionData", courseSectionData)
            const filteredData = courseSectionData.filter(
              (course) => course._id === sectionId
            )
            // console.log("filteredData", filteredData)
            const filteredVideoData = filteredData?.[0]?.subSection.filter(
              (data) => data._id === subsectionId
            )
            // console.log("filteredVideoData", filteredVideoData)
            setvideoData(filteredVideoData[0])
            setPreviewSource(courseEntireData.thumbnail)
            setvideoEnded(false);
          }
        })()
      }, [courseSectionData, courseEntireData, location.pathname])

  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subsectionId)

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  // go to the next video
  const goToNextVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subsectionId)

    // console.log("no of subsections", noOfSubsections)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection?.[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subsectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  // go to the previous video
  const goToPrevVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subsectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
          {/* dummy code */}
      setloading(true);

      try{
          await markLectureAsComplete(courseId,subsectionId, token);


          dispatch(updateCompletedLectures(subsectionId));

      }catch(err){
        console.log('error occurred while updating completion status: ',err.message);
        console.error(err.message);
      }

      setloading(false);
  }

  return (
    <div className='w-full relative'>

        {
            !videoData ? (<div className='text-white text-3xl font-bold'>No Data Found</div>) : 
            (
                <Player
                ref={playerRef}
                playsInline
                aspectRatio='16:9' 
                onEnded={() => setvideoEnded(true)}
                src={videoData?.videoUrl}
                
                >

                    {
                        videoEnded && (
                            <div className='absolute top-0 left-0 flex flex-col justify-center items-center z-50 bg-transparent w-full h-full gap-4'>
                                {
                                    !completedLectures.includes(subsectionId) && (
                                        <IconBtn
                                        disabled={loading}
                                        onclick={() => {handleLectureCompletion()}}
                                        text={!loading ? 'Mark As Completed' : 'Loading'}
                                        />
                                    )
                                }

                                <IconBtn
                                disabled={loading}
                                onclick={() => {
                                    playerRef.current.seek(0);
                                    setvideoEnded(false);
                                
                                } }
                                text={'ReWatch'}
                                />

                                <div>
                                    {
                                        (!isFirstVideo()) && (
                                            <IconBtn
                                            disabled={loading}
                                            onclick={() => {goToPrevVideo()}}
                                            text={'Previous'}
                                            />
                                        )

                                        (!isLastVideo()) && (
                                            <IconBtn
                                            disabled={loading}
                                            onclick={() => {goToNextVideo()}}
                                            text={'Next'}
                                            />
                                        )
                                    }
                                </div>


                            </div> 
                        )
                    }


                </Player>
            )
            
        }



    </div>
  )
}

export default VideoDetails