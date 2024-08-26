import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './Pages/Home'
import PageNotFound from './Components/core/HomePage/PageNotFound'
import './App.css'

const App = () => {
  return (
    <div className="width-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>

        <Route path='/' element= {<Home/>} />
        <Route path='/*' element={<PageNotFound/>}/>

     </Routes>

    </div>
  )
}

export default App;