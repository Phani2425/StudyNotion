import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../../Services/operations/authAPI";
import { useDispatch } from "react-redux";
//mere pass abhi sirf icons ka nnam hain in data so to use them i will impport all the icons .....not exactly all but all the icons having vsc as their prefix .... because all icons in our data  have vsc as their prefix
//what a geniuss observation

import * as Icons from 'react-icons/vsc';
//this wiill return array of all icons having vsc as their prefix

const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("user from the redux store:- ", user);

  const dispatch = useDispatch();

  //a state variable for knowing which tab is currently clicked so thhat we can turn its bg yellow color

  const [currentTab, setcurrentTab] = useState(1);

  return (
    <div className="flex flex-col gap-5 absolute top-0 left-0 h-screen bg-richblack-700 text-richblack-300 w-52">
      <div className=" flex flex-col py-3   gap-4 transition-all duration-200">
        {sidebarLinks.map((link, index) => {
            //getting the icon form icon name
            //from the array i will direcatly access the icon
          const Icon = Icons[link.icon];
          if (!link.type) {
            return (
              <NavLink key={index} to={link.path} onClick={()=>{setcurrentTab(link.id)}}>
                <div className={`flex items-center justify-start gap-4 px-4 py-2 border-l-[3px]  ${currentTab === link.id ? ('bg-yellow-50 bg-opacity-20  border-l-yellow-200') : ('border-l-transparent')}`}>
                    <Icon/>
                  <p>{link.name}</p>
                </div>
              </NavLink>
            );
          }

          if (link.type === user.accountType) {
            return (
              <NavLink key={index} to={link.path} onClick={()=>{setcurrentTab(link.id)}}>
                <div className={`flex items-center justify-start gap-4 px-4 py-2 border-l-[3px]  ${currentTab === link.id ? ('bg-yellow-50 bg-opacity-20  border-l-yellow-200') : ('border-l-transparent')}`}>
                 <Icon/>
                  <p>{link.name}</p>
                </div>
              </NavLink>
            );
          }
        })}
      </div>

      <div className="h-[1px] bg-richblack-500"></div>

      <div className="flex flex-col px-4 py-2  gap-5">
        <NavLink>
          <div>
            <p>Settings</p>
          </div>
        </NavLink>

        <div
        className="cursor-pointer "
          onClick={() => {
            dispatch(logout());
          }}
        >
          <p>LogOut</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
