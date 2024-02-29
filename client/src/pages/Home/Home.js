import React, { useEffect, useRef, useState } from 'react'
import { getCurrentLiveData, PushMessage, signin, updateMessage, updateTurn, updateWatching } from '../../services/FireBaseFunction'
import firebase from '../../services/FireBaseService'
import { getUserSession, ObjectToArray } from '../../services/UserService'
import '../../CSS/Home/Home.css'
import HomeComponents from './component.js/HomeComponents'





const Home = () => {

  const [LiveData, SetLiveData] = useState([])
  // detail of user id
  const [userData, SetUserData] = useState(null);
  const [currentIndex, SetcurrentIndex] = useState(0)



  const defaultFunction = async () => {
    if (getUserSession()) return
    await signin()
  }

  const GetLiveData = async () => {
    const response = await getCurrentLiveData()
    SetLiveData(response)
  }


  const handleUpclick = () => {
    const value=currentIndex
    SetcurrentIndex(value - 1)
  }

  const handleDownclick = () => {
    const value=currentIndex
    SetcurrentIndex(value + 1)
  }


  useEffect(() => {
    defaultFunction()
  }, [])

  useEffect(() => {
    GetLiveData()
  }, [])


  useEffect(() => {
    const result = getUserSession()
    SetUserData(result)
  }, [])


  useEffect(() => {
    // Create a reference to the "messages" node
    const liveRef = firebase.database().ref().child('users');

    // Set up a listener for real-time updates
    const onDataChange = (snapshot) => {
      const updatedLive = snapshot.val();
      SetLiveData(ObjectToArray(updatedLive));
    };

    liveRef.on('value', onDataChange);

    // Clean up the listener when the component is unmounted
    return () => {
      liveRef.off('value', onDataChange);
    };
  }, []);


  return (
    <div id='home' >
      <HomeComponents LiveData={LiveData[currentIndex]} userData={userData} />
      {currentIndex> 0 && <button onClick={handleUpclick}>Up</button>
      }
      {currentIndex < LiveData.length - 1 && <button onClick={handleDownclick}>Down</button>
      }
    </div>
  )
}

export default Home