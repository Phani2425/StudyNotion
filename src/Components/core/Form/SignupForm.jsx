import {React,useState} from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import Tab from '../Common/Tab';
import { ACCOUNT_TYPE } from '../../../utils/constants';


// import { sendOtp } from "../../../services/operations/authAPI"
// import { setSignupData } from "../../../slices/authSlice"
// import { ACCOUNT_TYPE } from "../../../utils/constants"
// import Tab from "../../common/Tab"

const SignupForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const [FormData, setFormData] = useState({firstName: '',lastName: '',email:'',password:'',confirmPassword:''});

  const { firstName, lastName, email, password, confirmPassword } = FormData;

  const changeHandler = (event) => {
    const {name,value} = event.target;
    setFormData( (prevdata)=> {
       return { ...prevdata, [name]: value };
    })
  }


//   const submitHandler = (e) => {
//     e.preventDefault();
//     if(FormData.confirmPassword === FormData.password){
//         toast.success('Account Created');
//         setFormData( (prevdata)=> {
//             return { ...prevdata, [FormData.confirmPassword]:''};
//         })

//     }
//     else{
//         toast.error('Passwords do not match');

//     }

//   }

    // Handle Form Submission
    const submitHandler = (e) => {
        e.preventDefault()
    
        if (confirmPassword === password) {
          toast.error("Passwords Do Not Match")
          return
        }
        const signupData = {
          ...FormData,
          accountType,
        }
    
        // Setting signup data to state
        // To be used after otp verification

        // dispatch(setSignupData(signupData))

        // Send OTP to user for verification

        // dispatch(sendOtp(FormData.email, navigate))
    
        // Reset
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        // setAccountType(ACCOUNT_TYPE.STUDENT)
      }
      

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div className='flex flex-col gap-1 justify-center w-full'>
        {/* student-instructor tab */}
        {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
        

        <form onSubmit={submitHandler} className='flex flex-col gap-3 mt-5'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-1 w-[48%]'>
                    <label htmlFor='firstname' className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>First Name <sup className='text-pink-200'>*</sup></label>
                    <input type='text' id='firstname' name='firstName' value={FormData.firstName} placeholder='First name' onChange={changeHandler} required className='bg-richblack-800 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25'></input>
                </div>
                <div className='flex flex-col gap-1 w-[48%]'>
                    <label htmlFor='lastname' className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>Last Name <sup className='text-pink-200'>*</sup></label>
                    <input type='text' id='lastname' name='lastName' value={FormData.lastName} placeholder='Last name' onChange={changeHandler} required className='bg-richblack-800 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25'></input>
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='email' className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>Email Address <sup className='text-pink-200'>*</sup></label>
                <input type='email' placeholder='Enter email address' id='email' name='email' value={FormData.email} onChange={changeHandler} required className='bg-richblack-800 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25'></input>
            </div>

            <div className='flex justify-between items-center gap-1'>
                <div className='w-[48%] relative'>

                  <label htmlFor='Createpass' className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>Create Password <sup className='text-pink-200'>*</sup></label>
                  <input type={showPassword ? 'text' : 'password'} placeholder='Enter password' id='Createpass' name='password' value={FormData.password} onChange={changeHandler} required className='bg-richblack-800 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25 w-full'></input>
  
                  <button type='button' className='absolute right-3 bottom-4'>
                      {
                          showPassword? <FaRegEyeSlash fontSize={20} fill='white' onClick={()=>setshowPassword(false)} /> : <FaRegEye fontSize={20} fill='white' onClick={()=>setshowPassword(true)} />
                      }
                  </button>

                </div>

                <div className='w-[48%] relative'>
                   <label htmlFor='Confirmpass' className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>Confirm Password <sup className='text-pink-200'>*</sup></label>
                   <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm password' id='Confirmpass' name='confirmPassword' value={FormData.confirmPassword} onChange={changeHandler}  required className='bg-richblack-800 p-[12px] rounded-md border-[1px] border-transparent border-b-richblack-25 w-full'></input>
   
                   <button type='button' className='absolute right-3 bottom-4'>
                       {
                           showConfirmPassword? <FaRegEyeSlash fontSize={20} fill='white' onClick={()=>setshowConfirmPassword(false)} /> : <FaRegEye fontSize={20} fill='white' onClick={()=>setshowConfirmPassword(true)} />
                       }
                   </button>
                </div>

            </div>

            <button type='submit' className='w-full mt-6 mb-4 bg-yellow-50 border rounded-md text-richblack-900 font-semibold px-[12px] py-[8px] hover:scale-95 transition-transform duration-300'>Create Account</button>
        </form>
    </div>
  )
}

export default SignupForm