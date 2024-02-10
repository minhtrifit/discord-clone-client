"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createNewServer } from "@/lib/action.api";
import { handleFileUpload } from "@/lib/supabase";
import { ServerType } from "@/types";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

import { IoAdd } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { toast } from "react-toastify";

interface PropType {
  session: Session | null;
}

const CreateServerDialog = (props: PropType) => {
  const { session } = props;
  const user: any = session?.user;

  const pathName = usePathname();

  const [open, setOpen] = useState(false);
  const [serverName, setServerName] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [imageName, setImageName] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageSelection = (event: any) => {
    setImage(event.target.files[0]);
    setImageName(event.target.files[0]?.name);
  };

  const handleResetImage = () => {
    setImage(null);
    setImageName("");
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleCreateNewServer = async () => {
    let avatar = null;

    const type = image?.type?.split("/")[0];

    if (imageName !== "" && type !== "image")
      toast.error("Please upload image file");
    else if (serverName === "") toast.error("Please type server name");
    else if (serverName !== "") {
      if (imageName !== "") {
        setLoading(true);

        const res = await handleFileUpload("uploads", "server_avatars", image);
        const { fullPath }: any = res;

        if (res === null) {
          toast.error("Upload image failed");
          return;
        }

        // Create avatar url
        avatar = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fullPath}`;
      }

      const newServer: ServerType = {
        name: serverName,
        owner: user.id,
        avatar: avatar,
      };

      const res2 = await createNewServer(newServer, pathName);
      const { message } = res2;

      if (message === "Create server successfully") {
        toast.success("Create sever successfully");
      }

      setLoading(false);
    }

    // Reset form
    setServerName("");
    setOpen(false);
    handleResetImage();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="w-[50px] h-[50px] rounded-full bg-primary-purple text-white flex justify-center items-center
                            hover:cursor-pointer hover:bg-secondary-purple"
                >
                  <IoAdd size={35} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add new server</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[350px] sm:w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Server</DialogTitle>
          <DialogDescription>
            Your server is where you and your friends hang out. Make yours and
            start talking.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="mt-3">
            <label
              htmlFor="uploadFile1"
              className="bg-secondary-gray text-white text-base rounded w-80 h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 mb-2 fill-white"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
              Upload file
              <input
                ref={imageInputRef}
                type="file"
                id="uploadFile1"
                className="hidden"
                onChange={handleImageSelection}
              />
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG, JPEG are Allowed.
              </p>
            </label>
          </div>
          <div className="flex items-center justify-center gap-3 mb-5">
            <p className="text-[14px] text-white">
              {imageName !== "" ? imageName : "Not image selected"}
            </p>
            {imageName !== "" && (
              <button
                className="text-primary-purple hover:text-secondary-purple"
                onClick={handleResetImage}
              >
                <MdClear size={20} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Server name
            </Label>
            <Input
              id="serverName"
              className="col-span-3"
              value={serverName}
              onChange={(e) => {
                setServerName(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="purple"
            disabled={loading ? true : false}
            onClick={() => {
              handleCreateNewServer();
            }}
          >
            {loading ? "Please wait..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerDialog;
