import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/core/Dashboard/Sidebar'


const Dashboard = () => {

  const {loading: profileLoading} = useSelector((state) => state.profile);

  const {loading: authLoading} = useSelector((state) => state.auth); 

  if(authLoading|| profileLoading) {
    return(
        <div className='loader'></div>
    )
  }

  return (
    <div className='relative flex'>

        <Sidebar/>
        <div className='overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>

    </div>
  )
}

export default Dashboard