'use client'
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { SignOutButton } from "@/components/buttons/buttons";
import Sidebar from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: [ "latin" ] });

export default function Home() {
    const session = useSession()
    return (
        <div className="bg-green-800 min-h-full">
            {/* <div>{session?.data?.user?.email}</div> */}
            {/* <SignOutButton onClick={()=> signOut()}>Logout</SignOutButton> */}


        </div>
    );
}
