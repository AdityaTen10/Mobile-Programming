  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";    
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyApS18OdHnLHwQNJKzKw3_U08nfqta1vFA",
    authDomain: "ad-app-development.firebaseapp.com",
    projectId: "ad-app-development",
    storageBucket: "ad-app-development.firebasestorage.app",
    messagingSenderId: "501714888365",
    appId: "1:501714888365:web:d12f16dd1e0914248ec824"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  console.log("db");
