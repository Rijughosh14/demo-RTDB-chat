import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { signin, storeTextForUserId } from '../services/FireBaseFunction'
import '../CSS/Index/Index.css'
import firebase from '../services/FireBaseService'




const Index = () => {

  const navigate = useNavigate(null)

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search);
  const profileId = urlParams.get('profileid')

  const [Text,SetText]=useState('')
  const [TextValue,SetTextValue]=useState('')

  const handleClick = async () => {
    try {
      const response=await signin()
      if(profileId){
        return
      }
      else{
        navigate(`/?profileid=${response}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sendText=async()=>{
    if(Text==='')return
     storeTextForUserId(profileId,Text)
     SetText('')
  }


  useEffect(()=>{
      handleClick()
  },[])


  useEffect(() => {
    if(profileId){
      // Reference to your Firebase Realtime Database
      const databaseRef = firebase.database().ref(profileId);
  
      // Set up the listener for value changes on the userId node
      const onDataChange = (snapshot) => {
        // The snapshot contains the current value (text) associated with the userId
        const updatedText = snapshot.val();
        SetTextValue(updatedText);
        // console.log(`Value changed for userId: ${userId}. New text: ${updatedText}`);
      };
  
      databaseRef.on('value', onDataChange);
  
      // Clean up the listener when the component unmounts
      return () => {
        databaseRef.off('value', onDataChange);
      };
    }
  }, [profileId]);

  return (
    <>
      <div className='display-container'>
        <div className='display-content'>
          {TextValue}
          <input type="text" value={Text} onChange={(e)=>SetText(e.target.value)}/>
          <button onClick={sendText}>
            send
          </button>
        </div>
      </div>
    </>
  )
}

export default Index