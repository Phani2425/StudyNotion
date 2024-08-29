import React from "react";
import ContactUsForm from "../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className=" mt-20 mx-auto flex flex-col justify-between items-center">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="font-bold text-5xl">Get in Touch</h1>
        <p className="text-richblack-300 font-medium">
          We'd love to here for you, Please fill out this form.
        </p>
      </div>

      <div>
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
