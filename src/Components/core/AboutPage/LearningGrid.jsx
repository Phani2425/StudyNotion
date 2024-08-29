import React from "react";
import HighlightText from "../HomePage/HighlightText";
import Button from "../HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order:100,
    show: null,
    heading: "",
    description: "",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 auto-rows-auto mx-auto w-[350px] xl:w-fit">
      {LearningGridArray.map((box, index) => {
        {
          return box.order < 0 ? (
            <div className="flex flex-col justify-between items-center text-center lg:text-left lg:pr-12 lg:items-start col-span-2 gap-2">
              <h1 className="font-bold text-[40px] leading-snug  text-white">
                {box.heading} {<HighlightText text={`${box.highlightText}`} />}
              </h1>

              <p className="text-richblack-400 text-wrap ">
                {box.description}
              </p>

              <Button active={1} linkto={box.BtnLink}>{box.BtnText}</Button>
            </div>
          ) : (
            <div>
              {box.show !== null && (
                <div
                  key={index}
                  className={`flex flex-col p-8 justify-start gap-8 items-start h-[280px] ${
                    box.order % 2 === 0
                      ? "bg-richblack-800"
                      : "bg-richblack-700"
                  }`}
                >
                  <h1 className="text-lg">{box.heading}</h1>
                  <p className="text-richblack-300">{box.description}</p>
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default LearningGrid;
