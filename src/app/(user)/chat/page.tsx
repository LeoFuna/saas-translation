import ChatList from "@/components/ChatList";

type ChatsPageProps = {
  params: {};
  searchParams: {
    error: string;
  }
}

export default function ChatsPage({ searchParams: { error } }: ChatsPageProps) {
  return (
    <div>
      <ChatList />
    </div>
  )
}