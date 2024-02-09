"use client";

import React, { ReactNode, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import { handleSignOut } from "@/lib/action";
import { handleFileUpload } from "@/lib/supabase";
import { editUserByUserId, getUserByEmail } from "@/lib/action.api";
import { censorPassword, getSummaryName } from "@/lib/helper";

import { IoIosLogOut } from "react-icons/io";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

type ParentComponentProps = {
  children: ReactNode;
};

const UserSettingDialog: React.FC<ParentComponentProps> = ({ children }) => {
  const { data: session, update }: any = useSession();

  const [formData, setFormData] = useState<any>({
    id: "",
    name: "",
    provider: "",
    avatar: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const avatarRef = useRef<any>(null);

  const handleImageSelection = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleEditUserProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let avatar = null;
    let checkEdit = false;

    const editUser: any = {
      id: session?.user?.id,
    };

    // Check edit avatar
    if (image !== null) {
      setLoading(true);

      const res = await handleFileUpload("uploads", "user_avatars", image);
      const { fullPath }: any = res;

      if (res === null) {
        toast.error("Upload image failed");
        return;
      }

      // Create avatar url
      avatar = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fullPath}`;
      editUser.avatar = avatar;
      checkEdit = true;
    }

    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key] !== "") {
        editUser[key] = formData[key];
        checkEdit = true;
      }
    }

    if (!checkEdit) {
      toast.error("Edit user failed");
      setLoading(false);
      return;
    }

    setLoading(true);

    const res = await editUserByUserId(editUser);
    // console.log(res);
    const { message } = res;

    if (message === "Edit user successfully")
      toast.success("Edit user successfully");
    else toast.error("Edit user failed");

    // Update session
    const profile = await getUserByEmail(session?.user?.email);

    await update({
      ...session,
      user: profile?.user,
    });

    setLoading(false);
    avatarRef.current.value = null;
    setFormData({
      id: "",
      name: "",
      provider: "",
      password: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className="bg-secondary-white dark:bg-primary-gray max-w-[100vw] h-[100vh]">
        <div className="absolute right-[50px] top-[10px] flex items-center gap-3">
          <ThemeToggle />
          {/* <Button
            variant="purple"
            onClick={() => {
              handleSignOut();
            }}
          >
            Log Out
          </Button> */}
        </div>
        <Tabs>
          <TabList>
            <Tab>My Account</Tab>
            <Tab>Profiles</Tab>
          </TabList>

          <TabPanel>
            <div className="mt-10 flex justify-center max-h-[100vh] overflow-y-auto">
              <div className="flex flex-col gap-5 bg-white dark:bg-primary-black w-[100%] lg:w-[900px] p-4 rounded-md">
                <div className="flex justify-between">
                  <div className="flex gap-5 items-center">
                    <Avatar className="w-[100px] h-[100px]">
                      <AvatarImage
                        src={`${session?.user?.avatar}`}
                        alt="avatar"
                      />
                      <AvatarFallback className="text-[40px]">
                        {session?.user?.name &&
                          getSummaryName(session?.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p className="text-[20px] font-bold">
                        {session?.user?.name}
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-[13px] font-semibold">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2"
                      variant="destructive"
                      onClick={() => {
                        handleSignOut();
                      }}
                    >
                      <IoIosLogOut size={20} />
                      <p>Log out</p>
                    </Button>
                  </div>
                </div>
                <form
                  className="p-4 rounded-md flex flex-col gap-5 bg-zinc-100 dark:bg-primary-gray"
                  onSubmit={handleEditUserProfile}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2 text-[15px]">
                      <p className="font-black dark:text-zinc-400">USER ID</p>
                      <p className="truncate max-w-[200px] md:max-w-[500px]">
                        {session?.user?.id}
                      </p>
                    </div>
                    <Button variant="purple" disabled>
                      Edit
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2 text-[15px]">
                      <p className="font-black dark:text-zinc-400">
                        DISPLAY NAME
                      </p>
                      <Input
                        className="w-[200px] md:w-[600px]"
                        type="text"
                        placeholder={`${session?.user?.name}`}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <Button
                      variant="purple"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      {loading ? "Loading..." : "Edit"}
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2 text-[15px]">
                      <p className="font-black dark:text-zinc-400">PROVIDER</p>
                      <p className="truncate max-w-[200px] md:max-w-[500px]">
                        {session?.user?.provider}
                      </p>
                    </div>
                    <Button variant="purple" disabled>
                      Edit
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2 text-[15px]">
                      <p className="font-black dark:text-zinc-400">AVATAR</p>
                      <Input
                        className="w-[200px] md:w-[600px]"
                        type="file"
                        ref={avatarRef}
                        onChange={(e) =>
                          //   setFormData({ ...formData, avatar: e.target.value })
                          handleImageSelection(e)
                        }
                      />
                    </div>
                    {session?.user?.provider === "email" ? (
                      <Button
                        variant="purple"
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        {loading ? "Loading..." : "Edit"}
                      </Button>
                    ) : (
                      <Button variant="purple" type="submit" disabled>
                        Edit
                      </Button>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2 text-[15px]">
                      <p className="font-black dark:text-zinc-400">PASSWORD</p>
                      <Input
                        className="w-[200px] md:w-[600px]"
                        type="password"
                        disabled={
                          session?.user?.password === null ? true : false
                        }
                        placeholder={`${
                          session?.user?.password === null
                            ? "Password is not available"
                            : censorPassword(session?.user?.password)
                        }`}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                    {session?.user?.password === null ? (
                      <Button variant="purple" type="submit" disabled>
                        Edit
                      </Button>
                    ) : (
                      <Button
                        variant="purple"
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        {loading ? "Loading..." : "Edit"}
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-10 flex justify-center">Profiles content</div>
          </TabPanel>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettingDialog;
