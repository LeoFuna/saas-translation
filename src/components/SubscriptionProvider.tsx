'use client'

import { subscriptionRef } from "@/lib/converters/Subscription";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useSubscriptionStore } from "../../store/store";

export default function SubscriptionProvider({
  children
}: { children: React.ReactNode }
) {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore((state) => state.setSubscription);

  useEffect(() => {
    if (!session) return;
    return onSnapshot(subscriptionRef(session?.user.id), (snap) => {
      if (snap.empty) {
        console.log('No subscription');
        setSubscription(null);
        return
      } else {
        setSubscription(snap.docs[0].data());
      }
    }, (error) => {
      console.log("Error getting document: ", error);
    })
  }, [session, setSubscription]);

  return <>{ children }</>
}