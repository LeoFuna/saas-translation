"use client";

import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSubscriptionStore } from "../../store/store";
import LoadingSpinner from "./LoadingSpinner";
import { useToast } from "./ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";

export default function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    if (!session?.user.id) return;

    setLoading(true);
    toast({
      title: "Creating a new chat...",
      description: "Hold tight while we create a new chat for you!",
      duration: 3000,
    });

    const numberOfChats = (
      await getDocs(chatMembersCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.data()).length;

    const isPro = subscription?.status === 'active';

    if (!isPro && numberOfChats >= 3) {
      toast({
        title: 'Free plan limit exceeded',
        description: "You've exceeded the limit for FREE plan.",
        variant: 'destructive',
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push('/register')}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });

      setLoading(false);
      return;
    }

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id as string,
      email: session.user.email as string,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId,
      image: session.user.image || '',
    })
    .then(() => {
      toast({
        title: "Success!",
        description: "Your chat has been created!",
        className: "bg-green-600 text-white",
        duration: 2000,
      });
      router.push(`/chat/${chatId}`);
    })
    .catch(() => {
      toast({
        title: "Error!",
        description: "There was an error creating your chat. Please try again.",
        variant: "destructive",
      });
    })
    .finally(() => setLoading(false));
  }

  if (isLarge) return (
    <div>
      <Button variant={'default'} onClick={createNewChat}>
        {loading ? <LoadingSpinner /> : 'Create a New Chat'}
      </Button>
    </div>
  )

  return (
    <Button onClick={createNewChat} variant='ghost'>
      <MessageSquarePlusIcon />
    </Button>
  )
}