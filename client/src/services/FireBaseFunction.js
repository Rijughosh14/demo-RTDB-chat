// import FirebaseApp from "./FireBaseService";
import firebase from './FireBaseService'
import Cookies from 'js-cookie'
import { ObjectToArray } from './UserService'

const databaseRef=firebase.database().ref('messages')


export const signin=async()=>{
   const response=await firebase.auth().signInAnonymously()
   const userid=response.user.uid
   firebase.database().ref('users/'+userid+'/messages').set(
    {
      Message:'',
      TurnId:userid,
      listener:1
    }
   )
   firebase.database().ref('users/'+userid+'/presence').set(
    {
      space:`${userid}`,
      status:'online'
    }
   )

   Cookies.set('userId',userid)
}

export const getCurrentLiveData=async()=>{

  const dbref=firebase.database().ref()
  try {
    const response=await dbref.child('users').get()
    
   const arrayOfObjects=ObjectToArray(response.val())
    return arrayOfObjects ;
    
  } catch (error) {
    console.log(error)
  }
}

export const updateWatching = async(userid, updatedValue) => { 
  if(!userid) return
   const dbref=firebase.database().ref(`users/${userid}/messages`)
   try {
     // Use the update method to modify only the specified key
     await dbref.update({
      listener:updatedValue
     })
    
   } catch (error) {
    console.log(error)
   }
 
 };

export const updateCurrentPresence=async(userid,spacevalue,statusvalue)=>{
  if(!userid||!spacevalue)return
  const dbref=firebase.database().ref(`users/${userid}/presence`)
  try {
    await dbref.update({
      space:spacevalue,
      status:statusvalue
    })
  } catch (error) {
    console.log(error)
  }
  
}

 export const updateMessage=async(userid,msg)=>{
  if(!userid)return
  const dbref=firebase.database().ref(`users/${userid}/messages`)
  try {
    await dbref.update({
      Message:msg
    })
  } catch (error) {
    console.log(error)
  }
 }

 export const updateTurn=async(userid,userdata)=>{
  if(!userid)return
  const dbref=firebase.database().ref(`users/${userid}/messages`)
  try {
    await dbref.update({
      TurnId:userdata
    })
  } catch (error) {
    console.log(error)
  }
 }
 

export const PushMessage=(msg)=>{
   databaseRef.set(msg);
}

