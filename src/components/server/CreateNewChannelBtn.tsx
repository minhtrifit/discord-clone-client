import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useServerStore, useSocketStore } from "@/lib/store";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { HiSpeakerWave } from "react-icons/hi2";

import { CategoryType, ChannelType } from "@/types";

interface PropType {
  category: CategoryType;
  openCreateChannel: boolean;
  setOpenCreateChannel: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

interface FormDataState {
  name: string;
  type: string;
}

const CreateNewChannelBtn = (props: PropType) => {
  const { category, openCreateChannel, setOpenCreateChannel, children } = props;

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    type: "text",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const server = useServerStore((state) => {
    return state.server;
  });

  const updateCategories = useServerStore((state) => {
    return state.updateCategories;
  });

  const handleCreateNewChannel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name === "") toast.error("Please type channel name");

    if (socket && server) {
      const newChannel = {
        serverId: server?.id,
        categoryId: category?.id,
        name: formData.name,
        type: formData.type,
      };

      // Send event to server
      setLoading(true);

      socket.emit(
        "create_new_channel",
        {
          serverId: newChannel?.serverId,
          categoryId: newChannel?.categoryId,
          name: newChannel?.name,
          type: newChannel?.type,
        },
        (res: { message: string; channel: ChannelType }) => {
          //   console.log("CHECK CREATE NEW CHANNEL", res);
          if (res?.message === "Create new channel successfully") {
            toast.success(res?.message);

            socket.emit(
              "get_all_categories_by_server_id",
              {
                serverId: server?.id,
              },
              (res: { message: string; categories: CategoryType[] }) => {
                if (
                  res?.message ===
                  "Get all categories by server id successfully"
                ) {
                  updateCategories(res?.categories);
                }
              }
            );
          }
        }
      );

      setLoading(false);
    }

    setFormData({
      name: "",
      type: "text",
    });
    setOpenCreateChannel(false);
  };

  return (
    <Dialog open={openCreateChannel} onOpenChange={setOpenCreateChannel}>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
          <DialogDescription>in {category?.name}</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => {
            handleCreateNewChannel(e);
          }}
        >
          <div className="flex flex-col gap-3">
            <Label htmlFor="name" className="text-[12px] font-bold text-left">
              CHANNEL NAME
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="New category"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="type" className="text-[12px] font-bold text-left">
              CHANNEL TYPE
            </Label>
            <RadioGroup
              className="flex flex-col gap-5"
              defaultValue={formData.type}
              onValueChange={(value: string) => {
                setFormData({ ...formData, type: value });
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="r1" />
                <Label htmlFor="r1" className="flex items-center gap-3">
                  <p className="text-[35px]">#</p>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Text</p>
                    <p className="text-zinc-400 dark:text-zinc-500">
                      Send messages, images, GIFs, emoji, opinions, and puns
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="voice" id="r2" />
                <Label htmlFor="r1" className="flex items-center gap-3">
                  <p className="text-[30px]">
                    <HiSpeakerWave size={25} />
                  </p>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Voice</p>
                    <p className="text-zinc-400 dark:text-zinc-500">
                      Hang out together with voice, video, and screen share
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="purple"
              disabled={loading ? true : false}
            >
              Create Channel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewChannelBtn;
