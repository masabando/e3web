"use client";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestoreInstance } from "@/firebase";
import { useAuth } from "@/app/providers";

export type Sketch = {
  id: string;
  title: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

export const useSketches = () => {
  const { user } = useAuth();
  const [sketches, setSketches] = useState<Sketch[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const q = query(
      collection(getFirestoreInstance(), "users", user.uid, "sketches"),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSketches(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        })) as Sketch[]
      );
    });

    return () => unsubscribe();
  }, [user]);

  const saveSketch = async (title: string, code: string) => {
    if (!user) return;
    await addDoc(collection(getFirestoreInstance(), "users", user.uid, "sketches"), {
      title,
      code,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  const updateSketch = async (id: string, title: string, code: string) => {
    if (!user) return;
    await updateDoc(doc(getFirestoreInstance(), "users", user.uid, "sketches", id), {
      title,
      code,
      updatedAt: serverTimestamp(),
    });
  };

  const deleteSketch = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(getFirestoreInstance(), "users", user.uid, "sketches", id));
  };

  return { sketches, saveSketch, updateSketch, deleteSketch };
};