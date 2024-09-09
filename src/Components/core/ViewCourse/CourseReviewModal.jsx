import React, { useState } from 'react'
import { useReducer } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import GiveRating from './GiveRating';
import { saveReview } from '../../../Services/operations/courseDetailAPI';

const CourseReviewModal = ({setReviewModal, courseId}) => {

  const [rating, setrating] = useState(0);
  const [review, setreview] = useState('');

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);

  const refObject = useReducer({});

  const clickHandler = (e) => {
    if(e.target === refObject.current){
        setReviewModal(false);
    }
  }

  const changeHandler = (e) => {
    setreview(e.target.value);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    // save the review
    await saveReview(courseId, rating, review, token);
     setReviewModal(false);
  }



  return (
    <div ref={refObject} className='flex justify-center items-center inset-0 backdrop-blur-md text-white w-screen h-screen' onClick={clickHandler}>

        <div  className='flex flex-col w-[40%] h-fit'>
            <div className='flex px-3 py-3 justify-between items-center bg-richblack-700 '>
                <h1>Add Review</h1>
                <RxCross2 size={22} className='hover:rotate-90 transition-all duration-200 cursor-pointer' onClick={() => {setReviewModal(false)}} />
            </div>
            <div className='bg-richblack-800 flex flex-col px-5 py-5 items-center gap-4'>


            <div className='flex gap-2 justify-center items-center'>
                <img src={user.image} alt="userImage" className='w-12 h-12 rounded-full' />
                <div className='flex flex-col gap-1 items-start justify-center'>
                    <h1>{`${user.firstName} ${user.lastName}`}</h1>
                    <p className='text-richblack-300'>Posting Publicly</p>
                </div>

            </div>

            <GiveRating  setrating={setrating} />

            <div className='w-[90%]'>
                <label htmlFor="review">Add Your Experience</label>
                <textarea 
                rows={6}
                placeholder='Write your review here...' className='rounded-sm bg-richblack-700 focus:outline-none placeholder:text-richblack-500 text-white p-2 w-full ' id='review' onChange={changeHandler} />
            </div>

            <div className="mt-2 flex w-11/12 justify-end gap-x-2">
              <button
              type='button'
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Cancel
              </button>
              <button
              type='submit'
              onClick={submitHandler}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-100 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                save
              </button>
             </div>

            </div>

        </div>

    </div>
  )
}

export default CourseReviewModal