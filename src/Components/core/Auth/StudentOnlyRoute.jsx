import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const StudentOnlyRoute = ({children}) => {

  const {user} = useSelector((state) => state.profile);

   if(user.accountType === 'Student'){
    return children;
   }
   else if(user.accountType === 'Instructor'){

    return <Navigate to={'/dashboard/my-profile'}/>
   }

}

export default StudentOnlyRoute

//THIS IS THE COMPONENT WHICH WILL WRAP ANOTHER COMPONENET TO WHICH  WE WILL ONLY ALLOW STUDENTS NOT ANY OTHER USERS