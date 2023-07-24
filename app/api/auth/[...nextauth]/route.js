import { PrismaAdapter } from "@auth/prisma-adapter";

import NextAuth from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from 'next-auth/providers/github';

const prisma = new PrismaClient();



export const authOption = {
  adapter : PrismaAdapter (prisma),
  providers : [
    CredentialsProvider ({
      name: "credentials",
      credentials:  {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        let res ='';

        if(!credentials.username || !credentials.password) {
          res = "tidak ada firs"
          console.log(res)
          return res;
        }
        const user = await prisma.users.findUnique({
          where : {
            username: credentials.username
          }
        })
        
        if (!user) {
          res = "tidak ada user"
          return res;
        } 

        const passwordMatch = await bcrypt.compare(credentials.password,user.password)

        if (!passwordMatch) {
            res = "tidak ada pass"
            return res
        }
    
        return user;
      }
    })
  ],
  session: {
    strategy:"jwt",
  },
  screet : process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "devlelopment",

}


export const optionsGoogle = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
  ]  
}
const handler = NextAuth(optionsGoogle)



export {handler as GET, handler as POST}