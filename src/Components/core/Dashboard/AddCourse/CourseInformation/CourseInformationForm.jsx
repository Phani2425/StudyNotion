import React, { useState,useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { getAllCategories } from '../../../../../Services/operations/courseDetailAPI';
import ImageUploader  from './ImageUploader';
import { setStep } from '../../../../../redux/slices/courseSlice';
import IconBtn from '../../../Common/IconBtn';
import { MdNavigateNext } from "react-icons/md";
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { createCourse } from '../../../../../Services/operations/courseDetailAPI';
import { setCourse } from '../../../../../redux/slices/courseSlice';

const CourseInformationForm = () => {

  //statevariable for thumnail formdata
  const [ThumbnailFormData, setThumbnailFormData] = useState(null);

   const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isSubmitSuccessful}
   } = useForm();

   useEffect(()=> {
     reset({

     })
   }, [reset, isSubmitSuccessful]);

   //acquiring token to send it in header for authentication and authorisation
   const {token} = useSelector((state)=> state.auth);
   //acquiring course state from the courseSlice
   const { course,editCourse } = useSelector((state) => state.course);
   //state variable for loader
   const [loading, setloading] = useState(false);
   //during creating course we have to select a category from our available categories that time so we will fetch categories there and we have to store those in a place so we will do that in a state variable
   const [courseCategories, setCourseCategories] = useState([]);

   //so lets bring those categories by making request to the backend through service layer

  const fetchAllCategories = async () => {
    setloading(true);
    try {
      const result = await getAllCategories(token);
      if(result){
        setCourseCategories(result);
      }
    } catch (error) {
      console.log("Error in fetching categories", error);
    } finally {
      setloading(false);
    }
  }

  //as i need to get these without any user interaction so i will use useEffect hook
   useEffect(() => {
     fetchAllCategories();
   },[])


   //acquiring dispatch instace required for changing state of redux
   const dispatch = useDispatch();

       // if form is in edit mode
       //then course me mujhe bohot se values mile honge to ham unko strings se map karwa denge

      //  Function Used: setValue is likely a function from a form handling library like react-hook-form. It is used to set the values of form fields programmatically.
      //  if (editCourse) {
      //   // console.log("data populated", editCourse)
      //   setValue("courseTitle", course.courseName)
      //   setValue("courseShortDesc", course.courseDescription)
      //   setValue("coursePrice", course.price)
      //   setValue("courseTags", course.tag)
      //   setValue("courseBenefits", course.whatYouWillLearn)
      //   setValue("courseCategory", course.category)
      //   setValue("courseRequirements", course.instructions)
      //   setValue("courseImage", course.thumbnail)
      // }

      const [TagsArray , setTagsArray]  = useState([]);
      const [InstructionArray , setInstructionArray]  = useState([]);

      const keyDownHandler = (e) => {
         if((e.key == 'Enter' || e.key == ',') && e.target.value !== ''){
          e.preventDefault();
          setTagsArray([...TagsArray,e.target.value])
          e.target.value = '' ;
         }
      }

      const removeHandler = (type,removeIndex) => {
        if(type === 'tag'){
          setTagsArray([...TagsArray.filter((tag,index) => index !== removeIndex)]);
        }
        else if(type === 'benefit'){
          setInstructionArray([...InstructionArray.filter((benefit,index) => index!== removeIndex)]);
        }
      }

      //as in the last field i need to add the value written in the input to the benifit array by an external button so i will use "useref()" hook... as it is used when i need to access any dom element,( its value,its properties we can say all things we can get form dom element) from anywhere.. it is like doing document.getElement where in that way we were also accessing dom elements
      const refObject = useRef({});
      const AddButtonClickHandler = (e) => {
            if(refObject.current.value !== ''){
              setInstructionArray([...InstructionArray,refObject.current.value]);
              refObject.current.value = '';
            }
      }

      const submitHandler = async(Data) => {
          const toastid = toast.loading('Loading...');
          const formData = new FormData();
          formData.append('courseName', Data.courseTitle);
          formData.append('courseDescription', Data.courseShortDesc);
          formData.append('price', Data.coursePrice);
          formData.append('whatYouWillLearn', Data.courseBenefits);
          formData.append('category', Data.courseCategory);
          formData.append('thumbnailImage', ThumbnailFormData);
          formData.append('status', COURSE_STATUS.DRAFT);

          // Append each tag individually....otherwise if we append this as everyone then all tags or instruction will be stored as a single string and as single element in tag and instructions because  [The FormData object converts arrays to a comma-separated string by default.]

          //but we want our each tag or instruction to be separate element of a array so we will traverse through each element of array and append it to the same field for which an array will be created automatically

          TagsArray.forEach((tag) => {
            formData.append('tag', tag);
          });

          // Append each instruction/requirement individually
          InstructionArray.forEach((instruction) => {
            formData.append('instructions', instruction);
          });
          

          try{
              const result = await createCourse(token,formData);
              dispatch(setCourse(result));
              console.log('new course looks like:- ',result);
          }catch(err){
            console.log('error occured while creating course:- ',err.message);
            console.error(err.message);
          }finally{
            toast.dismiss(toastid);
            dispatch(setStep(2)); // move to next step
          }
      }

  return (


     <form onSubmit={handleSubmit(submitHandler)} >
       <div className="flex flex-col gap-4 mt-10 text-white">

{/* title */}

          <div className="flex flex-col gap-1">
                    <label htmlFor="courseTitle">Course title<sup className='text-pink-300'>*</sup></label>
                    <input
                      type="text"
                      name="courseTitle"
                      id="courseTitle"
                      className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none"
                      placeholder="Enter Course Title"
                      {...register("courseTitle", { required: true })}
                    />

                    {/* errors handling for it */}

                    {errors.courseTitle && <span>Field is required</span>}
                  </div>
{/* description */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="courseShortDesc">Course Short Description<sup className='text-pink-300'>*</sup></label>
                    <textarea
                      rows={7}
                      name="courseShortDesc"
                      id="courseShortDesc"
                      className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none"
                      placeholder="Enter Description"
                      {...register("courseShortDesc", { required: true })}
                    />

                    {/* errors handling for it */}

                    {errors.courseShortDesc && <span>Field is required</span>}
                  </div>
{/* price */}
                  <div className="flex flex-col gap-1 relative">
                    <label htmlFor="coursePrice">Course Price<sup className='text-pink-300'>*</sup></label>
                    <input
                      type='text'
                      name="coursePrice"
                      id="coursePrice"
                      className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none  pl-11"
                      placeholder="Enter Price"
                      {...register("coursePrice", { required: true })}
                    />

                     <HiOutlineCurrencyRupee className=' absolute top-10 left-3 text-2xl text-richblack-300 ' />

                    {/* errors handling for it */}

                    {errors.coursePrice && <span>Field is required</span>}
                  </div>
{/* category */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor='courseCategory'>Category</label>
                    <select className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none"
                    placeholder="Enter Price"
                    {...register('courseCategory', {required:true})}>
                      {
                        courseCategories.map((category, index)=> {
                          return <option key={index} value={category._id}>{category.name}</option>
                        })
                      }
                    </select>
                    {
                      errors.courseCategory && <span>Field is required</span>
                    }
                  </div>
{/* tags */}
                  <div className="flex flex-col gap-1">

                     <div className={` flex-wrap gap-2 h-fit ${TagsArray.length > 0 ? 'flex' : ' hidden' }`}>
                      {
                        TagsArray.length > 0 && 
                        (
                          TagsArray.map((tag,index) => 
                            (
                                <div key={index} className='flex w-fit bg-yellow-25 text-black justify-center items-center gap-2 rounded-2xl px-3 py-1'>
                                    <span className=''>{tag}</span>
                                    <RxCross2 className='cursor-pointer' onClick={()=> {removeHandler('tag',index)}}/>
                                </div>
                            )
                          )
                        )
                      }
                     </div>


                    <label htmlFor="courseTags">Tags<sup className='text-pink-300'>*</sup></label>
                    <input
                      type="text"
                      name="courseTags"
                      id="courseTags"
                      className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none"
                      placeholder="Choose a Tag"
                      // {...register("courseTags", { required: true })}
                      onKeyDown={keyDownHandler}
                    />

                    {/* errors handling for it */}

                    {errors.courseTitle && <span>Field is required</span>}
                  </div>

                  {/* create a separate component for uploading and showing preview of the thumbnail of the course  */}

                  <ImageUploader setThumbnailFormData={setThumbnailFormData} />

{/* benifits */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="courseShortDesc">Benifits of the Course<sup className='text-pink-300'>*</sup></label>
                    <textarea
                      rows={8}
                      name="courseBenefits"
                      id="courseBenefits"
                      className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none"
                      placeholder="Enter Benifits of the Course"
                      {...register("courseBenefits", { required: true })}
                    />

                    {/* errors handling for it */}

                    {errors.courseBenefits && <span>Field is required</span>}
                  </div>

{/* requirements */}
                    <div className="flex flex-col gap-1">

                    <label htmlFor="courseTags">Requirements/Instructions<sup className='text-pink-300'>*</sup></label>
                    <input
                     ref={refObject}
                      type="text"
                      name="courseRequirements"
                      id="courseRequirements"
                      className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-b-[3px] border-b-richblack-500 focus:outline-none"
                      placeholder="Enter Requirements Of The Course"
                      
                    />
                    
                    <button type='button' className='text-yellow-100 font-semibold text-lg self-start mt-2' onClick={AddButtonClickHandler}>Add</button>

                    <div className={` flex-wrap gap-2 h-fit ${InstructionArray.length > 0 ? 'flex flex-col' : ' hidden' }`}>
                      {
                        InstructionArray.length > 0 && 
                        (
                          InstructionArray.map((benifit,index) => 
                            (
                                <div key={index} className='flex w-fit bg-richblack-700 text-white justify-center items-center gap-2 rounded-2xl px-3 py-1'>
                                    <RxCross2 className='cursor-pointer' onClick={()=> {removeHandler('benefit',index)}}/>
                                    <span className=''>{benifit}</span>
                                    
                                </div>
                            )
                          )
                        )
                      }
                     </div>

                  </div>

{/* buttons div */}
     {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext size={20}/>
        </IconBtn>
      </div>
          </div>
     </form>

  )
}

export default CourseInformationForm