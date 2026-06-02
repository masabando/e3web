"use client";
import { createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebaseAuth, googleProvider } from "@/firebase";
import { signInWithPopup, signOut, User, UserCredential } from "firebase/auth";

type AuthContextType = {
  user: User | null | undefined;
  loading: boolean;
  signIn: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(getFirebaseAuth());

  const login = () => signInWithPopup(getFirebaseAuth(), googleProvider);
  const logout = () => signOut(getFirebaseAuth());

  return (
    <AuthContext.Provider value={{ user, loading, signIn: login, signOut: logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);