import { signIn } from 'next-auth/react';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export const authOptions = {
  pages: {
    signIn: "/signIn",
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req):Promise<any> {
        // Add logic here to look up the user from the credentials supplied
       return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '' )
       .then(userCredential=>{
        if(userCredential.user){
          return userCredential.user
        }
        return null;
       })
       .catch(error=>{console.log(error)})
      }
    })
  ]
}
export default NextAuth(authOptions)