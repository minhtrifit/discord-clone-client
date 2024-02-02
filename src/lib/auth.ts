import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { UserType } from "@/types";
import { createNewUser, loginByEmail } from "./action.api";

// https://stackoverflow.com/questions/70897330/return-error-information-from-api-when-using-next-auth

const checkCredentials = async (credentials: any) => {
  try {
    const { email, password } = credentials;

    const userData: UserType = {
      email: email,
      password: password,
    };

    const res = await loginByEmail(userData);
    const { message, user } = res;

    if (message !== "Login successfully") {
      throw new Error(message);
    }

    return user;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user: any = await checkCredentials(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      // console.log("AUTH CALLBACKS", profile);

      if (account.provider === "github") {
        // Save new user to database
        const newUser: UserType = {
          name: profile.name,
          email: profile.email,
          password: null,
          avatar: profile.avatar_url,
          provider: "github",
        };

        const res = await createNewUser(newUser);
        console.log("Create user:", res);
      }
      return true;
    },
    ...authConfig.callbacks,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
