"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebaseAuth, googleProvider, getFirestoreInstance } from "@/firebase";
import { signInWithPopup, signOut, User, UserCredential } from "firebase/auth";
import { getDoc, doc, setDoc, addDoc, collection, deleteDoc, getDocs, DocumentReference, DocumentData } from "firebase/firestore";
import { initialCode } from "@/functions/Settings";


type SketchDataType = {
  title: string;
  modifiedAt: number;
}

type SaveSketchDataType = {
  code: string;
  title: string;
  modifiedAt: number;
}

type AuthContextType = {
  user: User | null | undefined;
  loading: boolean;
  signIn: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
  sketches: { [key: string]: SketchDataType };
  getSketches: () => Promise<void>;
  loadSketches: (sketchId: string) => Promise<{ code: string, success: boolean }>;
  saveSketch: (sketchId: string, sketch: SaveSketchDataType) => Promise<void> | Promise<DocumentReference<DocumentData, DocumentData>>;
  deleteSketch: (sketchId: string) => Promise<void>;
  currentSketch: string | null;
  setCurrentSketch: React.Dispatch<React.SetStateAction<string | null>>;
  code: string;
  setCode: (code: string) => void;
  title: string;
  setTitle: (title: string) => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(getFirebaseAuth);
  const [sketches, setSketches] = useState<{ [key: string]: SketchDataType }>({});
  const [currentSketch, setCurrentSketch] = useState<string | null>(null);
  const [code, setCode] = useState<string>(initialCode);
  const [title, setTitle] = useState<string>(`新規スケッチ`);

  const login = () => signInWithPopup(getFirebaseAuth, googleProvider);
  const logout = () => signOut(getFirebaseAuth);

  const getSketches = () => {
    if (!user) return Promise.resolve();
    const db = getFirestoreInstance;
    const citesRef = collection(db, "users", user.uid, "sketches");
    return getDocs(citesRef).then((querySnapshot) => {
      const data: { [key: string]: SketchDataType } = {};
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        data[doc.id] = {
          title: d.title,
          modifiedAt: d.modifiedAt
        };
      });
      setSketches(data);
    })
  }

  const loadSketches = (sketchId: string): Promise<{ code: string, success: boolean }> => {
    if (!user) return Promise.resolve({ code: "", success: false });
    const db = getFirestoreInstance;
    const docRef = doc(db, "users", user.uid, "sketches", sketchId);
    return getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCurrentSketch(sketchId);
        setTitle(data.title);
        return {
          code: data.code,
          success: true
        };
      } else {
        return {
          code: "",
          success: false
        };
      }
    });
  }

  const saveSketch = (sketchId: string, sketch: SaveSketchDataType) => {
    if (!user) return Promise.resolve();
    const db = getFirestoreInstance;
    const citesRef = collection(db, "users", user.uid, "sketches");
    if (!sketchId) {
      return addDoc(citesRef, sketch).then((docRef) => {
        setCurrentSketch(docRef.id);
        getSketches();
      })
    } else {
      return setDoc(doc(citesRef, sketchId), sketch).then(() => {
        getSketches();
      });
    }
  }

  const deleteSketch = (sketchId: string) => {
    if (!user) return Promise.resolve();
    const db = getFirestoreInstance;
    const citesRef = doc(db, `users/${user.uid}/sketches/${sketchId}`);
    return deleteDoc(citesRef).then(() => {
      getSketches();
    }).catch((error) => {
      console.error("Error deleting sketch: ", error);
    });
  }

  useEffect(() => {
    if (user) {
      const db = getFirestoreInstance;
      const citesRef = collection(db, `users`, `${user.uid}`, `sketches`);
      getDocs(citesRef).then((querySnapshot) => {
        const data: { [key: string]: SketchDataType } = {};
        querySnapshot.forEach((doc) => {
          const d = doc.data();
          data[doc.id] = {
            title: d.title,
            modifiedAt: d.modifiedAt
          };
        });
        setSketches(data);
      });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn: login,
      signOut: logout,
      sketches,
      getSketches,
      loadSketches,
      saveSketch,
      deleteSketch,
      currentSketch,
      setCurrentSketch,
      code,
      setCode,
      title,
      setTitle,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);