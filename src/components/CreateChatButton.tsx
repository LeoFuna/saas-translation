"use client";

import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function CreateChatButton() {
  const router = useRouter();

  const createNewChat = async () => {
    // logic here
    router.push(`/chat/abc`);
  }
  return (
    <Button onClick={createNewChat} variant='ghost'>
      <MessageSquarePlusIcon />
    </Button>
  )
}