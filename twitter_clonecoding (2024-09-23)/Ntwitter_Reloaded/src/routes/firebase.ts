import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvQz8mr3ctXO0u-u1BSwmiUmw7p5EsRLI",
  authDomain: "ntwitter-reloaded-795b2.firebaseapp.com",
  projectId: "ntwitter-reloaded-795b2",
  storageBucket: "ntwitter-reloaded-795b2.appspot.com",
  messagingSenderId: "24644914113",
  appId: "1:24644914113:web:cbebdcaeba1b501a59fd40"
};

const app = initializeApp(firebaseConfig); /* firebaseConfig안의 값들로 app생성 */

export const auth = getAuth(app); /* app에 대한 인증서비스 사용 */