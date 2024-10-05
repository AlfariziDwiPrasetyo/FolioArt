import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser } from "./lib/actios/user.actions";
import { IUser } from "./lib/database/models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (user) {
        const { id, name, email, image } = user;
        const newUser: IUser = {
          username: id ?? "",
          name: name ?? "",
          email: email ?? "",
          photo: image ?? "",
        };
        const newUserCreated = await createUser(newUser);
        console.log(newUserCreated);
      }
      return true; // Allow login
    },
    async session({ session, token, user }) {
      // Add user info to session
      session.user = user;
      return session;
    },
  },
});
