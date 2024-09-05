import React, { useEffect, useState } from "react";
import LightLogo from "../../../assets/Logo/Logo-Full-Light.png";
import { Link, NavLink } from "react-router-dom";
import { NavbarLinks } from "../../../data/navbar-links";
import { FaAngleDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../Auth/ProfileDropDown";
import { apiConnector } from "../../../Services/apiconnector";
import { courseEndpoints } from '../../../Services/apis'


const NavBar = () => {
  const { token } = useSelector((state) => {
    return state.auth;
  });
  const { user } = useSelector((state) => {
    return state.profile;
  });
  const { totalItems } = useSelector((state) => {
    return state.cart;
  });

  //declaring state variables for the link going to be used in the categories drop down
  const [subLinks, setsublinks] = useState([]);

  //calling the getallcategories api for getting the created categories from db

  async function getLinks(){
    try{
      const result = await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API);
      console.log("printing the result:- ", result);
      setsublinks(result.data.data);

    }catch(err){
      console.log("error occured while fetching the data",err.message);

    }
  }

  useEffect(()=>{
    getLinks();
  },[]);

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img
            src={LightLogo}
            alt=" "
            className="h-[35px] w-[180px]"
            loading="lazy"
          />
        </Link>

        {/* nav Links */}
        <nav>
          <ul className="hidden lg:flex gap-6">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="flex items-center gap-1 group relative">
                      <p className="cursor-pointer font-normal text-lg text-richblack-50">
                        {link.title}
                      </p>
                      <FaAngleDown
                        className="group-hover:rotate-180 transition-transform ease-in-out"
                        color="#C5C7D4"
                        size={22}
                      />

                      {/* creating modal */}
                      <div className="invisible absolute left-[50%] -top-[135%] flex flex-col rounded-lg bg-richblack-5 px-2 py-3 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[300px] -translate-x-[40%] translate-y-[40%] z-10 ">
                        {/* diamond shape of modal */}
                        <div className="absolute left-[47%] -top-[5%]  h-6 w-6 rotate-45 bg-richblack-5 opacity-0 group-hover:opacity-100 rounded-md transition-all duration-150 "></div>

                        {/* adding sublink data */}

                        {subLinks.length > 0 ? (
                          subLinks.map((link, index) => {
                            return (
                              <Link
                                key={index}
                                className="hover:bg-richblack-100 rounded-md px-3 py-2 z-10"
                                to={`/catalog/${link.name}`}
                              >
                                <p className="text-black font-semibold">
                                  {link.name}
                                </p>
                              </Link>
                            );
                          })
                        ) : (
                          <span className="text-black font-semibold text-xl text-center z-20">No Categories</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <NavLink to={link.path}>
                      <p className=" font-normal text-lg text-richblack-50">
                        {link.title}
                      </p>
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className=" items-center gap-x-4 flex">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
