'use client';
import { useSession } from "next-auth/react"
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import useAdminId from "../../hooks/useAdminId";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

export default function DeleteChatButton({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const adminId = useAdminId({ chatId });

  const handleDelete = async () => {
    toast({
      title: "Deleting chat",
      description: "Please wait while we delete the chat...",
    });

    await fetch('/api/chat/delete', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId }),
    })
    .then(() => {
      toast({
        title: "Chat deleted",
        description: "The chat has been deleted successfully.",
        className: "bg-green-600 text-white",
        duration: 3000,
      });
      router.push('/chat');
    })
    .catch((error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong while deleting the chat.",
        variant: "destructive",
      });
    })
    .finally(() => setOpen(false));
  };

  return (
    session?.user.id === adminId && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">
            Delete Chat
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will delete the chat for all users.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 space-x-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>

            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  )
}