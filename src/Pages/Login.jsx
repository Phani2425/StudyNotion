import React from 'react'
import Template from '../Components/core/Common/Template';
import login from '../assets/Images/login.webp';

const Login = () => {
  return (
  
       <Template 
       title='Welcome Back'
       desc1='Build skills for today,tommorow and beyond'
       desc2={`Education to future proof your career`}
       image={login}
       formtype='login'
       />
    
  )
}

export default Login