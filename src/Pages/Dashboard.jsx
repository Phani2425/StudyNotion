import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet,useNavigate } from 'react-router-dom';
import Sidebar from '../Components/core/Dashboard/Sidebar'
import ConfirmationModal from '../Components/core/Common/ConfirmationModal'
import { logout } from '../Services/operations/authAPI';


const Dashboard = () => {

  const {loading: profileLoading} = useSelector((state) => state.profile);

  const {loading: authLoading} = useSelector((state) => state.auth); 

    //state variable for showing and hiding the modal of confirmation for log out
    const [showModal, setshowModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();//required for passing it to the logout function
  


  if(authLoading|| profileLoading) {
    return(
        <div className='loader'></div>
    )
  }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] overflow-x-hidden overflow-y-auto  '>

      <div>
        {
          showModal && (
            
              <ConfirmationModal 
              text1={'Are You Sure to get Log Out?'}
              text2={'You will lose all your progress and settings.'}
              btn1Text={'LogOut'}
              btn2Text={'Cancel'}
              btn1Handler={() => {
                dispatch(logout(navigate));
                setshowModal(false);
              }}
              btn2Handler={() => setshowModal(false)}
              setshowModal={setshowModal} />
            
          )
        }
      </div>

        <Sidebar setshowModal={setshowModal}/>
        <div className='min-h-[calc(100vh-3.5rem)] min-w-[calc(100vw-13rem)] absolute left-40'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/> 
            </div>
        </div>


    </div>
  )
}

export default Dashboard