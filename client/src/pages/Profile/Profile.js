import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { convertToDate, getUserSession } from '../../services/UserService';



const Profile = () => {

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search);
  const profileId = urlParams.get('profileid')
  const userData = getUserSession()
  const [ProfileMessages, SetProfileMessages] = useState(false)
  const [TextValue, SetTextValue] = useState('')
  const [StartTime, SetStartTime] = useState('')
  const [EndTime, SetEndTime] = useState('')

  const HandleClick = async() => {
    const TimeLineData = JSON.parse(localStorage.getItem(`${profileId}`))
    SetEndTime('')

    if (TimeLineData) {


      SetProfileMessages(true)


      SetStartTime(convertToDate(TimeLineData.StartDate))


      const messages = TimeLineData.messages;

    for (const message of messages) {
      await new Promise(resolve => {
        setTimeout(() => {
          SetTextValue(message.text);
          resolve();
        }, message.duration * 1000);
      });
    }
      

      // SetEndTime after the loop completes
      // const totalDuration = TimeLineData.messages.reduce((sum, message) => sum + message.duration, 0);
      // setTimeout(() => {
      //   SetEndTime(convertToDate(TimeLineData.EndTime));
      // }, totalDuration * 1000);
      SetEndTime(convertToDate(TimeLineData.EndTime));    }
  }

  return (
    <>
      {profileId === userData && <button onClick={HandleClick}>Play</button>}
      {
        ProfileMessages &&
        <div>
          <p>
            Start Time:{StartTime}
          </p>
          {TextValue}
          {EndTime !== '' && <p>
            Ended at {EndTime}
          </p>}
        </div>
      }
    </>
  )
}

export default Profile