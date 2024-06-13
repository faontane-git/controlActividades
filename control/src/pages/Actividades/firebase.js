// Importa la función necesaria del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Cambiado a firebase/firestore

// Configuración de tu aplicación Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBiH8iOfAoyF3XOAjIfVfwQNqnX6wmnk3Q",
    authDomain: "controlactividades-754be.firebaseapp.com",
    projectId: "controlactividades-754be",
    storageBucket: "controlactividades-754be.appspot.com",
    messagingSenderId: "941603121466",
    appId: "1:941603121466:web:52453a9019b9995d744803"
};

// Inicializa tu aplicación Firebase
const app = initializeApp(firebaseConfig);
// Obtiene una instancia de Firestore
const firestore = getFirestore(app);

// Exporta la instancia de Firestore para su uso en otros archivos
export { firestore };
