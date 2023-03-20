// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from "firebase/auth";

import {
  getFirestore,
  onSnapshot,
  collection,
  addDoc,
  query,
  orderBy,
  limitToLast,
  serverTimestamp
} from 'firebase/firestore';

import { generateMessageHtmlTemplate } from "./utils"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNUcNVtJIFqg885G8Gt3-FM9c_skFXUsk",
  authDomain: "fir-utep.firebaseapp.com",
  projectId: "fir-utep",
  storageBucket: "fir-utep.appspot.com",
  messagingSenderId: "954113257809",
  appId: "1:954113257809:web:f474a283b7f2db4460a370"
};

// State
let unsubscribeUser;
let unsubscribeMessages;

// Elements
const messagesContent = document.getElementById("messages-content");
const messageInput = document.getElementById("input-messsage");
const messageInputButton = document.getElementById("input-message-button");
const authButton = document.getElementById("auth-button");
const username = document.getElementById("username");

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

export function getUser() {
  // list of available properties
  // https://firebase.google.com/docs/reference/js/auth.userinfo.md#userinfo_interface
  return auth.currentUser;
}

// Authentication methods
export async function login() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  await signInWithPopup(auth, new GoogleAuthProvider());
}

export function logout() {
  signOut(auth)
}

// Database methods
const database = getFirestore(app);

export async function addMessage() {
  try {
    const currentUser = getUser()

    if (messageInput.value === '' || messageInput.value === null || messageInput.value === undefined) {
      return
    }

    if (!currentUser) {
      alert('Sign In to add a message!')
    }

    // Add doc auto generates an ID for us!
    await addDoc(collection(database, "messages"), {
      content: messageInput.value,
      author: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email
      },
      // Time based from server...
      timestamp: serverTimestamp()
    });

    // Clean up input
    messageInput.value = ''
  } catch (error) {
    console.error("Error adding new message: ", error);
  }
}

export async function listenForMessages() {
  try {
    return onSnapshot(
      query(collection(database, "messages"), orderBy("timestamp", "asc"), limitToLast(10)),
      (snapshot) => {
        // Remove all current children from the div
        // messages.replaceChildren([])

        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // change.doc here is new a new document
            messagesContent.insertAdjacentHTML('beforeend', generateMessageHtmlTemplate(change.doc.data()));
          }
        });

        // when messages come in, scroll to the bottom
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    );
  } catch (error) {
    console.error(error);
  }
}

// Event listeners...
window.addEventListener('load', () => {
  // Listen to  authentication changes...
  unsubscribeUser = onAuthStateChanged(auth, (user) => {
    if (user) {
      authButton.innerHTML = 'Log Out';
      authButton.classList.remove("btn-accent");
      username.innerHTML = user.displayName;
      username.removeAttribute("hidden");
      // messages.removeAttribute("hidden");

    } else {
      authButton.innerHTML = 'Log In';
      authButton.classList.add("btn-accent");
      username.innerHTML = "";
      username.setAttribute("hidden", true);
      // messages.setAttribute("hidden", true);
    }
  });

  // Load the latest 10 messages... and start listening for new messages
  unsubscribeMessages = listenForMessages();
})

// Avoid memory leaks
window.addEventListener('unload', () => {
  unsubscribeUser();
  unsubscribeMessages();
})

authButton.addEventListener("click", () => {
  if (getUser() === null) {
    login()
  } else {
    logout()
  }
});

messageInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") addMessage()
})

messageInputButton.addEventListener("click", addMessage);
