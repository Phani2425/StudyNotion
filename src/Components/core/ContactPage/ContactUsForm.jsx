import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../HomePage/Button";
import { ContactEndpoint } from "../../../Services/apis";
import { apiConnector } from "../../../Services/apiconnector";
import countryArray from "../../../data/countrycode.json";
import toast from "react-hot-toast";

const ContactUsForm = () => {
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  //data passed in this is passed by the handleSubmit function.... data is basically a object where all the form data get stored when we run register function
  const customSubmitHandler = async (data) => {
    console.log("current form data is given by:- ", data);

    try {
      setloading(true);
      //now we will use apiconnector to send request to contactus api
      const response = await apiConnector(
        "POST",
        ContactEndpoint.CONTATUS_API,
        data
      );

      console.log(response);

      if (response.data.success) {
        console.log("message sent successfully");
        toast.success("message sent successfully");
        setloading(false);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to send message");
      console.log("Error while sending message", err.message);
      setloading(false);
    }
  };

  useEffect(() => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      message: "",
    });
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <form onSubmit={handleSubmit(customSubmitHandler)}>
          <div className="flex flex-col gap-4 mt-10 text-white">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1 w-[48%]">
                <label htmlFor="firstName">FirstName</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none"
                  placeholder="Enter your firstName"
                  {...register("firstName", { required: true })}
                />

                {/* errors handling for it */}

                {errors.firstName && <span>First Name is required</span>}
              </div>

              <div className="flex flex-col gap-1 w-[48%]">
                <label htmlFor="lastName">LastName</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none"
                  placeholder="Enter your lastName"
                  {...register("lastName")}
                />
                {/* we didnot wrote any error as here no validation is passed with register function */}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none"
                placeholder="Enter your Email"
                {...register("email", { required: true })}
              />

              {/* errors handling for it */}

              {errors.email && <span>Email is required</span>}
            </div>

            {/* phoneNo */}
            <div>
              <label htmlFor="phoneNo">Phone No.</label>
              <div className="flex gap-4" id="phoneNo">
                <select
                  name="country"
                  className=" bg-richblack-700 placeholder:text-richblack-300 p-2 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none w-[25%]"
                  {...register('countryCode')}
                >
                  {countryArray.map((obj, index) => {
                    return (
                      <option
                        key={index}
                        value={obj.code}
                        name={obj.country}
                        className="text-white px-3"
                      >
                       {obj.code} - {obj.country}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none w-[75%]"
                  {...register("phoneNo", { required: true, maxLength: 10 })}
                />

                {/* handling error */}
                {errors.phone && (
                  <span>
                    Phone number is required and should be 10 digits long
                  </span>
                )}
              </div>
            </div>

            {/* message area */}
            <div className="flex flex-col gap-1">
              <label htmlFor="message">Message</label>
              <textarea
                rows={7}
                type="text"
                name="message"
                id="message"
                className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none"
                placeholder="Enter your message"
                {...register("message", { required: true })}
              />

              {errors.message && <span>Message is required</span>}
            </div>

            {/* here i made mistake by using normal button component and upon clicking nothing happened because form get submitted in clicking on the button which is submit type not normal button */}

            <button
              type="submit"
              className="w-full mt-7 mb-4 bg-yellow-50 border rounded-md text-richblack-900 font-semibold px-[12px] py-[8px] hover:scale-95 transition-transform duration-200"
            >
              submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactUsForm;

//basically useForm amaku 5 ta jinisa daba for form handling.. 3ts functionn and 1 ts object and 1 ta flag
//functions are:-

//register:- it is used to save the value of a input field

// ->it is written inside curlybraces inside te input tag and before it there is spread operator and it takes the name of the input field it is registering along with as optional it can take the validation  i want to apply for the field such as lowercase:true,required:true in a object

//when these validation fails then the name of the input field get stored in a object given by useForm() named as "errors"

//so if errors occur then we can address it outside the input tag.... so to separate each input tag errors from other errors we put the whole set of errors verification part an input field part in a div

//when the form get submitted the we call a function named as "handleSubmit()" given by the useForm hook .. in that fuction we pass another function which will handle our submit

//last but not the least it aalos gives us a function named "reset()" ...t his function is called in useEffect() upon changing of :- a flag given by useForm hook which is named as "isSubmitSuccesfull"....
//and in reset function we pass a object where al field of the form hold empty string...

//this is the flag which becomes true automatically when form submited successfully
