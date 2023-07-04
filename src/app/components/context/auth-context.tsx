import React, { createContext, useContext, useEffect, useState } from "react";
import "@/app/globals.css";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { getDoc } from "firebase/firestore";
import { UserCredential } from "firebase/auth";
import { LangContext } from "./lang-context";
import { LATIN, KANA } from "@/app/styles/fonts";

interface UserType {
  email: string | null;
  uid: string | null;
  events: string[];
}

interface AuthContextType {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  signUp?: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logIn?: (email: string, password: string) => Promise<UserCredential>;
  logOut?: () => {};
}

export const AuthContext = createContext<AuthContextType>({
  user: { email: null, uid: null, events: [] },
  setUser: () => {},
});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null, events: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const { lang } = useContext(LangContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Get the event data from the user's document
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((doc) => {
          if (doc.exists()) {
            const docEvents: string[] = doc.data()?.events;
            setUser({ email: user.email, uid: user.uid, events: docEvents });
          }
        });
      } else {
        setUser({ email: null, uid: null, events: [] });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = (email: string, password: string, firstName: string, lastName: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
        const uid = response.user.uid;
        setDoc(doc(db, "users", uid), {
            first_name: firstName,
            last_name: lastName,
            email: email,
            events: []
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    })
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null, events: [] });
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signUp, logIn, logOut }}>
      <div className={`bg-secondary-900 overflow-x-hidden w-screen ${lang !== "ja" ? LATIN.className : KANA.className}`}>
      {loading ? null : children}
      </div>
    </AuthContext.Provider>
  );
};