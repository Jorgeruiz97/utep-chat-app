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
  // ...
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

// Initialize Authentication

export function getUser() {
  // list of available properties
  // https://firebase.google.com/docs/reference/js/auth.userinfo.md#userinfo_interface

}

// Authentication methods
export async function login() {
  // Sign in Firebase using popup auth and Google as the identity provider.

}

export function logout() {

}

// Database methods


export async function addMessage() {

}

export async function listenForMessages() {

}

// Event listeners...
window.addEventListener('load', () => {
  // Listen to  authentication changes...

  // Load the latest 10 messages... and start listening for new messages

})

// Avoid memory leaks
window.addEventListener('unload', () => {

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
