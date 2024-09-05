import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";
import toast from 'react-hot-toast';

export const getCatalogData = async (categoryId) => {
    const toastId = toast.loading('Loading...');
try{

    const response = await apiConnector('POST', catalogData.CATALOGPAGEDATA_API, {categoryId});

    console.log('response from the category page detail api:- ', response);

    if(!response.data.success){
        throw new Error(response.data.message);
    }

    return response.data.data;

}catch(err){

    console.log('error occured while getting category page details : - (for detail error see the network tab in console)' , err.message );

    console.error(err.message);

}finally{
    toast.dismiss(toastId);

}
}