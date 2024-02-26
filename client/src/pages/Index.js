import React, { useEffect, useState } from 'react'
import { PushMessage, signin } from '../services/FireBaseFunction'
import firebase from '../services/FireBaseService'




const Index = () => {

    const [userData,SetUserData]=useState(null)
    const [TextValue,SetTextValue]=useState('')

    const [messages, setMessages] = useState({});
    console.log(messages)

  useEffect(() => {
    // Create a reference to the "messages" node
    const messagesRef = firebase.database().ref('messages');

    // Set up a listener for real-time updates
    const onDataChange = (snapshot) => {
      const updatedMessages = snapshot.val();
      setMessages(updatedMessages);
    };

    messagesRef.on('value', onDataChange);

    // Clean up the listener when the component is unmounted
    return () => {
      messagesRef.off('value', onDataChange);
    };
  }, []);

    const handleClick=async()=>{
        try {
            const result=await signin()
            const user=result.user
            SetUserData(user)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendText=()=>{
        if(userData){
            const timestamp = firebase.database.ServerValue.TIMESTAMP;
            PushMessage({
                TimeStamp:timestamp,
                SenderId:userData.uid,
                Message:TextValue
            })
            SetTextValue('')
        }
    }
  return (
    <>
    {userData===null?<div>
        <button onClick={handleClick}>
            SignIn
        </button>
    </div>:
    <div>
        <div>
            <p>
             {messages.Message}
            </p>
        </div>
        <input type="text" value={TextValue} onChange={(e)=>SetTextValue(e.target.value)}/>
        <button onClick={handleSendText}>
            send
        </button>
    </div>}
    </>
  )
}

export default Index