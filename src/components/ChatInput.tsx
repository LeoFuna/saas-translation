'use client'

import { useSession } from "next-auth/react"
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { User, limitedMessagesRef, messagesRef } from "@/lib/converters/Message";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "../../store/store";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const formSchema = z.object({
  input: z.string().max(1000),
})


export default function ChatInput({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.input.trim().length) return;
    if (!session?.user) return;

    const messages = ((await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.data()
    )).length;

    const isPro = subscription?.status === 'active';

    if (!isPro && messages >= 20) {
      toast({
        title: 'Free plan limit exceeded',
        description: `You have exceeded the FREE plan limit of 20 messages per chat.
        Upgrade to PRO for unlimited messages!`,
        variant: 'destructive',
        action: (
          <ToastAction
           altText="Upgrade"
           onClick={() => router.push('/register')}
          >
            Upgrade to PRO
          </ToastAction>
        )
      });

      return;
    }

    const userStore: User = {
      id: session.user.id,
      name: session.user.name as string,
      image: session.user.image || '',
      email: session.user.email as string,
    }

    addDoc(messagesRef(chatId), {
      input: values.input,
      timestamp: serverTimestamp(),
      user: userStore,
    });

    form.reset();
  }

  return (
    <div className="sticky bottom-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter messagein ANY language..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-violet-600 text-white">
            Send
          </Button>
        </form>
      </Form>
    </div>
  )
}