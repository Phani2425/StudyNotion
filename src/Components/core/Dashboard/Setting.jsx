import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUpload } from "react-icons/fi";
import { updateProfilePicture } from '../../../Services/operations/profileAPI';
import ProfileInformation from './ProfileInformation';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const Setting = () => {

  const{user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state)=>state.auth);

  //ref object for refering the  input file field
  const refObject = useRef();

  const [loading,setloading] = useState(false);
  const [file, setfile] = useState(null);
  //why  we need previewSource??? kain na jetebele file upload  haba setebele mu js ra gote special objcet "fileReader" ra instance use kariki file ku read karinebi as a url by using a method called "readAsDataUrl()" then it will return me the url of the file and i will aplpply the url in to the image section of the profile
  const [previewSource, setpreviewSource] = useState(null);

  const changeHandler = (e) => {
    //2 step
    //fetch the file from files array of input(as there is a single file so it would be present in the 0th index) & if file exists then it will return file else null
    //if file exist then update the state variable file and call a function for upadateing "previewSource" state variable
    const Imagefile = e.target.files[0];
    if(Imagefile){
      setfile(Imagefile);
      previewSetFunction(Imagefile);
    }
  }

  //this function will basically read the content of file as data url and set the returned url to the previwSource
  function previewSetFunction(Imagefile){
    //ye function ye kaam kese karega
    //kichi nahi bhai js ra gote inbuild object achi callled:- "FileReader".. tara instance gote neiki sethire jadi ame kichi method apply kariba the sie file ku read karipariba....type of method will be specific for specific use cases...example:- for reading the file and converting it ot a url:- readAsDataURL(file)

    const reader = new FileReader();
    reader.readAsDataURL(Imagefile);
       //onloadend is the method which runs the function assigned to it if the file reading is succesfull
    reader.onloadend = () => {
      setpreviewSource(reader.result);
    }
  }

  const dispatch = useDispatch();

  const uploadToCloudinary = (file) => {
    //here we cant sent the file normally... rememebr in the postman too we were sending it in 'FormData' in a key-value pair...
    //so we need to convert the file to a form data object and then send it to the server...
    //FormData object is a built-in HTML form data structure for sending data between a web application and a server.
    setloading(true);
    const formData = new FormData();
    formData.append('displayPicture', file);

     dispatch(updateProfilePicture(token,formData)).then(()=>{
      setloading(false);
     });
  }

//i wanted to hide tthe input field and show a button to browse file form computer for that i have added the file input box and a button in adiv and made the input field hidden so that only button is visible... now my task was to click on input field on clicking the button so i will use "useRef" hook so that i can make the refobjject point to the hidden input field and when i click on the button the the field pointed by the refObject should get clicked
  function inputFileHandler(e) {
    //some important properties and methods of refObject created by useref hook
    //properties:- current
    //methods:- click(), scrollIntoView()
     refObject.current.click();
  }

  return (
    <div className="flex flex-col text-white gap-5">
    <h1 className="font-bold text-4xl mb-5">Edit Profile</h1>

    <div className="flex justify-between bg-richblack-800 px-12 py-9 w-full rounded-lg">
      <div className="flex gap-7 items-center">
        <img src={ `${user?.image}`} className="rounded-full w-20 h-20 object-cover" />
        <div className='flex flex-col items-start justify-center gap-5'>
           <h2 className="font-semibold text-lg">Change Profile Picture</h2>
           
           {/* section for photo browsing and uploading */}
           <div className='flex flex-row justify-start items-center gap-5'>
                
                <div>
                <button className='bg-richblack-700 font-semibold text-white  py-2 px-5 rounded-md cursor-pointer ' onClick={inputFileHandler}>Select</button>
                <input ref={refObject} className='hidden' type="file" name="profilepic" id="profile" onChange={changeHandler} />
                </div>

                {/* as this button have a icon so we will use icon button */}

                 <button className={` bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 `} text={'Upload'} onClick={()=>{uploadToCloudinary(file)}}>
                    {
                      loading ? (<div className='loader h-5 w-7'></div>) : 
                      (<div className='flex items-center gap-2 justify-center'>                   
                         Upload
                        <FiUpload />
                        </div>)
                    }
                 </button>

           </div> 
        </div>
      </div>


 
    </div>

    {/* form next we will make separate component for all */}

    {/* component of profile data update */}

    <ProfileInformation/>

    {/* comnponent for changing password */}
    <ChangePassword/>

    {/* component for account delete */}
    <DeleteAccount/>


  </div>
  )
}

export default Setting