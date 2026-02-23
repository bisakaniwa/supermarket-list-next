"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { getServerSession, type Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Props {
  children: React.ReactNode;
  session?: Session | null;
}

export default function NextAuthSessionProvider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export async function getUserId() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("Acesso negado. Você precisa estar logado.");
  }
  
  return session.user.id;
}
