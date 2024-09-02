import React from 'react'
import { Link } from 'react-router-dom/dist'

const Button = ({children,active,linkto}) => {
  return (
    <Link to={linkto}>
        <div className = {`text-center text-[13px] px-3 py-3 md:px-6 md:py-3 rounded-md ${active?'bg-yellow-100 text-black border-yellow-25' :'bg-richblack-800 border-richblack-600 text-white' } hover:scale-95 transition-all duration-200 font-semibold shadow-sm border-r-2 border-b-2 text-[16px] hover:shadow-richblack-600 hover:shadow-lg text-center` } >
            {children}
        </div>
    </Link>
  )
}

export default Button