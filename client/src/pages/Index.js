import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signin } from '../services/FireBaseFunction'
<<<<<<< HEAD
=======
import '../CSS/Index/Index.css'
>>>>>>> origin/master


const Index = () => {

<<<<<<< HEAD
    const navigate=useNavigate(null)


    const handleClick=async()=>{
        try {
          await signin()
          navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
  <div>
        <button onClick={handleClick}>
            SignIn
        </button>
    </div>
=======
  const navigate = useNavigate(null)


  const handleClick = async () => {
    try {
      await signin()
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='display-container'>
        <div className='display-content'>
          <h1>UI Text</h1>
          <button onClick={handleClick}>
            Sign_In
          </button>
        </div>
      </div>
>>>>>>> origin/master
    </>
  )
}

export default Index