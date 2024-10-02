import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvQz8mr3ctXO0u-u1BSwmiUmw7p5EsRLI",
  authDomain: "ntwitter-reloaded-795b2.firebaseapp.com",
  projectId: "ntwitter-reloaded-795b2",
  storageBucket: "ntwitter-reloaded-795b2.appspot.com",
  messagingSenderId: "24644914113",
  appId: "1:24644914113:web:cbebdcaeba1b501a59fd40"
};

const app = initializeApp(firebaseConfig); /* firebaseConfig안의 값들로 app생성 */

// db와 storage의 차이: storage는 사진, 영상 등과 같은 대용향의 데이터를 담는 물리적인 저장소로 다양한 정보들이 담기는 하드디스크와 같지만 db는 storage가 다양한 파일을 저장한 것과 달리 id, record와 같은 구조적, 반구조적 데이타가 담겨 스토리지에 저장된 데이터를 사용하기 쉽게 만들어 준다. 출처: https://skstp35.tistory.com/306

export const auth = getAuth(app); /* app에 대한 인증서비스 사용 */

export const storage = getStorage(app) // strage 받기

export const db = getFirestore(app) // db 받기

