import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../Services/operations/authAPI";
import { useSelector } from "react-redux";

const ChangePassword = () => {

    const {user} = useSelector((state)=> state.profile);
    const {token} = useSelector((state)=> state.auth);
    const refObject = useRef({});
    const [showPassword, setshowPassword] = useState(false);
    const [showNewPassword, setshowNewPassword] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors, isSubmitSuccesful}
    } = useForm();


    const dispatch =  useDispatch();

    const SubmitHandler = (formdata) => {
        formdata.email = user.email;
        console.log(formdata);
        dispatch(changePassword(token,formdata));
    }

    //reseting the form field after refreshing or when the submit is successful which we can know fropm the value of the flag:- "isSubmitSuccesful" which is false initially but when form get submitted then it becomes true

    //so we will apply useEffect() and add the flag in it's dependency list along with reset(we forget the most of time)

    useEffect(()=>{
       reset({
         oldpassword: "",
         newpassword: ""
       })
    },[isSubmitSuccesful, reset]);


  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col justify-between bg-richblack-800 px-12 py-9 w-full rounded-lg">
        <h1 className="font-semibold text-lg mb-3">Password</h1>

        <form onSubmit={handleSubmit(SubmitHandler)} className="flex justify-between items-center gap-10">
          <div className="flex flex-col gap-1 items-start relative w-full">
            <label>Current Password</label>
            <input type={showPassword ? "text" : "password" } placeholder="Enter Current Password" className="bg-richblack-700 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25 w-full placeholder:text-richblack-300 focus:outline-none" {...register('oldpassword')}  />

            <button type="button" className="absolute right-3 bottom-4">
              {showPassword ? (
                <FaRegEyeSlash
                  fontSize={20}
                  fill="white"
                  onClick={() => setshowPassword(false)}
                />
              ) : (
                <FaRegEye
                  fontSize={20}
                  fill="white"
                  onClick={() => setshowPassword(true)}
                />
              )}
            </button>
          </div>

          <div className="flex flex-col gap-1 items-start relative w-full">
            <label>New Password</label>
            <input type={showNewPassword ? "text" : "password" } placeholder="Enter New Password" className="bg-richblack-700 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25 w-full placeholder:text-richblack-300 focus:outline-none "  {...register('newpassword')} />

            <button type="button" className="absolute right-3 bottom-4">
              {showNewPassword ? (
                <FaRegEyeSlash
                  fontSize={20}
                  fill="white"
                  onClick={() => setshowNewPassword(false)}
                />
              ) : (
                <FaRegEye
                  fontSize={20}
                  fill="white"
                  onClick={() => setshowNewPassword(true)}
                />
              )}
            </button>
          </div>

         <button ref={refObject} type="submit" className="hidden"></button>

        </form>
      </div>

      {/* buttons div */}
      <div className="flex gap-3 self-end">
        <button
          onClick={() => {
            reset({
              oldpassword:'',
              newpassword:''
            });
          }}
          className=" self-end bg-richblack-700 cursor-pointer gap-x-2 rounded-md py-2 px-7 font-semibold text-white "
        >
          Cancel
        </button>

        <button
          onClick={() => {
            refObject.current.click();
          }}
          className="  bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-7 font-semibold text-richblack-900 "
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
