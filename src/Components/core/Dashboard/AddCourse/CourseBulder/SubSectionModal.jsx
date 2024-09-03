import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../redux/slices/courseSlice';
import toast from 'react-hot-toast';
import { createSubSection, updateSubsection } from '../../../../../Services/operations/courseDetailAPI';
import { RxCross2 } from "react-icons/rx";
import Upload from './Upload';
import IconBtn from '../../../Common/IconBtn';

const SubSectionModal = ({modalData, setmodalData, add=false, view=false, edit=false }) => {


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const [videoFile, setvideoFile] = useState(null);

    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const {token} = useSelector((state) => state.auth);
    //dekhenge yaha pe course ki kya jarurat
    const {course} = useSelector((state) => state.course);

     //dekhenge yaha pe ye view hone aya hai ki edit hone aya hai.... agar indono me se koi bhi true hua then to hame dono cases me form data fill kia hua dikhana padega..... matlab view ke case me bas data fill kia hua dikhayenge par edit nehi karne denge but in case of edit we will allow for editing

     //so ye kaam hame kab karna chahiye??? ky hame kisi chiz hone ka wait kerna chahiye??? ABSOLUTELY NOT 

     // ye page jese hi load hoga hame to wese hi user ko wo data filled for dikhana hai na to ham yaha pe useEffect() ka use karenge

     useEffect(()=>{
      //agar hame view ya phir edit karna hai to
      if(view || edit) {
        setValue("lectureTitle", modalData.title)
        setValue("lectureDesc", modalData.description)
        setValue("lectureVideo", modalData.videoUrl)
      }
     },[])

     //function to check wheather user changed some value in the form in edit mode or alll the data are same as before and nothing changed

     const isFormUpdated = () => {
         //new thing learned.............how to get all values of the form???? using "getValues()" function which returns us a objcet of key value pair .... where key is the name with which the value got registered

         const currentValues = getValues();
         //comparing current values with initial values of form when it was created
         if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl)
            {
                return true;
            }
          
            return false;
     }

     //function which will be called when the form is edited and clicked on submit button
     const EditSubSectionHandler = async (Data) => {
        setloading(true);
        //preparing the form data that will be passed to api
        const formData = new FormData();
        formData.append('courseId', course._id);
        formData.append('subSectionId', modalData._id);
        formData.append('title', Data.lectureTitle);
        formData.append('description', Data.lectureDesc);
        formData.append('videoFile', Data.lectureVideo);

        try{
            const response = await updateSubsection(formData,token);
            setloading(false);
            console.log('printing the response after updating subsection:- ',response);
            return response;
        }catch(err){
            console.log('error occured while updating a subsection: ',err.message);
            console.error(err.message);
            toast.error('Failed to update subsection');
            setloading(false);
            return;
        }
     }

     //function for submitting the form
     //agr view hai to submit hoga hi nehi kyu ki koi  button hoga hi nehi
     //agar edit karne aye ho to phir "isFormUpdated" ko call karke puch lo ki bhjai kya form update hua hai kya agar hua hai to phir api  call mardo agar nehi to kuch mat karo
     //aur agar add karne aye ho then tum normally api call marke add kardo

     const submitHandler = async (Data) => {
        //try catch to tabhi lagega jab ham api call marenge usse pehele kuch bina api call bale cases  handle kar lete hein
        
        //variable which will store the result of api call
       let result;

        if(view){
            return;
        }
        if(edit){
            if(!isFormUpdated()){
                toast.error('No changes made to the form')
                return;
            }
            else{
                result = await EditSubSectionHandler(Data);

                console.log('printing the updated course after updating a subsectiion: -' , result);
                toast.success('Subsection updated successfully')
                dispatch(setCourse(result));
                setmodalData(null);
                return;
            }
        }

        //agar yaha tak aye ho matlab subsection create  karna tha
        const formData = new FormData();
        formData.append('courseId', course._id);
        formData.append('sectionId', modalData);
        formData.append('title', Data.lectureTitle);
        formData.append('description', Data.lectureDesc);
        formData.append('videoFile', Data.lectureVideo);
        setloading(true);
        const toastId = toast.loading('Creating SubSection');

       try{

        result = await createSubSection(formData,token);
        console.log('printing the updated course after creating a subsectiion: -' , result);
        toast.success('Subsection created successfully')
        dispatch(setCourse(result));
        setmodalData(null);
        toast.dismiss(toastId);
        return;


       }catch(err){
          console.log('error occured while creating a subsection: ',err.message);
          console.error(err.message);
          toast.dismiss(toastId);
          toast.error('Failed to create subsection');
          return;
 
       }
     }

     

  return (
    <div className='fixed inset-0 z-50 overflow-auto flex justify-center items-center w-screen h-screen backdrop-blur-sm '>

        <div className='flex flex-col gap-6 p-7 bg-richblack-800 rounded-lg w-[40%] '>
            <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-semibold'>{view && 'Viewing'} {edit && 'Editing'} {add && 'adding'} Lecture</h1>
            <RxCross2 size={20} className='cursor-pointer hover:rotate-90 transition-all duration-200' onClick={()=>{!loading && setmodalData(null)}} />
            </div>
             <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4'>

                <Upload
                name='lectureVideo'
                label='Lecture Video'
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                viewData = {view ? modalData.videoUrl :null }
                editData = {edit ? modalData.videoUrl :null }
                setvideoFile = {setvideoFile}
                />

                <div className='flex flex-col gap-1'>
                    <label htmlFor='lectureTitle'>Lecture Title <sup className='text-pink-300'>*</sup> </label>
                    <input
                    name='lectureTitle'
                    id='lectureTitle'
                    placeholder='Enter Lecture Title'
                    {...register('lectureTitle', {required:true})}
                    className='px-3 py-3 rounded-lg bg-richblack-700 border-b-2 border-b-richblack-600 focus:outline-none '
                    />

                    {
                        errors.lectureTitle && <p className='text-[#D70040]'>This field is required</p>
                    }
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='lectureDesc'>Lecture Description <sup className='text-pink-300'>*</sup> </label>
                    <textarea
                    rows={5}
                    name='lectureDesc'
                    id='lectureDesc'
                    placeholder='Enter Lecture Description'
                    {...register('lectureDesc', {required:true})}
                    className='px-3 py-3 rounded-lg bg-richblack-700 border-b-2 border-b-richblack-600 focus:outline-none '
                    />

                    {
                        errors.lectureDesc && <p className='text-[#D70040]'>This field is required</p>
                    }
                </div>

                {/* buttons Div */}

                {/* agar view true hai to koi button ana nehi chahiye */}

                {
                    !view && (
                        <div className='flex justify-end items-center gap-4 '>
                            <button onClick={()=> {setmodalData(null)}} 
                                className='bg-richblack-600 py-2 px-5 rounded-lg'>
                                cancel
                            </button>

                            <IconBtn 
                            text={loading ? 'Loading...' : edit ? 'Save Changes' : 'Save' }
                            type='submit'
                            >

                            </IconBtn>
                        </div>
                    )
                }

             </form>
        </div>

    </div>
  )
}

export default SubSectionModal