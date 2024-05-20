'use client'
import { signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { SignOutButton } from "@/components/buttons/buttons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession() 
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
  <div>{session?.data?.user?.email}</div>
  <SignOutButton onClick={()=> signOut()}>Logout</SignOutButton>

     
    </main>
  );
}
