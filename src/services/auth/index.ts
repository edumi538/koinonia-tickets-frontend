import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { randomUUID } from "crypto";
import { prisma } from "../database";

 
const adapter = PrismaAdapter(prisma)
export const { auth, handlers, signIn, signOut } = NextAuth({
  
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);

        // Verificação do usuário no servidor
        const response = await fetch(`http://localhost:3000/api/user/verify`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await response.json();
        console.log(user);

        // Se o usuário não for encontrado ou a senha estiver errada
        if (!user) {
          console.log("Invalid credentials.");
          return null;  // Não redireciona
        }
        return user;  // Usuário válido
      },
    }),
    Google(
        {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                  scope: "openid email profile",
                },
              },
        }
    )
  ],
  session: { strategy: "jwt" },
  adapter,
  callbacks: {
    async jwt({ token, account}) {
      if(account?.provider === "credentials"){
        token.credentials = true
      }
      return token
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        console.log(profile)
        return true
    }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  jwt:{
    encode: async function(params) {
      console.log(params);
      if(params.token?.credentials){
        const sessionToken = randomUUID()
        if(!params.token.sub){
          throw new Error("User not found")
        }
     
        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 60 * 60 * 24 * 7),
        })
        if(!createdSession){
          throw new Error("Session not created")
        }
        return sessionToken
        }
      return JSON.stringify(params);
    }

  },
})