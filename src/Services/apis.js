//here we will mention the url of links 
const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",
}

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/generateOtp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    CHANGEPASSWORD_API: BASE_URL + "/auth/changepassword",
  }

 export const ContactEndpoint = {
    CONTATUS_API: BASE_URL + "/reach/contact"
  }


//PROFILE ENDPOINTS
export const profile = {
  GET_USER_DETAILS: BASE_URL + "/profile/getUserDetails",
  UPDATE_DISPLAY_PICTURE: BASE_URL + "/profile/updateDisplayPicture",
  GET_ENROLLED_COURSES: BASE_URL + "/profile/getEnrolledCourses",
  DELETE_ACCOUNT: BASE_URL + "/profile/deleteProfile",
  UPDATE_PROFILE: BASE_URL + "/profile/updateProfile",
  INSTRUCTOR_DASHBOARD: BASE_URL + "/profile/instructorDashboard",
}
  