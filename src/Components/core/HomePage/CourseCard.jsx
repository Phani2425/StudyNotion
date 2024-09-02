import React, { useEffect, useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import { HiUsers } from "react-icons/hi2";
import { ImTree } from "react-icons/im";

const CourseCard = ({ currentTab }) => {
  const [selectedCard, setselectedCard] = useState(0);

  useEffect(() => {
    setselectedCard(0);
  }, [currentTab]);

  return (
    <div className=" flex flex-col lg:flex-row justify-center gap-14">
      {HomePageExplore[currentTab].courses.map((card, index) => {
        return (
          <div
            key={index}
            className={`mx-auto w-11/12 lg:w-[27%] ${
              index === selectedCard ? "bg-white" : "bg-richblack-800"
            } flex flex-col p-6 h-[330px] justify-between`}
            onClick={() => {
              setselectedCard(index);
            }}
          >
            <div className="flex flex-col gap-3">
              <h1
                className={`font-bold text-lg ${
                  index === selectedCard ? "text-richblack-800" : "text-white"
                }`}
              >
                {card.heading}
              </h1>
              <p
                className={` ${
                  index === selectedCard ? "text-richblack-400" : "text-white"
                }`}
              >
                {card.description}
              </p>
            </div>

            <div className="flex flex-col justify-between h-[17%]">
              <hr style={{ border: "1px dashed grey" }} />

              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <HiUsers
                    size={20}
                    color={` ${
                      index === selectedCard ? "#47A5C5" : "white"
                    }`}
                  />
                  <p
                    className={` ${
                      index === selectedCard
                        ? "text-richblack-400"
                        : "text-white"
                    }`}
                  >
                    {card.level}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <ImTree
                    size={18}
                    color={` ${
                      index === selectedCard ? "#47A5C5" : "white"
                    }`}
                  />
                  <p
                    className={` ${
                      index === selectedCard
                        ? "text-richblack-400"
                        : "text-white"
                    }`}
                  >
                    {" "}
                    {card.lessionNumber} Lessons
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseCard;
