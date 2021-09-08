import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCZyh2zoydAZeXO3el2p8wXOXQ9-SjApAk",
    authDomain: "tts-project-532f1.firebaseapp.com",
    databaseURL: "https://tts-project-532f1-default-rtdb.firebaseio.com",
    projectId: "tts-project-532f1",
    storageBucket: "tts-project-532f1.appspot.com",
    messagingSenderId: "452365671090",
    appId: "1:452365671090:web:277e311e55f38aee5707ab",
    measurementId: "G-BN1HN7VBGE"
  };


initializeApp(firebaseConfig);

function getFireBaseRef(refPath) {
    return ref(getDatabase(), refPath);
}

export default {
    getFireBaseRef: getFireBaseRef
}