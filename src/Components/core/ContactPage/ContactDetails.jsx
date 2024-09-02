import React from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

const ContactDetails = () => {
  return (
    <div className='bg-richblack-800 h-[400px] w-[460px] rounded-xl mx-auto  '>

      <div className='flex flex-col justify-center mt-3'>
      <div className=' flex flex-row text-richblack-25 relative gap-2'>
      <HiChatBubbleLeftRight className='text-richblack-100 h-5 w-5 mt-[25px] ml-[40px] absolute'/>
        <div className='flex flex-col w-[60%] p-6 ml-[40px] '>
           <h1 className='font-bold px-2'>Chat on us</h1>
           <p className=' text-richblack-100 px-2 text-[0.8rem]'>Our friendly team is here to help.

info@studynotion.com</p>
        </div>
      </div>

      <div className='flex flex-row text-richblack-25 relative gap-2'>
      <FaEarthAmericas  className='text-richblack-100 h-5 w-5 mt-[25px] ml-[40px] absolute'/>
        <div className='flex flex-col w-[70%] p-6 ml-[40px]'>
           <h1 className='font-bold px-2'>Visit us</h1>
           <p className=' text-richblack-100 px-2 text-[0.8rem]'>Come and say hello at our office HQ.

Sorry Bhai Office Abhi Bani Nehi hai....</p>
        </div>
      </div>


      <div className='flex flex-row text-richblack-25 relative gap-2'>
      <IoCall className='text-richblack-100 h-5 w-5 mt-[25px] ml-[40px] absolute'/>
        <div className='flex flex-col w-[60%] p-6 ml-[40px]'>
           <h1 className='font-bold px-2'>Call us</h1>
           <p className=' text-richblack-100 px-2 text-[0.8rem]'>Mon - Fri From 8am to 5pm

+123 456 7869</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ContactDetails


//<FaEarthAmericas />
//<IoCall />