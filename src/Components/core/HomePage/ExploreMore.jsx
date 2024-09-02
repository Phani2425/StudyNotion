import { React, useEffect, useRef, useState } from "react";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const ExploreMore = () => {
  const [currentTab, setcurrentTab] = useState(0);
  const [bgPosition, setBgPosition] = useState(0);
  const [bgWidth, setBgWidth] = useState(0);

  const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

  //lets try to build the sliding bar behind the buttons
  const buttonRef = useRef([]);

  useEffect(()=>{
    const currentButton = buttonRef.current[currentTab];
    setBgPosition(currentButton.offsetLeft);
    setBgWidth(currentButton.offsetWidth);
  },[currentTab]);



  return (
    <div className="flex flex-col gap-6 items-center relative pb-[930px] lg:pb-[130px] w-[100%]">
      <h1 className="text-5xl font-bold">
        Unlock the <HighlightText text={" Power of Code "} color={0} />
      </h1>
      <p className="text-richblack-300 font-bold text-xl ">
        Learn to Build Anything You Can Imagine
      </p>

      {/* tabs section */}
      <div className="button-bar hidden lg:flex gap-5 rounded-3xl bg-richblack-800 px-1 py-1 mt-6 border-b border-b-richblack-400 ">

      <div
      className={`bg-highlight rounded-3xl px-5 py-2 bg-richblack-900 h-[40px] self-center m-1 `}
      style={{ transform: `translateX(${bgPosition}px)`, width: `${bgWidth}px`}}
    />

        {tabsName.map((tabs, index) => {
          
          return (
            <div
            ref={(currentElement)=>{buttonRef.current[index] =  currentElement}}
              key={index}
              className={` card-button  hover:text-white px-5 py-2 rounded-3xl text-richblack-300 font-semibold  cursor-pointer`}
              onClick={() => {
                setcurrentTab(index);
              }}
            >
              {tabs}
            </div>
          );
        })}
      </div>

      {/* cards group */}
      <div className="w-[100%] absolute -bottom-[200px]  lg:-bottom-[250px] ">
        <CourseCard currentTab={currentTab} />
      </div>
    </div>
  );
};

export default ExploreMore;
