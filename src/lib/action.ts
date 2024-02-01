"use server";

import { auth, signIn, signOut } from "@/lib/auth";

export const handleRegister = async (prevState: any, form: FormData) => {
  try {
    const { email, name, password, agree } = Object.fromEntries(form);

    if (agree === undefined) return { error: "Please agree terms & policy" };

    console.log(email, name, password);

    return { message: "Register account successfully" };
  } catch (err: any) {
    console.log(err);

    throw err;
  }
};

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
