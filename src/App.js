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
import ContactUs from './Pages/ContactUs'
import AboutUs from './Pages/AboutUs'
import Dashboard from './Pages/Dashboard'
import Profile from './Components/core/Dashboard/Profile';
import EnrolledCourses from './Components/core/Dashboard/Courses/EnrolledCourses'
import PrivateRoute from './Components/core/Auth/PrivateRoute'
import Setting from './Components/core/Dashboard/Setting';
import Cart from './Components/core/Dashboard/Cart/index';
import StudentOnlyRoute from './Components/core/Auth/StudentOnlyRoute'
import InstructorOnlyRoute from './Components/core/Auth/InstructorOnlyRoute'
import InstructorCourses from './Components/core/Dashboard/Instructor/InstructorCourses'
import AddCourse from './Components/core/Dashboard/AddCourse'
import EditCourse from './Components/core/Dashboard/EditCourse/index'
import Catalog from './Pages/Catalog'
import CoursePage from './Pages/CoursePage'

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
        <Route path='reset-password/:token' element={<UpdatePassword/>}/>
        <Route path='verify-email' element={<VerifyEmail/>}/>
        <Route path='contact' element={<ContactUs/>}/>
        <Route path='about' element={<AboutUs/>}/>

        {/* nested route */}
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}>
            <Route path='/dashboard/my-profile' element={<Profile/>}/>
            <Route path='/dashboard/settings' element={<Setting/>}/>
            <Route path='/dashboard/enrolled-courses' element={<StudentOnlyRoute><EnrolledCourses/></StudentOnlyRoute>}/>
            <Route path='/dashboard/cart' element={<StudentOnlyRoute><Cart/></StudentOnlyRoute>}/>
            <Route path='/dashboard/my-courses' element={<InstructorOnlyRoute><InstructorCourses/></InstructorOnlyRoute>}/>
            <Route path='/dashboard/add-course' element={<InstructorOnlyRoute><AddCourse/></InstructorOnlyRoute>}/>
            <Route path='/dashboard/edit-course/:courseId' element={<InstructorOnlyRoute><EditCourse/></InstructorOnlyRoute>}/>
            
        </Route>

        <Route path='/catalog/:catalogName' element={<Catalog/>}/>
        <Route path='/courses/:courseId' element={<CoursePage/>}/>
        

     </Routes>

    </div>
  )
}

export default App;