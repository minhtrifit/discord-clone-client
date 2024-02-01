/* eslint-disable react/no-unescaped-entities */

"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { handleRegister } from "@/lib/action";

const RegisterForm = () => {
  const [state, formAction] = useFormState(handleRegister, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.message === "Register account successfully") {
      toast.success(state.message);
      router.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form
      className="flex flex-col gap-5 w-[100%] md:w-auto"
      action={formAction}
    >
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-xl font-bold">Create an account</h1>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[12px] font-black text-gray-400">EMAIL</p>
        <input
          className="w-auto md:w-[450px] outline-none p-2 bg-primary-black text-white rounded-md"
          name="email"
          type="email"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[12px] font-black text-gray-400">NAME</p>
        <input
          className="w-auto md:w-[450px] outline-none p-2 bg-primary-black text-white rounded-md"
          name="name"
          type="type"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[12px] font-black text-gray-400">PASSWORD</p>
        <input
          className="w-auto md:w-[450px] outline-none p-2 bg-primary-black text-white rounded-md"
          name="password"
          type="password"
          required
        />
      </div>
      <div className="flex items-center gap-3">
        <input className="w-[23px] h-[23px]" type="checkbox" name="agree" />
        <div className="text-[12px] flex flex-wrap items-center gap-1 text-gray-400">
          <p>Agree to Discord's</p>
          <Link href={"https://discord.com/terms"}>
            <p className="text-sky-500 hover:underline hover:underline-offset-1">
              Terms of Service
            </p>
          </Link>
          <p>and</p>
          <Link href={"https://discord.com/privacy"}>
            <p className="text-sky-500 hover:underline hover:underline-offset-1">
              Privacy Policy.
            </p>
          </Link>
        </div>
      </div>
      <button className="bg-primary-purple hover:bg-secondary-purple p-2 rounded-md">
        Continue
      </button>
      <div className="text-[12px] flex flex-wrap items-center gap-1 text-gray-400">
        <p>By registering, you agree to Discord's</p>
        <Link href={"https://discord.com/terms"}>
          <p className="text-sky-500 hover:underline hover:underline-offset-1">
            Terms of Service
          </p>
        </Link>
        <p>and</p>
        <Link href={"https://discord.com/privacy"}>
          <p className="text-sky-500 hover:underline hover:underline-offset-1">
            Privacy Policy.
          </p>
        </Link>
      </div>
      <p className="text-red-500 text-center">{state?.error}</p>
      <div className="text-[12px] flex items-center gap-1">
        <Link href={"/login"}>
          <p className="text-sky-500 hover:underline hover:underline-offset-1">
            Already have an account?
          </p>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
