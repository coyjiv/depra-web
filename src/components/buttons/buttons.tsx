'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { AiOutlineUser } from "react-icons/ai";

export const SignInButton = () => {
    const { data: session, status } = useSession();

    const renderExpression = status === 'loading' ?
        'Loading...' :
        status === 'authenticated' ?
            <Link className="flex gap-3 bg-purple-300 w-fit px-2 py-3 rounded-lg" href={'/profile'}>
                {session?.user?.image?
                <Image className="rounded-lg" src={session?.user?.image!} alt={session?.user?.name!} width={32} height={32} />
            : <AiOutlineUser className="rounded-lg w-[32px] h-[32px]"/>    
            }
                {session?.user?.name!}
            </Link>
            :
            <button onClick={() => signIn()}>Sign In</button>
    return renderExpression;
}

export const SignOutButton = () => {
    return (
        <button onClick={() => signOut()}>Sign Out</button>
    )
}

export const GoogleSignInButton = () => {
    return (
        <button
            type="button"
            onClick={() => signIn("google")}
            className="flex items-center gap-4 justify-center px-6 py-3 mt-3 text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-indigo-800 transition w-full"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
            <span className="translate-y-[3px]">Sign in with Google</span>
        </button>

    )
}

export const FormSubmitButton = ({ children, ...props }: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button className="flex items-center justify-center bg-sky-400 hover:bg-sky-500 duration-300 rounded-lg mx-auto px-8 py-3 w-full" type="submit">
            {children}
        </button>
    )
}
