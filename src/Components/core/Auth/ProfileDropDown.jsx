import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaCaretDown } from "react-icons/fa6";
import { RiDashboard2Line } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../Services/operations/authAPI';
import { Link } from 'react-router-dom';

const ProfileDropDown = () => {

  const {user} = useSelector((state) => {return state.profile});
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <div>
        {
          user && (
             <div className='flex items-center group relative cursor-pointer gap-2'>
              <img className='h-[25px] w-[25px] rounded-full' src={`http://${user?.image}`}  alt='profile-pic'/>
              <FaCaretDown size={20} className='group-hover:rotate-180 text-white transition-all duration-200' />

              <div className='flex flex-col absolute top-6 -left-3 text-richblack-100 justify-between bg-richblack-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-10'>
                <ul>
                  <Link to='/dashboard/my-profile'>
                  <li className='flex border-b-[1px] rounded-t-lg border-b-richblack-500 items-center p-3 gap-2 hover:bg-richblack-600 cursor-pointer'>
                  <RiDashboard2Line />
                     <p>Dashboard</p>
                  </li>
                  </Link>
                  <li className='flex items-center p-3 gap-2 rounded-b-lg hover:bg-richblack-600 cursor-pointer' onClick={()=>{dispatch(logout(navigate))}}>
                  <VscSignOut />
                     <p>Logout</p>
                  </li>
                </ul>
              </div> 
             </div> 
          )
        }
    </div>
  )
}

export default ProfileDropDown