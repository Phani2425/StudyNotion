import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../Common/IconBtn";
import { FaEdit } from "react-icons/fa";


const Profile = () => {
  const { user } = useSelector((state) => state.profile);
  console.log(user);
  const navigate = useNavigate();

  const editFunction = () => {
      navigate('/dashboard/settings');
  }

  return (
    <div className="flex flex-col text-white gap-5">
      <h1 className="font-bold text-3xl mb-5">My Profile</h1>

      <div className="flex justify-between bg-richblack-800 px-7 py-9 w-full rounded-lg">
        <div className="flex gap-4">
          <img src={`${user?.image}`} className="rounded-full w-12 h-12" />
          <div>
             <h2 className="font-semibold text-lg">{user?.firstName} {user.lastName}</h2>
             <p className="text-richblack-100">{user?.email}</p>
          </div>
        </div>
        <div className="self-start">
        <IconBtn text='Edit' onclick={editFunction} disabled={false} type={'button'}>
           <FaEdit />
        </IconBtn>
        </div>
      </div>

      {/* about section */}
      <div className="flex justify-between bg-richblack-800 px-7 py-9 w-full rounded-lg h-fit">
        
          <div className="flex flex-col justify-between  gap-4">
             <h2 className="font-semibold text-base">About</h2>
             <p className="text-richblack-100">{user?.additionalDetails?.about ?? 'Share Something About Yourself.'}</p>
          </div>
        
        
        <div className="self-start">
        <IconBtn text='Edit' onclick={editFunction} disabled={false} type={'button'}>
           <FaEdit />
        </IconBtn>
        </div>
      </div>


      {/* personal details section */}
      <div className="flex justify-between bg-richblack-800 px-7 py-9 w-full rounded-lg h-fit">
        
        <div>
          <h2 className="font-semibold text-base mb-3">Personal Details</h2>

          <div className="flex max-w-[500px] justify-between gap-16">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNo ?? "Add Contact Number"}
              </p>
            </div>
            {/* <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div> */}
          </div>
        </div>
        </div>
      
      
      <div className="self-start">
      <IconBtn text='Edit' onclick={editFunction} disabled={false} type={'button'}>
         <FaEdit />
      </IconBtn>
      </div>
    </div>

      

    </div>
  );
};

export default Profile;
