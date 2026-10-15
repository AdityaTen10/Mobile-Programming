import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyApS18OdHnLHwQNJKzFw08nfqta1vFA",
    authDomain: "ad-app-development.firebaseapp.com",
    projectId: "ad-app-development",
    storageBucket: "ad-app-development.firebasestorage.app",
    messagingSenderId: "501714888365",
    appId: "1:501714888365:web:d12f16dd1e0914248ec824"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(
    app,
    "https://ad-app-development-default-rtdb.firebaseio.com"
);


const form = document.getElementById("contactForm");
const status = document.getElementById("statusMessage");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !phone || !message) {

        status.textContent = "Please fill in all fields.";
        return;
    }


    try {

        const contactRef = push(ref(db, "contacts"));

        const contactData = {

            id: contactRef.key,
            name: name,
            email: email,
            phone: phone,
            message: message,
            createdAt: new Date().toISOString()

        };

        await set(contactRef, contactData);


        console.log("Data added successfully!");
        console.log("Contact ID:", contactRef.key);
        console.log("Data:", contactData);

        status.textContent = "Data added successfully!";

        form.reset();


    } catch (error) {

        console.error("Firebase error:", error);

        status.textContent = "Error: " + error.message;

    }

});

