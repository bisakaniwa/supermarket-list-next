'use client'

import { signIn, useSession } from "next-auth/react";
import UserMenu from "./UserMenu";

export const AuthButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <button
        onClick={() => signIn()}
        className="cursor-pointer border border-contrast px-4 py-2 mb-1 text-sm font-medium text-white rounded-md hover:bg-gray-700 transition-colors dark:hover:bg-surface focus:outline-none focus:ring-2 focus:ring-contrast focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Login
      </button>
    );
  }

  return (
    <UserMenu />
  )
}
