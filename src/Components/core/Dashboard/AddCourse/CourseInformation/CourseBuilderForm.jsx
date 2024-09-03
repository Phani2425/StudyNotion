import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../Common/IconBtn';
import NestedView from '../CourseBulder/NestedView';
import { setStep,setEditCourse, setCourse } from '../../../../../redux/slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection,updateSection } from '../../../../../Services/operations/courseDetailAPI';

const CourseBuilderForm = () => {


  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState : {errors, isSubmitSuccessful}
  } = useForm();

  const [loading, setloading] = useState(false);

  //nested view pain ethi course value darkar that we saved in the course slice in prev step
  const {course} = useSelector((state)=> state.course)
  const {token} = useSelector((state) => state.auth);

  //when a section is created and i click on edit button of that created setcion then it allows me to edit that and the button conveerts into edit section name button so for knwing when the button should show what i will create a flag

  const [editSectionFlag, seteditSectionFlag] = useState(false);
  const [ sectionToBeEdited, setsectionToBeEdited] = useState(null);

  //function for cancel edit

  const cancelEdit = () => {
    seteditSectionFlag(false);
    setsectionToBeEdited(null);
    //as we are using useForm hook hence it is important to set the input field empty iif dont want to edit it because the section is already created and saved to db
    setValue('section', '')
  }

  ///functions for  going back to step or going to step 3
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(setStep(1));
    //agar ham back jaa rahe hein then edit karne keliye gaye honge so editCourse ka flag true mark kardenge
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    //thik hai ham age to chale jayenge par kya bina koi section create karke koi course bana sakta hai??? bilkul nehi..... to age jane ham tabhi denge jab kuch na kuch section create hua hoga
    if(course.courseContent.length === 0){
      toast.error('Add a section to proceed');
      return;
    }
    //agar jitne bhi section add hue hai usme se koi ek bhi section ka video nehi hai to bhi return karjao
    if(course.courseContent.some((section)=> {return section.subSection.length === 0})){
      toast.error('please add at least one lecture in each section');
      return;
    }
    //abhi agar yaha tak aye hein to step 3 me chale jao
    dispatch(setStep(3))
  }



