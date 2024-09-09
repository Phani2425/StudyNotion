import React from 'react'
import { MdArrowRight } from "react-icons/md";
import { addToCart } from '../../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../../../Services/operations/studentFeaturesAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { FaShareSquare } from "react-icons/fa";
import toast from 'react-hot-toast';


const CourseBuyCard = ({course,setConfirmationModal}) => {


  const {token} = useSelector((state)=> state.auth);
  const {user} = useSelector((state)=> state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {courseId} = useParams();

  const {cart} = useSelector((state)=>state.cart);


  const handleBuyCourse = async() => {

      // if(token){
      //   buyCourse(token, [courseId], user, navigate ,dispatch);
      //   return;
      // }

    //me buy karne kelie tabhi allow karunga jab user ke paas ek valid authentiaction ka chiz ho aur wo chiz kya ho sakta hai ?????? wo ek token ho skata hai.... and wo ek student ho warna buy keliye allow nehi karenge

     if(token && user.accountType === 'Student'){
        const stripe = await loadStripe("pk_test_51Pw5u7EYoCAeJ9s3kwZu41RfWGh4Oa96lRI83c2YxUVOC9C4TviS9x5JuT8TTrr6LppZJDtL2j4Z54sOpDYFF54R002oQw3QG4");

        const body = {
           products:[{...course}],
           userId:user._id
        }
  
        const headers = {
          "Content-Type": "application/json",
          
        } 
  
        const response = await fetch("http://localhost:4000/api/v1/payment/create-checkout-session" , {
          method:"POST",
          headers:headers,
          body:JSON.stringify(body)
        });
  
        const session = await response.json();
  
        const result = stripe.redirectToCheckout({
          sessionId:session.id
        });
  
        if(result.error){
          console.log(result.error);
        }
     }

     else{
        setConfirmationModal(true);
     }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to your clipboard')
  }

  const addToCartHandler = () => {
    if(user && user.accountType === 'Student'){
        dispatch(addToCart(course))
    }
    else{
        toast.error("Only student are allowed to buy courses")
    }
  }

  return (
    <div className='text-white flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
            <img src={course?.thumbnail} className='rounded-lg'/>
            <h1 className='self-start text-2xl font-bold' >{`Rs. ${course?.price}`}</h1>
        </div>
        <div className='flex flex-col gap-3'>
            <button  className='bg-yellow-50 w-full text-black  py-2 px-4 rounded-md' 
            onClick={
                user && course?.studentsEnrolled?.includes(user?._id) ? () => {navigate('/dashboard/enrolled-courses')}  : handleBuyCourse
            } >
                {
                    user && course?.studentsEnrolled?.includes(user?._id) ? 'Go to Course' : 'Buy Now'
                }
            </button>
               {
                 user && course?.studentsEnrolled?.includes(user?._id) ? null :
                 
                    cart?.find((courseInCart) => courseInCart?._id === course?._id) ? (<button onClick={() => {navigate('/dashboard/cart')}} className='bg-richblack-800 rounded-md w-full px-3 py-2'>View in Cart</button>) : (<button onClick={addToCartHandler} className='bg-richblack-800 rounded-md w-full px-3 py-2'>Add to Cart</button>)
                 
               }
        </div>
        <p className='self-center text-richblack-300'>30 Days Money Back Guarentee</p>
        <div>
            <h2 className='text-lg '>This Course Includes:- </h2>
            <ul className='text-caribbeangreen-200 flex flex-col gap-2'>
                <li className='flex gap-1 items-center'><MdArrowRight /><span>8 hours of lectures</span></li>
                <li className='flex gap-1 items-center'><MdArrowRight /><span>End to end projects</span></li>
            </ul>
        </div>

        
            <button className='mt-3 flex gap-3 items-center text-yellow-100 justify-center ' onClick={handleShare}>
            <FaShareSquare />
                <span>Share</span>
            </button>
        
    </div>
  )
}

export default CourseBuyCard