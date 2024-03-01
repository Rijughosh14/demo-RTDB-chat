import Cookies from 'js-cookie'


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


export const StoreToLocalStorage=(profileid,Time,message)=>{
   const storedItem= localStorage.getItem(`${profileid}`)
   if(storedItem){
    const result=JSON.parse(storedItem)
    const myobj={
        duration:(Time-(new Date(result.EndTime)))/1000,
        text:message
    };
    result.EndTime=Time
    result.messages.push(myobj)
    localStorage.setItem(`${profileid}`,JSON.stringify(result))
   }
   else{
    const result={
        StartDate:new Date(),
        EndTime:new Date(),
        messages:[]
    };
    const myobj={
        duration:(Time-result.EndTime)/1000,
        text:message
    };
    result.messages.push(myobj)
    localStorage.setItem(`${profileid}`,JSON.stringify(result))
   }
}

export const convertToDate=(utcTimeString)=>{
const utcDate = new Date(utcTimeString);

// Format UTC time to include both date and time components
const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
const formattedDateTime = utcDate.toLocaleString('en-US', options);

return formattedDateTime
}