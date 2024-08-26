import React from "react";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabut1,
  ctabut2,
  codeblock,
  codeColor,
  backgroundGradient,
  codeside
}) => {
  return (
    <div className={`flex ${codeside ? 'flex-row-reverse' : 'flex-row'} ${position} my-24 justify-between gap-10 w-9/12 mx-auto `}>
      {/* section 1 */}
      <div className="flex w-[45%] flex-col gap-8">
        <div className="text-4xl font-bold leading-snug">{heading}</div>
        <div className="text-richblack-300 font-bold">{subheading}</div>

        <div className="flex gap-7 mt-7">
          <Button active={1} linkto={"/"}>
            <div className="flex items-center gap-3">
              {ctabut1}
              <FaArrowRight size={15} />
            </div>
          </Button>

          <Button active={0} linkto={"/"}>
            <div className="flex items-center gap-3">
              {ctabut2}
              <FaArrowRight size={15} />
            </div>
          </Button>
        </div>
      </div>

      {/* section 2 */}
      <div className="h-fit code-border flex flex-row py-3 px-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] gap-3">
        {backgroundGradient}
        
        <div className="flex flex-col items-start text-richblack-400 font-inter font-bold ">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>

        </div>

        <div className={`w-[90%] flex flex-col gap-1 font-bold font-mono pr-2 ${codeColor}`}>
           <TypeAnimation
           sequence={[codeblock,2000,""]}
           repeat={Infinity}
           cursor={true}
           omitDeletionAnimation={true}

           style={
              {
                whiteSpace: "pre-line",
                display:"block",
              }
           }

           />  
        </div>

      </div>
    </div>
  );
};

export default CodeBlocks;
