import React from 'react'
import Template from '../Components/core/Common/Template';
import signup from '../assets/Images/signup.webp';

const Signup = ({setLoggedIn}) => {
  return (
    <Template 
    title='Join the millionns learning to code with StudyNotion for free'
    desc1='Build skills for today,tommorow and beyond'
    desc2='Education to future proof your career'
    image={signup}
    formtype='signup'
    setLoggedIn={setLoggedIn}
    />
  )
}

export default Signup