import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signin } from '../services/FireBaseFunction'


const Index = () => {

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
    </>
  )
}

export default Index