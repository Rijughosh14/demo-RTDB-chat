// import FirebaseApp from "./FireBaseService";
import firebase from './FireBaseService'
import Cookies from 'js-cookie'

const databaseRef=firebase.database().ref('messages')


export const signin=async()=>{
   const response=await firebase.auth().signInAnonymously()
   const userid=response.user.uid
   Cookies.set('userId',userid)
}

export const getCurrentWatching=async()=>{
   const response=await databaseRef.child("watching").once('value')
   return response.val();
}

export const updateWatching = ( updatedValue) => { 
   const updateObject = {};
   updateObject["watching"] = updatedValue;
 
   // Use the update method to modify only the specified key
   databaseRef.update(updateObject)
     .then(() => {
       console.log('Message updated successfully.');
     })
     .catch((error) => {
       console.error('Error updating message:', error.message);
     });
 };

 export const updateMessage=async(msg)=>{
   const updateObject={};
   updateObject["Message"]=msg;
   await databaseRef.update(updateObject)
 }

 export const updateTurn=async(id)=>{
   const updateObject={};
   updateObject["TurnId"]=id;
   await databaseRef.update(updateObject)
 }
 

export const PushMessage=(msg)=>{
   databaseRef.set(msg);
}

