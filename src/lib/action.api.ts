"use server";

import { UserType } from "@/types";
import axios from "axios";

export const getConnectServer = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
    return res.data;
  } catch (err: any) {
    console.log("API CALL ERROR:", err.response.data);
    return err.response.data;
  }
};

export const createNewUser = async (user: UserType) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/create`,
      {
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        provider: user.provider,
      }
    );
    return res.data;
  } catch (err: any) {
    console.log("API CALL ERROR:", err.response.data);
    return err.response.data;
  }
};
