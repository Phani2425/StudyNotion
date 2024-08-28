import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './Pages/Home'
import PageNotFound from './Components/core/HomePage/PageNotFound'
import NavBar from "./Components/core/Common/NavBar";
import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import OpenRoute from './Components/core/Auth/OpenRoute'
import ForgotPassword from './Pages/ForgotPassword'
import UpdatePassword from './Pages/UpdatePassword'
import VerifyEmail from './Pages/VerifyEmail'

const App = () => {



  return (
    <div className="container width-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

  {/* navbar is a common componenet that is why we will place this here and that will dont have any route */}
  {/* as nav bar is common so we will make its component in common folder of core of component */}
      <NavBar/>

      <Routes>

        <Route path='/' element= {<Home/>} />
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='login' element={<OpenRoute> <Login/> </OpenRoute> } />
        <Route path='signup' element={<OpenRoute> <Signup/> </OpenRoute>}/>
        <Route path='forgot-password' element={<OpenRoute> <ForgotPassword/> </OpenRoute>}/>
        <Route path='reset-password/:uuid' element={<UpdatePassword/>}/>
        <Route path='verify-email' element={<VerifyEmail/>}/>
        

     </Routes>

    </div>
  )
}

export default App;