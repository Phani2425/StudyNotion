import React from "react";
import LightLogo from "../../../assets/Logo/Logo-Full-Light.png";
import { Link, NavLink } from "react-router-dom";
import { NavbarLinks } from "../../../data/navbar-links";
import { FaAngleDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../Auth/ProfileDropDown";

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
          <ul className="flex gap-6">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="flex items-center gap-1 group ">
                      <p className="cursor-pointer font-normal text-lg text-richblack-50">
                        {link.title}
                      </p>
                      <FaAngleDown
                        className="group-hover:rotate-180 transition-transform ease-in-out"
                        color="#C5C7D4"
                        size={22}
                      />
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


        <div className="hidden items-center gap-x-4 md:flex">
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
