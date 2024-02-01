"use server";

import { auth, signIn, signOut } from "@/lib/auth";

export const handleEmailLogin = async (prevState: any, form: FormData) => {
  try {
    const { email, password } = Object.fromEntries(form);
    await signIn("credentials", { email, password });
  } catch (err: any) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }

    throw err;
  }
};

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const getUserSession = async () => {
  const session = await auth();
  return session;
};

export const handleSignOut = async () => {
  await signOut();
};
