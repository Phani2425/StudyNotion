import { useRef } from "react"
import IconBtn from "./IconBtn"

export default function ConfirmationModal(modalData) {

  const refObj = useRef({});

  //what am i doing??? i am setting the reference object to point to the outer div and when someone will click the outer div then only the modal closes
  const clickHandler = (e) => {
    if(e.target === refObj.current){
      modalData.setshowModal();
    }
  }

  return (
    <div ref={refObj} className="fixed inset-0 z-50  !mt-0 grid place-items-center overflow-auto   backdrop-blur-sm" onClick={clickHandler}>
      <div  className="w-11/12 z-10 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6" >
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}