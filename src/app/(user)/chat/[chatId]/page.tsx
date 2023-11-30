import { getServerSession } from "next-auth"
import { authOptions } from "../../../../../auth"
import ChatInput from "@/components/ChatInput"
import { getDocs } from "firebase/firestore";
import { sortedMessagesRef } from "@/lib/converters/Message";
import ChatMessages from "@/components/ChatMessages";
import ChatMembersBadges from "@/components/ChatMembersBadges";

type Props= {
  params: {
    chatId: string
  };
};

export default async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  return (
    <>
      <ChatMembersBadges chatId={chatId} />
      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          //https://github.com/vercel/next.js/issues/47447
          initialMessages={await JSON.parse(JSON.stringify(initialMessages))}
        />
      </div>
      <ChatInput chatId={chatId} />
    </>
  )
}