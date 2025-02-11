import React from 'react'
import ContactDetails from '../Components/core/ContactPage/ContactDetails'
import ContactForm from '../Components/core/ContactPage/ContactForm'
import ReviewSlider from '../Components/core/Common/ReviewSlider'
import Footer from '../Components/core/Common/Footer'

const ContactUs = () => {
  return (
    <div>
      <div className=' lg:w-9/12 mx-auto flex flex-col lg:flex-row gap-7 justify-center mt-[80px]'>
        <ContactDetails/>
        <ContactForm/>
      </div>
      
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviews from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* ReviewSlider */}
        <ReviewSlider />
      </div>
        
       <Footer/>

    </div>
  )
}

export default ContactUs