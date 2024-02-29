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
