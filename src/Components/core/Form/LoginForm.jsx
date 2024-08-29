import { React, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../../Services/operations/authAPI";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setformData] = useState({ email: "", password: "" });
  const [showPassword, setshowPassword] = useState(false);

  const { email, password } = formData;

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setformData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-6 mt-5">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-[0.875rem] text-richblack-5 leading-[1.375rem]"
        >
          Email Address <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="email"
          placeholder="Enter email address"
          id="email"
          name="email"
          value={FormData.email}
          onChange={changeHandler}
          required
          className="bg-richblack-800 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25" 
        ></input>
      </div>

      <div className="flex flex-col gap-1 relative">
        <label
          htmlFor="pass"
          className="text-[0.875rem] text-richblack-5 leading-[1.375rem]"
        >
          Password <sup className="text-pink-200">*</sup>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          id="pass"
          name="password"
          value={FormData.password}
          onChange={changeHandler}
          required
          className="bg-richblack-800 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25"
        ></input>

        <button type="button" className="absolute top-[37px] right-3">
          {showPassword ? (
            <FaRegEyeSlash
              fontSize={24}
              fill="#AFB2BF"
              onClick={() => {
                setshowPassword(false);
              }}
            />
          ) : (
            <FaRegEye
              fontSize={24}
              fill="#AFB2BF"
              onClick={() => setshowPassword(true)}
            />
          )}
        </button>

        <Link
          to="/forgot-password"
          className="hover:text-caribbeangreen-400 transition-all absolute right-0 top-20 text-green-400 text-xs"
        >
          <span>Forgot Password</span>
        </Link>
      </div>

      <button
        type="submit"
        className="w-full mt-7 mb-4 bg-yellow-50 border rounded-md text-richblack-900 font-semibold px-[12px] py-[8px] hover:scale-95 transition-transform duration-200"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
