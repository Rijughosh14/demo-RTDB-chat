import React, { useEffect, useRef, useState } from 'react'
import { getCurrentWatching, PushMessage, updateMessage, updateTurn, updateWatching } from '../../services/FireBaseFunction'
import firebase from '../../services/FireBaseService'
import { getUserSession } from '../../services/UserService'
import '../../CSS/Home/Home.css'


const Home = () => {

  const [messages, setMessages] = useState({});
  const [TextValue, SetTextValue] = useState('');
  // detail of user id
  const [userData, SetUserData] = useState(null);
  const [watchdata,Setwatchdata]=useState('')

  const inputRef=useRef(null)


  const defaultFunction=async(value)=>{
    const response=await getCurrentWatching()
    if(response){
       updateWatching(response+value)
       Setwatchdata(response+value)
    }
    else{
      PushMessage({
        SenderId: getUserSession(),
        TurnId:getUserSession(),
        Message: '',
        watching:1
      })
    }
  }

  
  useEffect(()=>{
    if(inputRef.current){
      inputRef.current.focus()
    }
  },[])
  

  useEffect(() => {
    const result = getUserSession()
    SetUserData(result)
    defaultFunction(+1)

    return()=>{
      defaultFunction(-1)
    }
},[])


  useEffect(() => {
    // Create a reference to the "messages" node
    const messagesRef = firebase.database().ref('messages');

    // Set up a listener for real-time updates
    const onDataChange = (snapshot) => {
      const updatedMessages = snapshot.val();
      setMessages(updatedMessages);
      Setwatchdata(updatedMessages.watching)
    };

    messagesRef.on('value', onDataChange);

    // Clean up the listener when the component is unmounted
    return () => {
      messagesRef.off('value', onDataChange);
    };
  }, []);


  const handleSendText = (event) => {
    if (userData&&event.key===' ') {
      // const timestamp = firebase.database.ServerValue.TIMESTAMP;
      updateMessage(TextValue)
      SetTextValue('')
    }
  }

  const taketurn=(event)=>{
    if(event.key==='Enter'){
      if(userData){
        updateTurn(userData)
      }
    }
  }

  return (
    <div id='home' onKeyDown={taketurn} tabIndex={0}>
      <div id='watching-div'>
        <p>
          Watching: {watchdata}
        </p>
      </div>
      {messages.TurnId===userData?<div className='word'>
      <input type="text" ref={inputRef} value={TextValue} onChange={(e) => SetTextValue(e.target.value)} onKeyDown={handleSendText} />
      </div>: <div className='word'>
        <h1>
          {messages.Message}
        </h1>
      </div>}
      {/* <button onClick={handleSendText}>
        send
      </button> */}
    </div>
  )
}

export default Home