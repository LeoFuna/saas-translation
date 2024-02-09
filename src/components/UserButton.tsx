"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "./UserAvatar"
import { Session } from "next-auth"
import { Button } from "./ui/button"
import { signIn, signOut } from "next-auth/react"
import { useSubscriptionStore } from "../../store/store";
import LoadingSpinner from "./LoadingSpinner";
import { StarIcon } from "lucide-react";
import ManageAccountButton from "./ManageAccountButton";

type UserButtonProps = {
  session: Session | null;
  generatePortalLink: () => Promise<void>;
};

export default function UserButton({
  session,
  generatePortalLink,
}: UserButtonProps) {
  const subscription = useSubscriptionStore((state) => state.subscription);

  if (!session) return (
    <Button variant='outline' onClick={() => signIn()}>
      Sign In
    </Button>
  )
  const isPro = subscription?.status === 'active';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name={session?.user?.name || ''}
          image={session?.user?.image || ''}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{ session?.user?.name }</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {subscription === undefined && (
          <DropdownMenuItem>
            <LoadingSpinner />
          </DropdownMenuItem>
        )}

        {isPro && (
          <>
            <DropdownMenuLabel className="text-xs flex items-center justify-center
            space-x-1 text-[#E935C1] animate-pulse">
              <StarIcon fill="#E535C1" />
              <p>PRO</p>
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <ManageAccountButton onSubmit={generatePortalLink}  />
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem onClick={() => signOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}