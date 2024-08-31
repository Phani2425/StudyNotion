import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../../Services/operations/profileAPI";

const ProfileInformation = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const refObject = useRef();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  function submitHandler(data) {
    dispatch(updateProfile(token, data));
  }

  useEffect(() => {
    reset({
      dateOfBirth: user?.additionaldetails?.dateOfBirth,
      gender: user?.additionaldetails?.gender,
      contactNo: user?.additionaldetails?.contactNo,
      about: user?.additionaldetails?.about,
    });
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="flex flex-col gap-3 mb-5">


      <div className="flex flex-col justify-between bg-richblack-800 px-12 py-9 w-full rounded-lg">
        <h1 className="font-semibold text-base mb-3">Profile Information</h1>

        <form onSubmit={handleSubmit(submitHandler)} className="grid grid-cols-1 lg:grid-cols-2 w-full gap-x-10 gap-y-4">
          <div className="flex flex-col gap-1 items-start text-white">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={user.firstName}
              readOnly
              className="bg-richblack-700 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25 w-full focus:outline-none  "
            />
          </div>
          <div className="flex flex-col gap-1 items-start text-white">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={user.lastName}
              readOnly
              className="bg-richblack-700 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25 w-full focus:outline-none "
            />
          </div>
          <div className="flex flex-col gap-1 items-start text-white">
            <label htmlFor="DOB">Date of Birth</label>
            <input
              type="date"
              id="DOB"
              name="DOB"
              value={user?.additionaldetails?.dateOfBirth}
              className="bg-richblack-700 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25 w-full focus:outline-none  placeholder:text-richblack-300"
              placeholder="dd/mm/yyyy"
              {...register("dateOfBirth")}
            />
          </div>

          <div className="flex flex-col gap-1 items-start text-white">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={user?.additionaldetails?.gender}
              className="bg-richblack-700 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25 w-full focus:outline-none "
              {...register("gender")}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 items-start text-white">
            <label htmlFor="contactNo">Contact Number</label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              value={user?.additionaldetails?.contactNo}
              className="bg-richblack-700 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25 w-full focus:outline-none   placeholder:text-richblack-300"
              placeholder="Enter Contact Number"
              {...register("contactNo", { maxLength: 10 })}
            />
            {errors.contactNo && <span>Enter a valid Contact No</span>}
          </div>
          <div className="flex flex-col gap-1 items-start text-white">
            <label htmlFor="about">About</label>
            <input
              type="text"
              id="about"
              name="about"
              value={user?.additionaldetails?.about}
              className="bg-richblack-700 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25 w-full focus:outline-none  placeholder:text-richblack-300"
              placeholder="Enter About yourself"
              {...register("about")}
            />
          </div>

          {/* button for submitting the form but i will make this hidden and click this by using useref */}
          <button ref={refObject} type="submit" className="hidden"></button>
        </form>
      </div>

      {/* buttons div */}
      <div className="flex gap-3 self-end">

      <button onClick={()=>{reset({
      dateOfBirth: "",
      gender: "",
      contactNo: "",
      about: "",
    })}} className=' self-end bg-richblack-700 cursor-pointer gap-x-2 rounded-md py-2 px-7 font-semibold text-white '>
          Cancel
      </button>  

      <button onClick={()=>{refObject.current.click()}} className='  bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-7 font-semibold text-richblack-900 '>Save</button>

      </div>

    </div>
  );
};

export default ProfileInformation;
