// import FirebaseApp from "./FireBaseService";
import firebase, { firestoredb } from './FireBaseService'
import Cookies from 'js-cookie'
import { extractDataFromQuerySnapshot, ObjectToArray, secondToTime } from './UserService'



const databaseRef=firebase.database().ref('messages')
const msgCollectionRef=firestoredb.collection('Message')


export const signin=async()=>{
  const response=await firebase.auth().signInAnonymously()
  const userid=response.user.uid
  Cookies.set('userId',userid)
  return userid
}

export const SignInWithPassword=async()=>{

}
export const storeTextForUserId = (profileId, text) => {
  if(!profileId) return
  // Reference to your Firebase Realtime Database
  const databaseRef = firebase.database().ref(profileId);

  // Set the value (text) associated with the userId
  databaseRef.update({
    Text: text,
  })
    .then(() => {
      console.log(`Text stored successfully for userId: ${profileId}`);
    })
    .catch((error) => {
      console.error(`Error storing text for userId: ${profileId}`, error);
    });
};


// export const getCurrentLiveData=async()=>{

//   const dbref=firebase.database().ref()
//   try {
//     const response=await dbref.child('users').get()
    
//    const arrayOfObjects=ObjectToArray(response.val())
//     return arrayOfObjects ;
    
//   } catch (error) {
//     console.log(error)
//   }
// }

export  const readPresence = async (userId) => {
  if (!userId) return null;

  const dbRef = firebase.database().ref(userId);

  try {
    // Use the once method to retrieve the data from the userId node
    const snapshot = await dbRef.once('value');
    
    // Access the value using snapshot.val()
    const data = snapshot.val();

    console.log(`Data read successfully for userId: ${userId}`, data);

    return data;
  } catch (error) {
    console.error(`Error reading data for userId: ${userId}`, error);
    return null;
  }
};

export const writePresence = async (userId, data) => {
  if (!userId) return;

  const dbRef = firebase.database().ref(userId);

  try {
    // Use the set method to write the data to the userId node
    await dbRef.set(data);
    console.log(`Data written successfully for userId: ${userId}`);
  } catch (error) {
    console.error(`Error writing data for userId: ${userId}`, error);
  }
};

export const updateListenerCount = async (userId, incrementValue = 1) => {
  if (!userId) return;

  const dbRef = firebase.database().ref(userId);

  try {
    // Use the transaction method to atomically update the Listener count
    await dbRef.transaction((currentData) => {
      if (!currentData) {
        // If the current data is null, initialize it with the Listener key
        return {
          Text: '',
          Listener:incrementValue
        };
      } else if (typeof currentData === 'object' && 'Listener' in currentData) {
        // If the current data is an object with the Listener key, increment it
        currentData.Listener = (currentData.Listener || 0) + incrementValue;
        return currentData;
      } else {
        // If the current data doesn't have the Listener key, add it
        return { ...currentData, Listener: incrementValue };
      }
    });
  } catch (error) {
    console.error(error);
  }
};


export const updateValuesBasedOnCondition = async (searchValue, newData) => {
  const db = firebase.database();
  const parentRef = db.ref(); // Root reference

  try {
    // Fetch all user IDs
    const userIDsSnapshot = await parentRef.once('value');
    const userIDs = Object.keys(userIDsSnapshot.val());

    // Iterate over each user ID and update values based on the condition
    for (const userID of userIDs) {
      const userRef = parentRef.child(userID);

      // Fetch current value at the user ID node
      const snapshot = await userRef.once('value');
      const currentValue = snapshot.val();

      // Check if the current value matches the searchValue
      if (currentValue === searchValue) {
        // If it matches, update the value to newData
        await userRef.set(newData);
        console.log(`Value updated successfully for user ID: ${userID}`);
      } else {
        console.log(`Condition not met for user ID: ${userID}`);
      }
    }

    console.log('All updates completed');
  } catch (error) {
    console.error('Error updating values:', error);
  }
};

// export const updateCurrentPresence=async(userid,spacevalue,statusvalue)=>{
//   if(!userid||!spacevalue)return
//   const dbref=firebase.database().ref(`users/${userid}/presence`)
//   try {
//     await dbref.update({
//       space:spacevalue,
//       status:statusvalue
//     })
//   } catch (error) {
//     console.log(error)
//   }
  
// }

//  export const updateMessage=async(userid,msg)=>{
//   if(!userid)return
//   const dbref=firebase.database().ref(`users/${userid}/messages`)
//   try {
//     await dbref.update({
//       Message:msg
//     })
//   } catch (error) {
//     console.log(error)
//   }
//  }

//  export const updateTurn=async(userid,userdata)=>{
//   if(!userid)return
//   const dbref=firebase.database().ref(`users/${userid}/messages`)
//   try {
//     await dbref.update({
//       TurnId:userdata
//     })
//   } catch (error) {
//     console.log(error)
//   }
//  }

// export const PushMessage=(msg)=>{
//    databaseRef.set(msg);
// }

// export const pushCallMsgToFirestore=async(userid,callid,textArray)=>{

//   const UserCallRef=userdocRef.doc(`${userid}`).collection('call').doc(`${callid}`)
//   try {  
//    await  UserCallRef.collection('messages').add({data:textArray})
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const SetCallDetails=async(userid,callid,calldetails)=>{
//   const UserCallRef=userdocRef.doc(`${userid}`).collection('call').doc(`${callid}`)
//   try {
//     await UserCallRef.set(calldetails,{merge:true})
//   } catch (error) {
//     console.log(error)
//   }
// }


// export const getCallById=async(userid,callid)=>{

//   const UserCallRef=userdocRef.doc(`${userid}`).collection('call').doc(`${callid}`)

//   const calldetails=await UserCallRef.get()
//   const callmessages=await UserCallRef.collection('messages').get()

//   return (
//     {
//       calldetails:secondToTime(calldetails.data().StartTime),
//       callmessages:extractDataFromQuerySnapshot(callmessages.docs)
//     })
// }