//the submitHnadler actually a tricky part to do why ia m saying this becaue manepaka ki ame server re 2 ta controller lekhthile one is for creating section another is for updating secion au most intresting this is we are doing both creation and updation in this single form
//ame jetebele section name deiki create setcion re click karuche setevbele section create hauchi au hel pare jadi ame edit button re click karuche setebel ie amaku edit pain allow karuchi au edit kariki jetebel puni same button re click karuche section data update bi heijauchi [au ame ete januche kemiti ki ketebele section create hauchi au ketebel section update hauchi???? ] [ simple jetebele "editSectionFlag" false thiba au ame form submit kale then section create hauchi and we are calling section creation api but when its value is true and ame form submit karuche then that means we are updating it ] [also depending upon that flag the text on button also changes to make us know about wheathe we are creating or updating]

  const submitHandler = async (formData)=>{
    setloading(true);
    let result;
    try{

      if(editSectionFlag){
          result = await updateSection ({sectionName: formData.section,sectionId:sectionToBeEdited,courseId: course._id }, token);
          console.log('result after update section:- ' ,result);
      }
      else{
           result = await createSection({sectionName: formData.section,courseId:course._id}, token);
           console.log('result after update section:- ' ,result);
      }

      if(!result){
        toast.error('Failed to create or update section');
        return;
      }
       
      console.log('printing the result i got from step 2: - ' ,result);
      dispatch(setCourse(result));
      seteditSectionFlag(false);
      setValue('section', '')
      toast.success('Section created successfully');

    }catch(err){
      console.log('error occured while creating sections and subsections :- ',err.message);
      console.error(err.message);
    }finally{
      setloading(false);
      
    }
  }

  //so when we updatE a section thwn we need to ooass basicaaly 2 things to the backend that are the updated section name and the sectionid we are trying to edit

  //before goint to how edit here work i will say how we show the sections created in lower div when we create one:- actually when we create one section in acourse by calling to backend then backend creates that , add that section in the provided courseid {how did you got the course id to pass it to backend???} [simple in first step while creating acourse i got the course object in response and i stored that in redux store form there only we can get the course id] so after adding the section to courseid we provided it returns us the complete updated course by populating it [so dekhilu ta populating kebala postman re data dekhiba pain use hau nathila .... populating data also helps us in frontend by giving us data about nested models in a model so that we need not to store multiple data in frontend.... example:- jadi ethi  course amaku populate heiki namilithanta au amkau kebeala section data milithanta then taku store karibaku padithanta as its id will be required while creating subsection hele ebe ama pakahre gote jagare course id bi achi au ta under re thiba sabu subsection ra id bi achi at one place due to populate()]................so when it return the complete course details by populating it we update the state varibale "course" in redux store with the new value

  //then we apply map function on the courseContent array of the course and show the section and there subsections{not yet created} in lower div by using summary and details tag

  //then when we click on edit button of shown section the due "separation of data" property of map function i can get the section id which i want to edit... so i will create a state variable which will store the section id i want to edit now... so when i will click on edit button of a section i will set its avlue as the id associated with that section and while calling to updateSection api i will pass that state variable to it 

  //FUNCTION THAT WILL BE PASSED AS PROP WITH THE NESTEDVIEW COMPONENNT AND WILL BE CALLED WHEN SOMEONE CLICKS ON EDIT SECTION BUTTON
  function handleEditSection (sectionId, sectionName){

    if(sectionToBeEdited === sectionId) {
      //if it is already editing and user clicks on edit then it should cancel the edit
      cancelEdit();
      return;
    }

    seteditSectionFlag(true);
    setsectionToBeEdited(sectionId);
    setValue('section', sectionName);
  }

  return (
    <div className='text-white bg-richblack-800 p-4 flex flex-col gap-5 rounded-lg'>
      <h1 className='text-2xl text-white font-semibold mb-5'>Course Builder</h1>
      <form onSubmit={handleSubmit(submitHandler)} className=''>
          <div className='flex flex-col gap-1'>
            <label htmlFor='section'>Section Name<sup className='text-pink-300'>*</sup></label>
            <input
            id='section'
            name='section'
            placeholder='Enter Section Name'
            type='text'
            className='px-3 py-3 rounded-lg bg-richblack-700 border-b-2 border-b-richblack-600 focus:outline-none '
            {...register('section',{required:true})}
            />
            {
              errors.section && <p className='text-red-500 '>Section Name is required</p>
            }
              
             {/* button part */}
             <div className='flex gap-4'>
                  <button type='submit' className='flex self-start mt-5 justify-center items-center gap-2 text-yellow-50 bg-transparent border-2 border-yellow-50 rounded-md px-3 py-2 hover:bg-yellow-50 hover:text-black font-semibold transition-all duration-200 '>{editSectionFlag ? 'Edit Section Name' : 'Create Section'}
                  <IoIosAddCircleOutline size={20} /> </button>
                  {/* button that will apear only when edit flag is true */}

                  {
                    editSectionFlag && (
                      <button type='button' onClick={()=> cancelEdit} className='flex self-start mt-5 justify-center items-center gap-3 text-yellow-50 bg-transparent border-2 border-yellow-50 rounded-md px-3 py-2 hover:bg-yellow-50 hover:text-black font-semibold transition-all duration-200 '>Cancel</button>
                    )
                  }
             </div>

          </div>
      </form>


      {/* nested view section */}

      {
        course?.courseContent?.length > 0 && (<NestedView handleEditSection={handleEditSection} />)
      }

      <div className='flex justify-end gap-3'>
          <button onClick={goBack} className=' text-white bg-richblack-600  rounded-md px-3 py-2 font-semibold '>Back</button>
          <IconBtn text={'Next'} onclick={goToNext} ></IconBtn>
      </div>
      
    </div>
  )
}

export default CourseBuilderForm


//LETS UNDERSTAND THE FLOW OF THE SECTION CREATION AND EDITING THEM

//intitially the sectionedit flag is false so buttons are there in their noraml look and when i input some text into the input field and click on the button then the form data get registered and a  new section gets created which will be shown in the nestedview component as there we are mapping all the sections of the course and showing them

//so in that componenent beside the section there are section edit and sectio delete buttons . so when i click on delete button then a pop up comes and if i click yes then section get deletd and course from redux gets updated for whihc ui also rerenders as it has subscribed the course state

//this deletion feature will be handled in that <NestedViewComponent> it self

//but  when we click on edit button then the form button in this page i.e courseBuilderForm changes and the section name appears on the input and when we change the section name and clcik the edit button then that section get updated....

//this means someg=how these two components are communicating with each other for which upon clcking on edit button of some section present in <NestedView> component the structure of its parent compoonent changes [button,input field, cancel edit button] etc... and aslo upon submittin by editting the section it also get updated in the <NestedView> component

//so what we will do we will create a funnction and pass that to the <NestedView> component . when someone clicks on edit button of any section the that function is called bby passing the sectionId and the sectionName in it

//the sectionId is allocated to the stateVariable "sectionToBeEdited" so that when the form submitted again the id present in this state varibale get edited

//the sectionName is placed in the inoutFileld for editing and set the statevariable i.e "editSectionFlag" to be tru so that upon submitting the form the updatesection api get called and the section get edited with new name
