// Importar el modulo de Firebase
const firebase = require("firebase/app");
const admin = require('firebase-admin');
const serviceAccount = require("../firebaseService.json");

// Configuracion de Firebase utitlizandp variables de entorno
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Inicializar la app de Firebase con la configuracion definida
firebase.initializeApp(firebaseConfig);

// Importar funciones de Firebase Authentication
const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification, 
    sendPasswordResetEmail
} = require("firebase/auth") ;

// Exportar las funciones de autenticacion y el admin
module.exports = {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    admin
};