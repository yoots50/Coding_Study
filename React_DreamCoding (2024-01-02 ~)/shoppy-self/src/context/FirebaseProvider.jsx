import { createContext, useContext } from "react";
import { app, auth, db } from "../api/firebase";

const FirebaseContext = createContext();
export function Firebaseprovider({ children }) {
  return (
    <FirebaseContext.Provider value={{ app, db, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}
