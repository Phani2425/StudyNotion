import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../Components/core/HomePage/HighlightText";
import Button from "../Components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../Components/core/HomePage/CodeBlocks";
import LearningLanguageSection from "../Components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../Components/core/HomePage/InstructorSection";
import ExploreMore from "../Components/core/HomePage/ExploreMore";
import CountUp from "react-countup";
import ReviewSlider from "../Components/core/Common/ReviewSlider";


//images
import TimelineImg from "../assets/Images/TimelineImage.png";
import logo1 from "../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../assets/TimeLineLogo/Logo4.svg";
import Footer from "../Components/core/Common/Footer";


//timeline array
const timeline = [
  {
    logo: logo1,
    heading: "Leadership",
    subheading: "Fully committed to the success company",
  },
  {
    logo: logo2,
    heading: "Responsibility",
    subheading: "Students will always be our top priority",
  },
  {
    logo: logo3,
    heading: "Flexibility",
    subheading: "The ability to switch is an important skills",
  },
  {
    logo: logo4,
    heading: "Solve the problem",
    subheading: "Code your way to a solution",
  },
];

const Home = () => {


  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-start md:items-center text-white justify-between select-none ">
        <Link to="/signup" className=" mt-8 md:m-8">
          <div className="flex gap-2 px-4 py-1 rounded-2xl items-center bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit shadow-md hover:shadow-lg hover:bg-richblack-800 hover:shadow-richblack-600">
            <p className="font-bold">Become an Instructor</p>
            <FaArrowRight size={15} />
          </div>
        </Link>

        <div className="md:text-center text-4xl font-semibold mt-7 ">
          Empower Your Future with{" "}
          <HighlightText text={"Coding Skills"} color={1} />
        </div>

        <div className="mt-4 w-[80%] md:text-center text-lg font-bold text-richblack-300 ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world , and get access to wealth of resources.
          Including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8">
          <Button linkto="/signup" active={1}>
            Learn More
          </Button>

          <Button linkto="/signup" active={0}>
            Book a Demo
          </Button>
        </div>

        <div className=" mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            muted
            loop
            autoPlay
            className="w-[900px] h-[400px] shadow-[17px_17px_rgba(255,255,255)]"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section  */}

        <div className="text-white">
          {/* code section 1 */}
          <CodeBlocks
            position={"flex-col lg:flex-row"}
            heading={
              <>
                Unlock Your
                <HighlightText text={" coding potential "} color={0} />
                with our online courses
              </>
            }
            subheading={
              "Our courses are designed aand taught by industry experts who have years of experience in coding and are passoniate about sharing their knowledge with you"
            }
            ctabut1={"Try it Yourself"}
            ctabut2={"Learn More"}
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>\n</html>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
          {/* code Section 2 */}
          <CodeBlocks
            position={" flex-col lg:flex-row-reverse"}
            heading={
              <>
                Start
                <HighlightText text={"  coding "} color={1} />
                in seconds
              </>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabut1={"Continue Lessons"}
            ctabut2={"Learn More"}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* explore more part */}
        <ExploreMore/>

      </div>

      {/* section 2 */}

      <div className="bg-richblack-5 my-16 pb-16">
        <div className="backimg flex flex-wrap justify-center items-end py-7 h-[300px]">
          <div className="flex gap-4 items-center justify-center">
            <Button linkto={"/"} active={1}>
              <div className="flex gap-2 items-center">
                Explore Full Catalog
                <FaArrowRight />
              </div>
            </Button>

            <Button linkto={"/"} active={0}>
              Learn More
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap w-10/12  lg:w-9/12 mx-auto h-[300px] justify-between items-center">
          <div className="text-4xl lg:text-5xl font-inter font-bold text-richblack-800 lg:w-[45%] leading-tight">
            Get the skills you need for a{" "}
            <HighlightText text={" Job that is in demand "} color={1} />
          </div>

          <div className="flex flex-col gap-7 justify-center items-start lg:w-[40%]">
            <p className="text-richblack-600 font-bold text-[18px]">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>
            <Button active={1}>Learn More</Button>
          </div>
        </div>

        <div className=" w-10/12 mx-auto flex justify-between flex-wrap items-center my-20 lg:px-12">
          <div className="lg:w-[45%] flex flex-col gap-5 ">
            {timeline.map((elem, index) => {
              return (
                <div key={index} className=" flex flex-col items-start">
                  <div className="flex gap-7 items-center">
                    <div className="w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                      <img className="w-[25px] h-[25px]" src={elem.logo} alt=""/>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-bold text-richblack-800">
                        {elem.heading}
                      </h2>
                      <p className="text-richblack-400 ">{elem.subheading}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start"></div>
                </div>
              );
            })}
          </div>

          <div className="relative lg:w-[50%] ">
            <img
              className=" shadow-[10px_-5px_50px_-5px] shadow-[#1FA2FF]"
              src={TimelineImg}
              alt=""
            />

            <div className=" px-8  lg:px-4 lg:pl-5 absolute bg-caribbeangreen-700 w-[50%] h-[60%] lg:w-[400px] lg:h-[90px] text-white flex flex-col lg:flex-row items-start  lg:items-center justify-around lg:justify-between right-[5%] bottom-[7%] lg:bottom-[-10%] lg:right-[17%]">
              <div className=" lg:w-[45%] gap-5 flex items-center justify-center ">
                <h1 className="font-bold text-3xl"><CountUp end={10} enableScrollSpy  /></h1>
                <p className="text-caribbeangreen-300 font-semibold">
                  YEARS OF EXPERIENCE
                </p>
              </div>
              <div className="w-[1px] hidden lg:block h-14 bg-caribbeangreen-300 my-auto"></div>
              <div className=" lg:w-[45%] gap-5 flex  items-center justify-between">
                <h1 className="font-bold text-3xl"><CountUp end={50} enableScrollSpy  /></h1>
                <p className="text-caribbeangreen-400 font-semibold">
                  TYPES OF COURSES
                </p>
              </div>
            </div>
          </div>
        </div>

        <LearningLanguageSection/>

      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>

        <ReviewSlider />
      </div>

      <Footer/>

    </div>
  );
};

export default Home;
