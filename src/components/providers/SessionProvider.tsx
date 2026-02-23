"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import React from "react";

interface Props {
  children: React.ReactNode;
  session?: Session | null;
}

export default function NextAuthSessionProvider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
