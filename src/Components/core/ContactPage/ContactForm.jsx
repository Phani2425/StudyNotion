import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactForm = () => {
  return (
    <div className=''>
    <div className='mx-auto flex flex-col justify-between w-[550px] border border-richblack-25 border-opacity-20 rounded-xl p-7'>
    <div className='flex flex-col items-center'>
    <h1 className='font-semibold text-[1.75rem] text-white'>
          Got a Idea? We've got the skills. Let's team up
       </h1>
       <p className='text-sm text-richblack-300 -ml-[150px]'>
      Tell us more about yourself and what you're got in mind.
       </p>
    </div>
       <div>
      <ContactUsForm/>
       </div>
    </div>
    </div>
  )
}

export default ContactForm

//border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col