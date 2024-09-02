import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
//mere pass abhi sirf icons ka nnam hain in data so to use them i will impport all the icons .....not exactly all but all the icons having vsc as their prefix .... because all icons in our data  have vsc as their prefix
//what a geniuss observation

import * as Icons from 'react-icons/vsc';
//this wiill return array of all icons having vsc as their prefix
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";

const Sidebar = ({setshowModal}) => {
  const { user } = useSelector((state) => state.profile);
  console.log("user from the redux store:- ", user);

  const dispatch = useDispatch();
  const loaction = useLocation();
  console.log(loaction.pathname);

  return (
       <div className="fixed  ">
            <div className="flex flex-col gap-5 absolute left-0 h-screen  bg-richblack-700 text-richblack-300 w-36 lg:w-40  xl:w-52 pt-4">
      <div className=" flex flex-col py-3 gap-4 transition-all duration-200">
        {sidebarLinks.map((link, index) => {
            //getting the icon form icon name
            //from the array i will direcatly access the icon
          const Icon = Icons[link.icon];
          if (!link.type) {
            return (
              <NavLink key={index} to={link.path} >
                <div className={`flex items-center justify-start gap-3 px-4 py-2 border-l-[3px]  ${loaction.pathname === link.path ? ('bg-yellow-50 bg-opacity-20  border-l-yellow-200') : ('border-l-transparent')}`}>
                    <Icon className= {` text-xl ${loaction.pathname === link.path && 'text-yellow-100'}`}/>
                  <p>{link.name}</p>
                </div>
              </NavLink>
            );
          }

          if (user && link.type === user?.accountType) {
            return (
              <NavLink key={index} to={link.path} >
                <div className={`flex items-center justify-start gap-3 px-4 py-2 border-l-[3px]  ${loaction.pathname === link.path ? ('bg-yellow-50 bg-opacity-20  border-l-yellow-200') : ('border-l-transparent')}`}>
                  <Icon className= {` text-xl ${loaction.pathname === link.path && 'text-yellow-100'}`} />
                  <p>{link.name}</p>
                </div>
              </NavLink>
            );
          }
        })}
      </div>

      <div className="h-[1px] bg-richblack-500"></div>

      <div className="flex flex-col  gap-4">
        <NavLink to={'/dashboard/settings'}>
          <div className={`flex items-center justify-start gap-4 px-4 py-2 border-l-[3px]  ${loaction.pathname === '/dashboard/settings' ? ('bg-yellow-50 bg-opacity-20  border-l-yellow-200') : ('border-l-transparent')}`}>
          <IoSettingsOutline className= {` text-xl ${loaction.pathname === '/dashboard/settings' && 'text-yellow-100'}`}/>
            <p>Settings</p>
          </div>
        </NavLink>

        <div
        className="cursor-pointer group flex items-center justify-start gap-4 px-4 py-2"
          onClick={() => {
            setshowModal(true);
          }}
        >
          <PiSignOut className="text-xl group-hover:text-yellow-100"/>
          <p className="group-hover:text-yellow-100 ">LogOut</p>
        </div>
      </div>
    </div>
       </div>
  );
};

export default Sidebar;
