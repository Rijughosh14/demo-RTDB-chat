import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getCallById } from '../../services/FireBaseFunction';
import { firestoredb } from '../../services/FireBaseService';
import { convertToDate, getUserSession } from '../../services/UserService';




const Profile = () => {

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search);
  const profileId = urlParams.get('profileid')
  const userData = getUserSession()
  const [ProfileMessages, SetProfileMessages] = useState(false)
  const [TextValue, SetTextValue] = useState('')
  const [StartTime, SetStartTime] = useState()
  // const [EndTime, SetEndTime] = useState('')
  const [TimeLine,SetTimeLine]=useState([])
  // const [TimeLineMsg,SetTimeLineMsg]=useState([])


  // const getProfileCalls=async()=>{
  //   const dbref=firestoredb.collection('users').doc(`${profileId}`).collection('call')
    
  //   const response=await dbref.get();
  //   const newTimeline = response.docs.map((doc) => doc.id);

  //   SetTimeLine((prevTimeline) => [...prevTimeline, ...newTimeline]);
    
  // }

  // useEffect(()=>{
  //   getProfileCalls()
  // },[])

  useEffect(()=>{
    firestoredb.collection('users').doc(`${profileId}`).collection('call').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Handle document changes
        // console.log('Document ID:', doc.id, 'Data:', doc.data());
        const newTimelineItem = doc.id;

        // Update the state with the new document ID
        SetTimeLine((prevTimeline) => [...prevTimeline, newTimelineItem]);
      });
    });
  },[])


  const displaymsg = async (messages) => {
    console.log(messages);
  
    for (const message of messages) {
      let text = message.text; // Declare text using let to capture the correct value
  
      await new Promise(resolve => {
        setTimeout(() => {
          SetTextValue(text);
          resolve();
        }, message.duration * 1000);
      });
    }
  };
  
  

  const HandleClick = async(data) => {
    const TimeLineData = JSON.parse(localStorage.getItem(`${profileId}`))
    // SetEndTime('')

    SetProfileMessages(true)
    if (TimeLineData) {

      if(TimeLineData.callid===data){
        SetProfileMessages(true)  
        SetStartTime(convertToDate(TimeLineData.StartTime)) 
        const messages = TimeLineData.messages;
        displaymsg(messages)
      
      // SetEndTime(convertToDate(TimeLineData.EndTime));
      return 
      }
     }
     const response=await getCallById(profileId,data)
      console.log(response)
      SetStartTime(response.calldetails)
      // SetTimeLineMsg(response.callmessages)

const reversedMessages = response.callmessages.slice().reverse();

//  reversedMessages.map(async(message) => {
//   // Your mapping logic here
//   await displaymsg(message.data)
// });
for (const message of reversedMessages) {
     await displaymsg(message.data)
} 
  }

  return (
    <>
      {/* {profileId === userData && <button 
      // onClick={HandleClick}
      >Play</button>} */}
      {
        TimeLine.map((data,index)=>{
          return(
            <button 
            key={index}
            onClick={()=>HandleClick(data)}
            >
            {data}
            </button>
          )
        })
      }
      {

      }
      {
        ProfileMessages &&
        <div>
          <p>
            Start Time:{StartTime}
          </p>
          {TextValue}
        </div>
      }
    </>
  )
}

export default Profile