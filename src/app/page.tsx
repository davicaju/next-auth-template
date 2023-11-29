"use client";
import Image from "next/image";

import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  console.log(data);

  return (
    <>
      <p>{data?.user?.name}</p>
      <p>{data?.user?.email}</p>
      <button onClick={() => signIn()}>SignIn</button>
    </>
  );
}
