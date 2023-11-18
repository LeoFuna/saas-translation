"use client";

import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function CreateChatButton() {
  return (
    <Button variant='ghost'>
      <MessageSquarePlusIcon />
    </Button>
  )
}