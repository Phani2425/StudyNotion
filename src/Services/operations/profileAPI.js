import toast from "react-hot-toast";
import { profile } from "../apis";
import { setUser } from "../../redux/slices/profileSlice";
import { setToken } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiconnector";

export function updateProfilePicture(token, formData) {
  return async (dispatch) => {

    const toastId = toast.loading('Loading...');
    try {

      // Make the API request with FormData
      const response = await apiConnector(
        "PUT", 
        profile.UPDATE_DISPLAY_PICTURE, 
        formData, 
         {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`, // Pass token in the Authorization header
         }
      );

      console.log('response', response);

      if (!response.data.success) {
        toast.error('Error in uploading profile picture');
        throw new Error(response.data.message);
      }

      console.log('New user details after updating the profile pic which will be set to user slice and  localstorage :', response.data.data);
      dispatch(setUser(response.data.data));
      localStorage.setItem('user',JSON.stringify(response.data.data));
      toast.dismiss(toastId);
      toast.success('Profile picture updated successfully');

    } catch (err) {

      console.log('Error occurred while calling the backend for profile picture updation:', err.message);
      console.error(err.message);
      toast.dismiss(toastId);

    }
  }
}

export const updateProfile = (token,data) => {
   
   return async(dispatch) => {
    const toastId = toast.loading('Updating Profile');
    try{
      const response = await apiConnector('PUT', profile.UPDATE_PROFILE, data, 
        //passing header which is generally in json format
        {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, // Pass token in the Authorization header
       }
       )

       if(!response.data.success){
        toast.dismiss(toastId);
         toast.error('error updating profile');
         throw new Error(response.data.message);
       }

       //else
      console.log('updated user details after updating profile:- ', response.data.updatedUserDetails);
       dispatch(setUser(response.data.updatedUserDetails));
       localStorage.setItem('user', JSON.stringify(response.data.updatedUserDetails));
       toast.dismiss(toastId);
       toast.success('profile updated');

    }catch(err){
      console.log('error occured while updating profile',err.message);
      console.error(err.message);
    }
   }

}

//function for deleting the profile
export const deleteProfile = (token,navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading('Deleting Account');
    try{

      const response = await apiConnector('DELETE',profile.DELETE_ACCOUNT,
        //empty body
         {}, 
         //header having token
         {
             "Content-Type": "multipart/form-data",
             "Authorization": `Bearer ${token}`
         }
    )

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    
    
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    toast.dismiss(toastId);
    toast.success('Profile deleted successfully');
    

    }catch(err){
      toast.dismiss(toastId);
      toast.error('error deleting profile');
      console.log('error occurred while deleting profile',err.message);
      console.error(err.message);
      
    }
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      profile.GET_ENROLLED_COURSES,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}
