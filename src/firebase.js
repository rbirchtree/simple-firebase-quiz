import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAofPPmjvpt1dumSSd2V7FOldLlYf4BFxU",
    authDomain: "fir-react-quiz.firebaseapp.com",
    databaseURL: "https://fir-react-quiz.firebaseio.com",
    projectId: "fir-react-quiz",
    storageBucket: "fir-react-quiz.appspot.com",
    messagingSenderId: "10862208061"
  };
  firebase.initializeApp(config);

  export default firebase;
