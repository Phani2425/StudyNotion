//from here the call form frontend will go to the controllers of backend
import axios from "axios";

//creating the instance of the axios which will bne called as function inside the api connector function

const axiosInstance = axios.create({});

//now we will declare the apiconnector function which will be exported
//this function will recieve some parameters and pass them to the axiosInstance() Function

export const apiconnector = (method,url,headers,bodydata,params) => {
    return axiosInstance({
        method,
        url,
        headers: headers ? headers : null,
        data: bodydata ? bodydata : null,
        params : params ? params : null
    })
}