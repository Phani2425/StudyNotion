import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const StudentOnlyRoute = ({children}) => {

  const {user} = useSelector((state) => state.profile);

   if(user.accountType === 'Instructor'){
    return children;
   }
   else if(user.accountType === 'Student'){

    return <Navigate to={'/dashboard/my-profile'}/>
   }

}

export default StudentOnlyRoute

//THIS IS THE COMPONENT WHICH WILL WRAP ANOTHER COMPONENET TO WHICH  WE WILL ONLY ALLOW STUDENTS NOT ANY OTHER USERS