import Cookies from 'js-cookie'
// import { pushCallMsgToFirestore, SetCallDetails } from './FireBaseFunction'


export const getUserSession=()=>{
    const data=Cookies.get('userId')
    if(data){
        return data
    }
    return false
}

export const ObjectToArray=(Objects)=>{
    const arrayOfObjects = Object.entries(Objects).map(([userId, user]) => ({
        userId,
        ...user
      }));
       
       
    const sortedArray = arrayOfObjects.sort((a, b) => {
        const listenerA = a.messages?.listener || 0;
        const listenerB = b.messages?.listener || 0;
        
      
        return listenerB - listenerA;
      });
      return sortedArray
}

export const convertToDate=(utcTimeString)=>{
    const utcDate = new Date(utcTimeString);
    
    // Format UTC time to include both date and time components
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDateTime = utcDate.toLocaleString('en-US', options);
    
    return formattedDateTime
    }


// export const StoreToLocalStorage=async(profileid,Time,message)=>{
//    const storedItem= localStorage.getItem(`${profileid}`)
//    if(storedItem)
//    {
//     const result=JSON.parse(storedItem)

//     const myobj={
//         duration:(Time-(new Date(result.EndTime)))/1000,
//         text:message
//     };

//     if(result.messages.length===10){
//         await pushCallMsgToFirestore(profileid,result.callid,result.messages)
//      result.messages=[]
//     }
//     result.EndTime=Time
//     result.messages.push(myobj)
//     localStorage.setItem(`${profileid}`,JSON.stringify(result))
//    }
//    else{
//     const date=new Date()
//     await SetCallDetails(profileid,(`${profileid}`+`${date}`),
//     {
//         StartTime:date
//     })
//     const result={
//         StartTime:date,
//         EndTime:date,
//         callid:(`${profileid}`+`${date}`),
//         messages:[]
//     };
//     const myobj={
//         duration:(Time-result.EndTime)/1000,
//         text:message
//     };
//     result.messages.push(myobj)
//     localStorage.setItem(`${profileid}`,JSON.stringify(result))
//    }
// }


export const secondToTime=(timestamp)=>{
    // const timestamp = {
    //     nanoseconds: 151000000,
    //     seconds: 1709377462
    //   };
      
      const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
      const formattedTime = date.toLocaleTimeString();
      
      return(formattedTime);
      
}

export function extractDataFromQuerySnapshot(querySnapshot) {
    return querySnapshot.map((doc) => {
      return doc.data();
    });
  }
  