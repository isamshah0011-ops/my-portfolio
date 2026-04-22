import { auth, onAuthStateChanged, signOut } from "./firebase.js";
import { db, collection, addDoc, getDocs, deleteDoc, doc } from "./firebase.js";

// 🔐 PROTECT ADMIN
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// 🚪 LOGOUT
async function logout() {
    await signOut(auth);
    window.location.href = "login.html";
}
window.logout = logout;

// ➕ ADD PROJECT
async function addProject() {
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;

    if (!title || !desc) {
        alert("Fill all fields");
        return;
    }

    await addDoc(collection(db, "projects"), {
        title,
        description: desc
    });

    alert("Project Added!");
    loadList();
}
window.addProject = addProject;

// 📦 LOAD PROJECTS
async function loadList() {
    const list = document.getElementById("list");

    const querySnapshot = await getDocs(collection(db, "projects"));

    list.innerHTML = "";

    querySnapshot.forEach(docSnap => {
        const p = docSnap.data();

        list.innerHTML += `
            <div class="card">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <button onclick="deleteProject('${docSnap.id}')">Delete</button>
            </div>
        `;
    });
}

// ❌ DELETE PROJECT
async function deleteProject(id) {
    await deleteDoc(doc(db, "projects", id));
    loadList();
}
window.deleteProject = deleteProject;

// LOAD
loadList();