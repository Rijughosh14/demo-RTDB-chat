import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { readPresence, signin, storeTextForUserId, updateListenerCount, updateValuesBasedOnCondition, writePresence } from '../services/FireBaseFunction'
import '../CSS/Index/Index.css'
import firebase from '../services/FireBaseService'
import { CreateSpaceId, getFirstThreeLetters, getUserSession } from '../services/UserService'



const Index = () => {

  const navigate = useNavigate(null)

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search);
  const profileId = urlParams.get('profileid')
  const userid=getUserSession()

  const [Text,SetText]=useState('')
  const [Value,SetValue]=useState({})
  const [CurrentPresence,SetCurrentPresence]=useState('')
  console.log(Value)

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

  const handlePresence=async()=>{
    if(profileId){
      const response=await readPresence(profileId)
      if(response){
        const result=CreateSpaceId(response,userid)
        updateValuesBasedOnCondition(response,result)
        await writePresence(userid,result)
      }
      else{
       const result= getFirstThreeLetters(userid)
       await writePresence(userid,result)
      }
    }
  }

  const sendText=async()=>{
    if(Text==='')return
     storeTextForUserId(CurrentPresence,Text,userid)
     SetText('')
  }


  useEffect(()=>{
      handleClick()
  },[])

  useEffect(()=>{
    handlePresence()
  },[profileId])

  useEffect(()=>{
    updateListenerCount(CurrentPresence)
  },[CurrentPresence])


  useEffect(() => {
    if(userid){
      // Reference to your Firebase Realtime Database
      const databaseRef = firebase.database().ref(userid);
  
      // Set up the listener for value changes on the userId node
      const onDataChange = (snapshot) => {
        // The snapshot contains the current value (text) associated with the userId
        const value = snapshot.val();
        SetCurrentPresence(value)
        // console.log(`Value changed for userId: ${userId}. New text: ${updatedText}`);
      };
  
      databaseRef.on('value', onDataChange);
  
      // Clean up the listener when the component unmounts
      return () => {
        databaseRef.off('value', onDataChange);
      };
    }
  }, [userid]);
console.log(CurrentPresence)

  useEffect(() => {
    if(CurrentPresence){
      // Reference to your Firebase Realtime Database
      const databaseRef = firebase.database().ref(CurrentPresence);
  
      // Set up the listener for value changes on the userId node
      const onDataChange = (snapshot) => {
        // The snapshot contains the current value (text) associated with the userId
        const value = snapshot.val();
        SetValue(value)
        // console.log(`Value changed for userId: ${userId}. New text: ${updatedText}`);
      };
  
      databaseRef.on('value', onDataChange);
  
      // Clean up the listener when the component unmounts
      return () => {
        databaseRef.off('value', onDataChange);
      };
    }
  }, [CurrentPresence]);

  return (
    <>
      <div className='display-container'>
        <p onClick={()=>navigate(`/?profileid=${userid}`)}>
        {userid}
        </p>
        <p>
          {Value?.Listener}
        </p>
        <div className='display-content'>
          {Value?.Text}
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