import { auth, signInWithEmailAndPassword } from "./firebase.js";

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        window.location.href = "admin.html";
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

window.login = login;