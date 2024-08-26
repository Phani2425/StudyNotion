import React from 'react'
import LoginForm from '../Form/LoginForm';
import SignupForm from '../Form/SignupForm';
import frameimg from '../../../assets/Images/frame.png';
import { FcGoogle } from "react-icons/fc";
import HighlightText from '../HomePage/HighlightText';

const Template = ({title,desc1,desc2,image,formtype,setLoggedIn}) => {
  return (
    <div className='flex justify-between items-center mx-auto mt-12 mb-8 w-[70%] text-richblack-25 gap-5'>
        {/* left side div */}
        <div className='w-[45%]'>

          <div className='flex flex-col gap-2'>
          <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
           <h4 className='text-[1.125rem] leading-[1.625rem] mt-4 text-richblack-100'>{desc1}</h4>
           <h4 className='text-[1.125rem] leading-[1.625rem] text-blue-100 italic'><HighlightText text={desc2} color={0}></HighlightText></h4>
          </div>

          
            {formtype === 'signup' ? (<SignupForm setLoggedIn={setLoggedIn}/>) : (<LoginForm setLoggedIn={setLoggedIn}/>)}
          
          {/* buttons div */}
          <div className=''>
            <span className='flex justify-center items-center'><div className='h-[1px] w-[50%] bg-richblack-700'/> <pre className='font-bold text-richblack-700'> OR </pre> <div className='h-[1px] w-[50%] bg-richblack-700'/></span>
            <button className='w-full mt-4 flex justify-center items-center border-[2px] rounded-md border-richblack-100 text-richblack-100 font-semibold px-[12px] py-[8px] gap-2 hover:scale-95 transition-transform duration-300'><FcGoogle /> Sign in with Goggle</button>
          </div>
        </div>

    {/* right  side div */}
    <div className='relative max-w-[450px] '>
        <img className='w-[458px] h-[400px]' src={frameimg} alt='frame' loading='lazy'></img>
        <img className='w-[458px] h-[390px] absolute top-[-10px] left-[-15px]' src={image} alt='mainImage' loading='lazy'></img>
    </div>

    </div>
  )
}

export default Template