import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../Common/IconBtn';
import { FiUpload } from "react-icons/fi";

const Setting = () => {

  const{user} = useSelector((state)=>state.auth);

  return (
    <div className="flex flex-col text-white gap-5">
    <h1 className="font-bold text-3xl mb-5">Edit Profile</h1>

    <div className="flex justify-between bg-richblack-800 px-7 py-9 w-full rounded-lg">
      <div className="flex gap-4">
        <img src={`http://${user?.image}`} className="rounded-full w-12 h-12" />
        <div>
           <h2 className="font-semibold text-lg">Change Profile Picture</h2>
           
           {/* section for photo browsing and uploading */}
           <div>
                <button className='bg-richblack-600'>
                    Select
                    <input type="file" name="profilepic" id="profile" />
                </button>

                {/* as this button have a icon so we will use icon button */}

                 <IconBtn text={'Upload'} onclick={uploadToCloudinary}>
                 <FiUpload />
                 </IconBtn>

           </div>
        </div>
      </div>
 
    </div>

    {/* about section */}
    <div className="flex justify-between bg-richblack-800 px-7 py-9 w-full rounded-lg h-fit">
      
        <div className="flex flex-col justify-between  gap-4">
           <h2 className="font-semibold text-base">About</h2>
           <p className="text-richblack-100">Share Something About Yourself.</p>
        </div>
    </div>
  </div>
  )
}

export default Setting