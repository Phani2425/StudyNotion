import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './Pages/Home'
import PageNotFound from './Components/core/HomePage/PageNotFound'
import NavBar from "./Components/core/Common/NavBar";
import './App.css'

const App = () => {
  return (
    <div className="width-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

  {/* navbar is a common componenet that is why we will place this here and that will dont have any route */}
  {/* as nav bar is common so we will make its component in common folder of core of component */}
      <NavBar/>

      <Routes>

        <Route path='/' element= {<Home/>} />
        <Route path='/*' element={<PageNotFound/>}/>

     </Routes>

    </div>
  )
}

export default App;