
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";
import toast from "react-hot-toast";

export const getAllCoursesOfInstructor = async (token) => {
    try{
        const response = await apiConnector('GET', courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API, null, 
            {
                'Authorization': `Bearer ${token}`
            }
        );

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        
        console.log("data from the instructor courses",response.data.data);

        return response.data.data;
    }catch(err){
        toast.error('Failed to fetch courses of instructor')
        console.log('error occured while fetching courses of instructor:- ',err.message);
    }
}

export const deleteCourse = async (courseId,token) => {
    try{
        const  response = await apiConnector('DELETE', courseEndpoints.DELETE_COURSE_API, {courseId},
            {
                'Authorization': `Bearer ${token}`
            }
        );

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success('Course deleted successfully')
    }catch(err){
        toast.error('Failed to delete course')
        console.log('error occured while deleting course:- ',err.message);
        console.error(err.message);
    }
}

export const getAllCategories = async (token) => {
    try{
         const response = await apiConnector('GET', courseEndpoints.COURSE_CATEGORIES_API, null, {
            'Authorization': `Bearer ${token}`
         })
         if (!response.data.success){
             throw new Error(response.data.message);
         }
         return response.data.data;
    }catch(err){
        toast.error('Failed to fetch categories')
        console.log('error occured while fetching categories:- ',err.message);
        console.error(err.message);
    }
}

export const createCourse = async (token,formData) => {
    try{
        const response = await apiConnector('POST', courseEndpoints.CREATE_COURSE_API, formData, {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        });

        console.log('response form service layer:- ', response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success('Course details added successfully');
        console.log("data from the create course",response.data.data);

        return response.data.data;
    }catch(err){
        toast.error('Failed to create course')
        console.log('error occured while creating course:- ',err.message);
        console.error(err.message);
    }
}


export const editCourseDetails = async (formData,token) => {
    try{
        const response = await apiConnector('POST', courseEndpoints.EDIT_COURSE_API, formData, {

            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success('Course details updated successfully');
        console.log("data from the edit course details",response.data.data);

        return response.data.data;

    }catch(err){
        console.log('error occured while editing course details: ',err.message);
        console.error(err.message);
    }
}

export const getCourseDetails = async (courseId) => {
    try{

        const response = await apiConnector('POST', courseEndpoints.COURSE_DETAILS_API ,{courseId})

        console.log('response is: - ',response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        console.log("data from the get course details",response.data.courseDetail);

        return response.data.courseDetail;

    }catch(err){
        console.log('error occured while getting course details: ',err.message);
        console.error(err.message);
    }
}

export const getFullDetailsOfCourse = async(courseId, token) => {
    try{

        const response = await apiConnector('POST', courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED, {courseId: courseId},
            {
                'Authorization' : `Bearer ${token}`
            }
        )


        if(!response.data.success){
            throw new Error(response.data.message);
        }

        console.log('response of the full course details is:- ', response.data.data);

        return response.data.data;



    }catch(err){
        console.log('error occured while getting full details of course: ',err.message);
        console.error(err.message);
    }
}

export const createSection = async ({sectionName, courseId},token ) => {
    try{

        const response = await apiConnector('POST', courseEndpoints.CREATE_SECTION_API, {sectionName, courseId}, {
            'Authorization': `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data.course;

    }catch(err){
        console.log('error occured while creating a section: ',err.message);
        console.error(err.message);
    }
}

export const updateSection = async ({sectionName, sectionId, courseId},token) => {
    try{
        const response = await apiConnector('POST', courseEndpoints.UPDATE_SECTION_API, {sectionName, sectionId,courseId}, {
            'Authorization': `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        console.log(response.data.message);
        return response.data.course;
    }catch(err){
        console.log('error occured while updating a section: ',err.message);
        console.error(err.message);
    }
}

export const deleteSection = async (courseId , sectionId, token) => {
    try{

        const response = await apiConnector('POST', courseEndpoints.DELETE_SECTION_API, {courseId:courseId, sectionId: sectionId}, {
            'Authorization': `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data.course;

    }catch(err){
       console.log('error occured while deleting a section: ',err.message);
       console.error(err.message);
    }
}

export const deleteSubsection =  async (courseId,sectionId,subSectionId,token) => {
    try{
        const response = await apiConnector('POST', courseEndpoints.DELETE_SUBSECTION_API, {courseId:courseId, sectionId:sectionId, subSectionId: subSectionId}, {
            'Authorization': `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data.course;
    }catch(err){
        console.log('error occured while deleting a subsection: ',err.message);
        console.error(err.message);
    }
}

export const createSubSection = async (formData,token) => {
    try{
        const response = await apiConnector('POST', courseEndpoints.CREATE_SUBSECTION_API, formData, {

            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data.course;

    }catch(err){
        console.log('error occured while creating a subsection: ',err.message);
        console.error(err.message);

    }
}

export const updateSubsection = async (formData, token) => {
    try{
        const response = await apiConnector('POST', courseEndpoints.UPDATE_SUBSECTION_API, formData, {

            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data.course;

    }catch(err){
        console.log('error occured while updating a subsection: ',err.message);
        console.error(err.message);
    }
}

export const saveReview = async (courseId, rating, review, token) => {
    const toastId = toast.loading('Posting Review...');
    try{

        const response = await apiConnector('POST', courseEndpoints.CREATE_RATING_API, {courseId: courseId, rating: rating, review: review}, 
            {
            'Authorization': `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
         
        toast.dismiss(toastId);
        toast.success('Review Posted Successfully');
        

    }catch(err){
        toast.dismiss(toastId);
        toast.error('Failed to save review');
        console.log('error occured while saving review: ',err.message);
        console.error(err.message);
    }
}


export const markLectureAsComplete = async (courseId, subsectionId, token) => {
    try{

        const response = await apiConnector('POST', courseEndpoints.LECTURE_COMPLETION_API, {courseId: courseId, subsectionId: subsectionId}, {
            'Authorization' : `Bearer ${token}`
        })

        if(!response.data.success){
            toast.error('Lecture can not be marked as complete');
            throw new Error(response.data.message);
            
        }

        

    }catch(err){
        console.log('error occured while marking lecture as complete: ',err.message);
        console.error(err.message);
    }
}
