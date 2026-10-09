import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";


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

const db = getDatabase(app);


// =========================
// ADD USER
// =========================

function writeUserData(userId, firstname, lastname) {

    set(ref(db, "users/" + userId), {

        id: userId,
        fname: firstname,
        lname: lastname

    })
    .then(() => {

        console.log("User added successfully");

    })
    .catch((error) => {

        console.error("Error adding user:", error);

    });
}


// Make writeUserData available to HTML
window.writeUserData = writeUserData;


// =========================
// GET ONE USER
// =========================

function getUser(userId) {

    const userRef = ref(db, "users/" + userId);

    get(userRef)
        .then((snapshot) => {

            if (snapshot.exists()) {

                console.log(snapshot.val());

            } else {

                console.log("User not found");

            }

        })
        .catch((error) => {

            console.error("Error getting user:", error);

        });
}


// Make getUser available to HTML
window.getUser = getUser;