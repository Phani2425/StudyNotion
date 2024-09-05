import React from 'react'
import { MdArrowRight } from "react-icons/md";
import { addToCart } from '../../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

const CourseBuyCard = ({course}) => {

  const dispatch = useDispatch();

  return (
    <div className='text-white flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
            <img src={course?.thumbnail} className='rounded-lg'/>
            <h1 className='self-start text-2xl font-bold' >{`Rs. ${course?.price}`}</h1>
        </div>
        <div className='flex flex-col gap-3'>
            <button className='bg-yellow-50 w-full text-black  py-2 px-4 rounded-md'>Buy Now</button>
            <button onClick={()=> {dispatch(addToCart(course))}} className='bg-richblack-800 rounded-md w-full px-3 py-2'>Add to Cart</button>
        </div>
        <p className='self-center text-richblack-300'>30 Days Money Back Guarentee</p>
        <div>
            <h2 className='text-lg '>This Course Includes:- </h2>
            <ul className='text-caribbeangreen-200 flex flex-col gap-2'>
                <li className='flex gap-1 items-center'><MdArrowRight /><span>8 hours of lectures</span></li>
                <li className='flex gap-1 items-center'><MdArrowRight /><span>End to end projects</span></li>
            </ul>
        </div>
    </div>
  )
}

export default CourseBuyCard