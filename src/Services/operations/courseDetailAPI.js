
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
        
        toast.success('Courses fetched successfully')
        console.log("data from the instructor courses",response.data.data);

        return response.data.data;
    }catch(err){
        toast.error('Failed to fetch courses of instructor')
        console.log('error occured while fetching courses of instructor:- ',err.message);
    }
}

export const deleteCourse = async ({courseId},token) => {
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
        const response = await apiConnector('PUT', courseEndpoints.UPDATE_SECTION_API, {sectionName, sectionId,courseId}, {
            'Authorization': `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data.course;
    }catch(err){
        console.log('error occured while updating a section: ',err.message);
        console.error(err.message);
    }
}

export const deleteSection = async (courseId , sectionId, token) => {
    try{

        const response = await apiConnector('DELETE', courseEndpoints.DELETE_SECTION_API, {courseId:courseId, sectionId: sectionId}, {
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
        const response = await apiConnector('DELETE', courseEndpoints.DELETE_SUBSECTION_API, {courseId:courseId, sectionId:sectionId, subSectionId: subSectionId}, {
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

export const createSubSection = async (courseId,sectionId,token) => {
    try{
        const response = await apiConnector('POST', courseEndpoints.CREATE_SUBSECTION_API, {courseId:courseId, sectionId:sectionId}, {
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

export const updateSubsection = async (courseId, sectionId, subSectionId, subsectionData, token) => {
    try{
        const response = await apiConnector('PUT', courseEndpoints.UPDATE_SUBSECTION_API, {courseId:courseId, sectionId:sectionId, subSectionId: subSectionId, ...subsectionData}, {
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