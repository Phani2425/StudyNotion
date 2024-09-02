import React,{useRef, useState} from 'react'
import { FiUploadCloud } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { FileUploader } from "react-drag-drop-files";

const ImageUploader = ({setThumbnailFormData}) => {


    const fileTypes = ["JPG", "PNG", "GIF"];

  const [uploaded,setuploaded]  = useState(false);
  const [previewSource, setpreviewSource] = useState(null);
  const refObject = useRef();

  const changeHandler = (e) => {
    console.log('inside changehandler')
     const thumbnail = e.target.files[0];
     previewCreation(thumbnail);
     setThumbnailFormData(thumbnail);
  }

  const handleChange = (file) => {
    previewCreation(file);
    setThumbnailFormData(file);
  }

  const previewCreation = async (thumbnail) => {
    const reader = new FileReader();
    reader.readAsDataURL(thumbnail);
    reader.onloadend = ()=>{
        setpreviewSource(reader.result);
        setuploaded(true);
    }
  }

  return (
    <div className="flex flex-col gap-1">
    <label htmlFor="courseThumbnail">Course Thumbnail<sup className='text-pink-300'>*</sup></label>
    <div
      id="courseThumbnail"
      className=" bg-richblack-700 placeholder:text-richblack-300 p-4 rounded-lg border-2 border-richblack-500 border-dashed  flex justify-center items-center min-h-72"
    >
      
     {
        uploaded ? (<img className='w-fit h-fit rounded-lg' src={`${previewSource}`}></img>) : (
            <FileUploader handleChange={handleChange} types={fileTypes} hoverTitle={'Drop here'} >
                            <div className='flex flex-col gap-7 items-center'>
        <div className='flex flex-col items-center gap-2 text-richblack-25'>
            <div className='w-10 h-10 rounded-full bg-yellow-900 flex justify-center items-center'><FiUploadCloud size={22} className='text-yellow-100' /></div>
            <p>Drag and Drop an Image or <span onClick={()=>{refObject.current.click()}} className='text-yellow-100 font-bold cursor-pointer'>Browse</span></p>
            <p>Max 6MB each (12MB for videos)</p>
        </div>
        <div className='flex gap-9'>
            <p className= 'flex items-center gap-1 text-richblack-200'><GoDotFill /> Aspect ratio 16:9</p>
            <p className='flex items-center gap-1 text-richblack-200'> <GoDotFill />Recomended Size 1024*576</p>
        </div>
      </div>
            </FileUploader>
        )
     }


    </div>

    <input
    ref={refObject}
    type='file'
    className='hidden'
    onChange={changeHandler}
    />

  </div>
  )
}

export default ImageUploader