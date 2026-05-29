"use client";
import { createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "@/firebase";
import { signInWithPopup, signOut, User } from "firebase/auth";

type AuthContextType = {
  user: User | null | undefined;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);

  const login = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);