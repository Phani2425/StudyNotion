import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../Services/operations/authAPI";

const UpdatePassword = () => {

    //as when user generated the resetpassword token then a uuid is generated and that is attached with a frontend link . that linnk is sent to user through a mail by clicking which user can change the password ...this is done to know which user is changing the pasword as after creating the token we also store that token in the database and user model so that when the link will appear in url we will extract that using useParams() hook and send it back to backend....there in backend the api will try to find a user which have this token in its data and also check for its expiary time and if both are valid then password will be changed

    const {uuid} = useParams();//it returns the route prameter of  the url and from that we are destructuring it



  //first i will fwtch the loading state form my created slice called auth..why it is required??? as here we will call a function of service layer which will again make a request to the server by using the instance of axios so it is a network call and it may take time to give response .... so to depict that iur process is taking place we will run the spinner at that time
  //so we are taking loading so that when value of loading is true then we will show the spinner and when false we will show other things
  const { loading } = useSelector((state) => {
    return state.auth;
  });
  //then we will create  state variables such as resetPasswordDone which will be initialy false and when password will get  reset then it will be true
  const [resetPasswordDone, setresetPasswordDone] = useState(false);
  const [formData, setformData] = useState({password:"",confirmPassword: ""});

  //as in confirmation page we will be showing the mail of user of which password get upadted so i willl take a  email state variable
  const [email,setemail] = useState("");

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setformData((prevData) => {
        return {...prevData, [name]:value};
    })
  }

  //i got forgot that the function form service layers are dispatched
  const dispatch = useDispatch();

   let response;
  const submitHandler = (e) => {
    e.preventDefault();
    // here we will call the function of service layer which will send a request to server for password reset
    // also here we will pass the token which we got from the server when user clicked on the reset password link in email
    // and also we will pass the new password which user entered in the form
     response = dispatch(resetPassword(formData.password,formData.confirmPassword,uuid,setresetPasswordDone,setemail));
    // so after calling this function we will set the state variable resetPasswordDone to true but not here in that service layer function
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {resetPasswordDone ? "Reset Complete !" : "Choose New Password"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!resetPasswordDone
              ? "Almost Done Enter Your New Password and You are All Set.."
              : `All Done..We've sent you an email to ${email} for confirmation. `}
          </p>

          {!resetPasswordDone && (
            <form onSubmit={submitHandler}>
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="Enter a new password"
                  className="form-style w-full"
                />
              </label>
              <label className="w-full">
                <p className="mb-1 mt-3 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Confirm Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={changeHandler}
                  placeholder="Confirm new password"
                  className="form-style w-full"
                />
              </label>

              <button
                type="submit"
                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
              >
                Reset Password
              </button>
            </form>
          )}
          {resetPasswordDone ? (
            <Link to={'/login'}>
              <button
                type="button"
                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
              >
                Back To Login
              </button>
            </Link>
          ) : (
            <div className="mt-6 flex items-center justify-between">
              <Link to="/login">
                <p className="flex items-center gap-x-2 text-richblack-5">
                  <BiArrowBack /> Back To Login
                </p>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
