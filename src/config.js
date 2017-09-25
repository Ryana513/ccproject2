export const env = 'development';

// config for firebase
export const firebase = {
    apiKey: "AIzaSyDqTkyVSjLcobTGlnOVawr7uFf-em7-Opc",
    authDomain: "groupproject-6b847.firebaseapp.com",
    databaseURL: "https://groupproject-6b847.firebaseio.com",
    projectId: "groupproject-6b847",
    storageBucket: "groupproject-6b847.appspot.com",
    messagingSenderId: "773890413081"
};

// config for react-redux-firebase
export const reduxFirebase = {
    userProfile: 'users',  // root that user profiles are written to
    enableLogging: false,  // enable/disable firebase database logging
    updateProfileOnLogin: false // enable/disable updating of profile on login
    // profileDecorator: (userData) => ({ email: userData.email })  // customize format of user profile
};

export default { env, firebase, reduxFirebase };