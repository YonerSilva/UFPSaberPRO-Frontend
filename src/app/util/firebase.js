import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "@firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from '@firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClv5Dsq79gk3ohdJGk0L_0bKvwNc3x8pM",
    authDomain: "ufpsaberpro.firebaseapp.com",
    projectId: "ufpsaberpro",
    storageBucket: "ufpsaberpro.appspot.com",
    messagingSenderId: "605311880837",
    appId: "1:605311880837:web:e7fcb59be044bde17263ec"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export async function cargarImagen(id_pregunta, carpeta) {
    let inputFile = document.getElementById("formFile");
    if (inputFile.files.length !== 0) {
        let file = inputFile.files[0];
        const fileName = file.name.toString();
        let tipo = "pregunta";
        if(carpeta==="opciones"){
            tipo="opcion";
        }
        let path = modificarNamePreg(id_pregunta,fileName,tipo);
        let imagenRef = carpeta + "/" + path;
        let storageRef = ref(getStorage(firebaseApp), imagenRef);
        const task = await uploadBytes(storageRef, file);

        // Get the download URL
        const url = await getDownloadURL(task.ref);
        return url;
    }
    return "";
};

export function createUserFirebase(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export function updateUserFirebase(email, password) {
    const auth = getAuth();
    const user = auth.currentUser;
    updateEmail(user, email).then(() => {
        // Email updated!
        if (password !== "") {
            updatePassword(user, password).then(() => {
                // Update successful.
            }).catch((error) => {
                // An error ocurred
                // ...
            });
        }
    }).catch((error) => {
        // An error occurred
        // ...
    });
}

export function sign_in_firebase(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export function logout_firebase() {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

export async function eliminarImagen(url, carpeta) {
    if(url==="" || url===null || url === undefined){return;}
    let imagenRef = carpeta + "/" + obtenerNombreImg(url);
    const storage = getStorage();

    // Create a reference to the file to delete
    const task = ref(storage, imagenRef);

    // Delete the file
    await deleteObject(task);
}

function obtenerNombreImg(url) {
    let array = url.split("%2F");
    array = array[1].split("?");
    return array[0];
}

function modificarNamePreg (id_pregunta,fileName, tipo) {
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    return (id_pregunta +'_'+tipo+'_'+usuario.usu_codigo+getExtension(fileName));
}

function getExtension(fileName) {
    const file = fileName;
    let extension = "";
    let char = "";
    for (let i = file.length; i > -1; i--) {
        char = file.toString().charAt(i);
        extension += char;
        if (char === ".")
            i = 0;
    }
    let cadena = "";
    for (let i = extension.length; i > -1; i--) {
        cadena += extension.charAt(i);
    }
    return cadena;
}