import { useSelector } from "react-redux"

import IconBtn from "../../Common/IconBtn"

import {loadStripe} from '@stripe/stripe-js';
import toast from 'react-hot-toast'

// import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.profile)



  const handleBuyCourse = async() => {
    //me buy karne kelie tabhi allow karunga jab user ke paas ek valid authentiaction ka chiz ho aur wo chiz kya ho sakta hai ?????? wo ek token ho skata hai....

    // if(token){
    //   buyCourse(token, [courseId], user, navigate ,dispatch);
    //   return;
    // }

    const stripe = await loadStripe("pk_test_51Pw5u7EYoCAeJ9s3kwZu41RfWGh4Oa96lRI83c2YxUVOC9C4TviS9x5JuT8TTrr6LppZJDtL2j4Z54sOpDYFF54R002oQw3QG4");

    const body = {
       products:cart,
       userId:user._id
    }

    const header = {
      "Content-Type": "application/json"
    } 

    const response = await fetch("http://localhost:4000/api/v1/payment/create-checkout-session" , {
      method:"POST",
      headers:header,
      body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId:session.id
    });

    if(result.error){
      toast.error('Payment failed');
    }

}


  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}