import React, { memo, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateCurrentPresence, updateMessage, updateTurn, updateWatching } from '../../../services/FireBaseFunction';
import { getUserSession } from '../../../services/UserService';



const HomeComponents = ({LiveData}) => {

    const inputRef=useRef(null)
    const navigate=useNavigate(null)
    const userData=getUserSession()


    const [TextValue, SetTextValue] = useState('');

    const taketurn = () => {
          if (userData) {
             updateTurn(LiveData?.userId,userData)
          }
        
      }

    const keytaketurn = (event) => {
        if (event.key === 'Enter') {
          if (userData) {
             updateTurn(LiveData?.userId,userData)
          }
        }
      }


    const handleSendText = (event) => {
        if (userData&&(event.key===' '||event.key==='Spacebar')) {
          updateMessage(LiveData?.userId,TextValue)
          SetTextValue('')
        }
      }

    const navigateToProfile=(event)=>{
        event.stopPropagation()
        navigate(`/profile/?profileid=${LiveData?.userId}`)
    }

    useEffect(()=>{
      if(inputRef.current){
        inputRef.current.focus()
      }
    },[])

    useEffect(()=>{
      if(LiveData?.userId){
        if(userData!==LiveData?.userId){
            updateWatching(LiveData?.userId,LiveData?.messages?.listener+1)
            updateCurrentPresence(userData,LiveData?.userId,"busy")           
        }
        else{
            updateCurrentPresence(userData,LiveData?.userId,"online")
        }

        // return()=>{
        //     if(userData!==LiveData?.userId){
    
        //         updateWatching(LiveData?.userId,LiveData?.messages?.listener-1)        
        //     }
        // }
      }
    },[userData,LiveData?.userId])


  return (
    LiveData?.presence?.status==="online"?
    <div onKeyDown={keytaketurn} 
    onClick={taketurn}>
        <div id='watching-div' onClick={navigateToProfile} >
        userid:{LiveData?.userId}
      </div>
      {LiveData?.messages?.TurnId===userData?<div className='word'>
      <input type="text" ref={inputRef} value={TextValue} onChange={(e) => SetTextValue(e.target.value)} onKeyDown={handleSendText} />
      </div>: <div className='word'>
        <h1>
          {LiveData?.messages?.Message}
        </h1>
      </div>}
      <p>
          Watching: {LiveData?.messages?.listener}
        </p>
    </div>:(LiveData?.presence?.status==='busy'&&
    <div>
       {LiveData?.userId} Busy, Present at {LiveData?.presence?.space}
    </div>)
  )
}

export default memo(HomeComponents)