/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import { handleEmailLogin } from "@/lib/action";
import { useState } from "react";

import ActionFormBtn from "./ActionFormBtn";

interface FormDataState {
  email: string;
  password: string;
}

const LoginEmailForm = () => {
  const [state, formAction] = useFormState(handleEmailLogin, undefined);
  const [formData, setFormData] = useState<FormDataState>({
    email: "",
    password: "",
  });

  return (
    <form
      className="flex flex-col gap-5 w-[100%] md:w-auto"
      action={formAction}
    >
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-xl font-bold">Welcome back!</h1>
        <p className="text-sm text-gray-400">
          We're so excited to see you again!
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[12px] font-black text-gray-400">
          EMAIL OR PHONE NUMBER
        </p>
        <input
          className="w-auto md:w-[450px] outline-none p-2 bg-primary-black text-white rounded-md"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[12px] font-black text-gray-400">PASSWORD</p>
        <input
          className="w-auto md:w-[450px] outline-none p-2 bg-primary-black text-white rounded-md"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <Link href={"/forgot-password"}>
        <p className="text-[12px] text-sky-500 hover:underline hover:underline-offset-1">
          Forgot your password?
        </p>
      </Link>
      <ActionFormBtn defaultText={"Log In"} />
      <p className="text-red-500 text-center">{state?.error}</p>
      <div className="text-[12px] flex items-center gap-1">
        <p>Need an account?</p>
        <Link href={"/register"}>
          <p className="text-sky-500 hover:underline hover:underline-offset-1">
            Register
          </p>
        </Link>
      </div>
    </form>
  );
};

export default LoginEmailForm;
