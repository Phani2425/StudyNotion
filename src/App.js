import React,{useState} from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './Pages/Home'
import PageNotFound from './Components/core/HomePage/PageNotFound'
import NavBar from "./Components/core/Common/NavBar";
import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

const App = () => {

  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="container width-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

  {/* navbar is a common componenet that is why we will place this here and that will dont have any route */}
  {/* as nav bar is common so we will make its component in common folder of core of component */}
      <NavBar/>

      <Routes>

        <Route path='/' element= {<Home/>} />
        <Route path='/*' element={<PageNotFound/>}/>
        <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path='/signup' element={<Signup setLoggedIn={setLoggedIn} />} />

     </Routes>

    </div>
  )
}

export default App;