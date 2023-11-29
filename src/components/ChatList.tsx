import { getServerSession } from "next-auth"
import { authOptions } from "../../auth";
import { getDocs } from "firebase/firestore";
import { chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import ChatListRows from "./ChatListRows";

export default async function ChatList() {
  const session =await getServerSession(authOptions);

  const chatSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user.id as string)
  );

  const initialChats = chatSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null,
  }));

  return (
    <ChatListRows initialChats={initialChats} />
  )
}