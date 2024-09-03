import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import { deleteSection } from "../../../../../Services/operations/courseDetailAPI";
import { deleteSubsection } from "../../../../../Services/operations/courseDetailAPI";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from '../../../Common/ConfirmationModal'

const NestedView = ({handleEditSection}) => {
  //state variables  which track which type of modal we want to open... is it add type(modal for adding a subsection) or view type(modal for only viewing subsection) or edit type (modal for edititng a subsection)
  const [addSubsection, setaddSubsection] = useState(null);
  const [editSubsection, seteditSubsection] = useState(null);
  const [viewSubsection, setviewSubsection] = useState(null);

  //getting the token from the store
  const { token } = useSelector((state) => state.auth);

  //fetching  courses for mapping themm showing them here
  const { course } = useSelector((state) => state.course);

  //state variable for confirmation modal
  const [confirmationModal, setconfirmationModal] = useState(null);

  const dispatch = useDispatch();

  //function for deleting the setcion

  //here
  const handleDeleteSection = async (sectionId) => {
    const toastId = toast.loading("Deleting Section...");
    try {
      const result = await deleteSection(course._id, sectionId, token);

      console.log("printing course after deleting section : -", result);

      setconfirmationModal(null);
      dispatch(setCourse(result));
      toast.dismiss(toastId);
      toast.success("Section deleted successfully");
    } catch (err) {
      console.log("error occured while deleting section: ", err.message);
      console.error(err.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  //function for handling delete Sub section
  const handleDeleteSubSection = async (sectionId, subSectionId) => {
    const toastid = toast.loading("Deleting SubSection...");
    try {
      const result = await deleteSubsection(
        course._id,
        sectionId,
        subSectionId,
        token
      );

      console.log("printing course after deleting subsection : -", result);

      dispatch(setCourse(result));

      toast.dismiss(toastid);
      toast.success("SubSection deleted successfully");
    } catch (err) {
    } finally {
      toast.dismiss(toastid);
    }
  };

  return (
    <div className="relative">
      <div className="bg-richblack-700 p-4 rounded-lg flex flex-col ">
        {course.courseContent.map((section) => (
          // Section Dropdown
          <details key={section._id} open>
            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleEditSection(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>
                <button
                  onClick={() =>
                    setconfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setconfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>

            {/* Section Lectures */}

            <div className="px-6 pb-4">
              {section.subSection.map((subSection) => (
                //lecture dropdown
                <div className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                  <div
                    onClick={() => {
                      setviewSubsection(subSection);
                    }}
                    className="flex items-center gap-x-3"
                  >
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {subSection.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <button
                      onClick={() => {
                        seteditSubsection(subSection);
                      }}
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setconfirmationModal({
                          text1: "Delete this SubSection?",
                          text2:
                            "the lecture of this subsection will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(section._id, subSection._id),
                          btn2Handler: () => setconfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                    <span className="font-medium text-richblack-300">|</span>
                    {/* <AiFillCaretDown className={`text-xl text-richblack-300`} /> */}
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Lecture to Section */}
            <button
              onClick={() => setaddSubsection(section._id)}
              className="mt-3 flex items-center gap-x-1 text-yellow-50"
            >
              <FaPlus className="text-lg" />
              <p>Add Lecture</p>
            </button>
          </details>
        ))}
      </div>

      {/* here we will define the logic of showing different modals */}

      

      {
        addSubsection && (
            <SubSectionModal
            add={true}
            setmodalData={setaddSubsection}
            modalData={addSubsection}
            />
        )
      }

      {
        viewSubsection && (
            <SubSectionModal
                view={true}
                setmodalData={setviewSubsection}
                modalData={viewSubsection}
                />
        )
      }

      {
        editSubsection && (
            <SubSectionModal
                edit={true}
                setmodalData={seteditSubsection}
                modalData={editSubsection}
                />
        )
      }
      
      

      {
        confirmationModal && (
            <ConfirmationModal
              text1={confirmationModal.text1}
              text2={confirmationModal.text2}
              btn1Text={confirmationModal.btn1Text}
              btn2Text={confirmationModal.btn2Text}
              btn1Handler={confirmationModal.btn1Handler}
              btn2Handler={confirmationModal.btn2Handler}
              setshowModal={setconfirmationModal}
            />
        )
      }


    </div>
  );
};

export default NestedView;
