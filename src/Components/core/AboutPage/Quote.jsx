import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote = () => {
  return (
    <div className="text-white font-bold leading-snug text-4xl text-center">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform
      <HighlightText text={"combines technology"} color={1}></HighlightText>,
      <h1 className=" inline bg-gradient-to-br from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">
        expertise
      </h1>
      , and <span className="bg-gradient-to-tr bg-clip-text text-transparent from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">Community</span> to create an
      <HighlightText
        text={"unparalleled educational experience."}
      ></HighlightText>
    </div>
  );
};

export default Quote;
