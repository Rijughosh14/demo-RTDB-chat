// import FirebaseApp from "./FireBaseService";
import firebase from './FireBaseService'


export const signin=()=>{
    return firebase.auth().signInAnonymously()
}

export const PushMessage=(msg)=>{
     firebase.database().ref('messages').set(msg);
}

