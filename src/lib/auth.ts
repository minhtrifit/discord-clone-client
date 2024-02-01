import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

// https://stackoverflow.com/questions/70897330/return-error-information-from-api-when-using-next-auth

const checkCredentials = async (credentials: any) => {
  try {
    const { email, password } = credentials;

    if (email !== "minhtri.fit@gmail.com" || password !== "123") {
      throw new Error("Wrong credentials");
    }

    return {
      name: "Lê Minh Trí",
      email: "minhtri.fit@gmail.com",
    };
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
    ...authConfig.callbacks,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
