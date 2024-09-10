import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { ratingsEndpoints } from "../apis";

export const getAllReviews = async () => {
    try{

        const response = await apiConnector('GET', ratingsEndpoints.REVIEWS_DETAILS_API );
        
        if(!response.data.success){
            toast.error('review can not be fetched for review slider');
            throw new Error(response.data.message);   
        }

        return response.data.data;

    }catch(err){
        console.log('error occured while fetching all reviews...')
        console.error(err.message);
    }
}