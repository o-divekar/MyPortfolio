// Check if Firebase app already exists to prevent duplicate initialization
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyB0iL-yqsmj5TWhmBfeh5RvxSUtE5SnoBM",
    authDomain: "omkarportfolio-61e9a.firebaseapp.com",
    databaseURL: "https://omkarportfolio-61e9a-default-rtdb.firebaseio.com",
    projectId: "omkarportfolio-61e9a",
    storageBucket: "omkarportfolio-61e9a.appspot.com",
    messagingSenderId: "898408260822",
    appId: "1:898408260822:web:f39f9bc13a07f52bd0d577"
  };
  
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();