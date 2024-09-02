import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="mx-auto flex flex-col justify-between w-[90%] lg:w-[45%] border border-richblack-25 border-opacity-20 rounded-xl p-7">
      <div className="flex flex-col items-start">
        <h1 className="font-semibold text-[1.75rem] text-white">
          Got a Idea? We've got the skills. Let's team up
        </h1>
        <p className="text-sm text-richblack-300 ">
          Tell us more about yourself and what you're got in mind.
        </p>
      </div>
      <div>
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;


