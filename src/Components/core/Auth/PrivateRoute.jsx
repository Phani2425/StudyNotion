//like previously we have seen that the elemnts wrapped by the opennroute componenet was only getting rendered only when the open route was recieving them as children and also returning the chilldren

//and it was returning the children if and only if the user is not loged in .....more specifically there is no user data or token data stored in slices and localstorage....

//when there is no data is stored then it can return something else except the children or navigate the user to some other route by using <Navigate/> tag

//it is like parent who is hiding her child from the boys with whom she doesnot want her child to play... so if the boy is from bad boys then mother says something to him or navigate to other vhild house..... but if the boy is good then she let her child to play with him


//SIMILARLY THIS "PRIVATEROUTE" IS A CUSTOM COMPONENT THAT WRAPS OTHER CUSTOM CUMPONENTS IN SIDE IT AND RETURN THEM AS CHILDREN ONLY IF THE USER IS LOGED IN OR SLICES AND LOCALSTORAGE HAVE THE USER DATA IN IT

//IF NOT THEN IT REDIRECT THE USER TO THE LOGIN PAGE

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import React from 'react'

const PrivateRoute = ({children}) => {

    const {user} = useSelector((state)=> state.profile);
     
    if(user) {
        return children
    } else {
        return <Navigate to="/login"/>
    }
}

export default PrivateRoute

    //this can haapen that the user is not loged in but trying to access thhis page so we will redirect him to login page
    //first i will chcek wheather the user has loged in or not