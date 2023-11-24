'use client';

import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { auth } from "../../firebase";

const syncFirebaseAuth = async (session: Session) => {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (error) {
      console.error(error);
    }
  } else {
    auth.signOut();
  }
}



export default function FirebaseAuthProvider({
  children
}: { children: React.ReactNode }) {
  const { data: session } = useSession();


  useEffect(() => {
    if (!session) return;

    syncFirebaseAuth(session)
  }, [session])

  return <>{ children }</>
}