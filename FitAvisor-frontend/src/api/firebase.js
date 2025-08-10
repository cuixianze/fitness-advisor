import { initializeApp } from "firebase/app";
import {
  getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged,
  sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink
} from "firebase/auth";
import { useEffect } from "react";




const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
};

const actionCodeSettings = {
  url: 'http://localhost:3000/login',
  handleCodeInApp: true,
  dynamicLinkDomain: 'project-e90bc.page.link'
}


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();





export function login() {
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth)

}

export function onUserStateChange(callback) {
  return onAuthStateChanged(auth, (user) => { callback(user) })
}

export async function sendSignInLink(email) {
  return sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      alert('인증 링크가 이메일로 전송되었습니다');
    })
    .catch((error) => {
      console.error(error.message);

    })
}

export function emailSignIn() {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('인증을 위해 이메일을 입력해주세요.');
    }

    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        window.localStorage.removeItem('emailForSignIn');
        console.log('로그인 성공:', result.user);
      })
      .catch((error) => {
        console.error('로그인 오류:', error);
      });
  }
}

