'use client'

import { signIn, signOut, useSession } from "next-auth/react";

export const LoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sair</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Login</button>
    </>
  )
}
