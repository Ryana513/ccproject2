import firebase from "firebase"

const config = {
  apiKey: "AIzaSyDqTkyVSjLcobTGlnOVawr7uFf-em7-Opc",
  authDomain: "groupproject-6b847.firebaseapp.com",
  databaseURL: "https://groupproject-6b847.firebaseio.com",
  projectId: "groupproject-6b847",
  storageBucket: "groupproject-6b847.appspot.com",
  messagingSenderId: "773890413081"
};

firebase.initializeApp(config);

//Reference user collection

let userRef = firebase.database().ref('user');

export default function submitUser(values){
    saveUser(values);
    alert("Thank you for registering with Get Me A Job!");
}

 function saveUser(values){
 let newUserRef = userRef.push();
 newUserRef.set(values);
}