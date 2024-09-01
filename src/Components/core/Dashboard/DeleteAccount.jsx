import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../Services/operations/profileAPI";
import { useState } from "react";
import ConfirmationModal from "../Common/ConfirmationModal";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  const [showConfirmationModal, setshowConfirmationModal] = useState(false);
  //user is  required to check wheathe it is student or instructor and showing  message in confirmation modal according to it
  const { user } = useSelector((state) => state.profile);

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-3/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300"
            onClick={() => {
              setshowConfirmationModal(true);
            }}
          >
            I want to delete my account.
          </button>
        </div>
      </div>

      {showConfirmationModal && (
        <ConfirmationModal
          text1={"Do you really want to delete your account ?"}
          text2={
            user.accountType === "Student"
              ? "Your all purchased courses and course progresses will be lost and you will not be able to access them again...."
              : "All of your created courses will be lost and you will not be able to access them again...."
          }
          btn1Text="Delete"
          btn2Text="Nah, Just Kidding"
          btn1Handler={handleDeleteAccount}
          btn2Handler={() => {
            setshowConfirmationModal(false);
          }}
        />
      )}
    </>
  );
}
