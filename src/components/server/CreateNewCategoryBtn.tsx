import { FormEvent, useState } from "react";
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
import { Switch } from "@/components/ui/switch";

import { CategoryType } from "@/types";

import { BiSolidCategory } from "react-icons/bi";
import { RiLock2Fill } from "react-icons/ri";

interface FormDataState {
  name: string;
  isPrivate: any;
}

const CreateNewCategoryBtn = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    isPrivate: false,
  });

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const server = useServerStore((state) => {
    return state.server;
  });

  const updateCategories = useServerStore((state) => {
    return state.updateCategories;
  });

  const handleCreateNewCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name === "") toast.error("Please type category name");

    if (socket && server) {
      const newCategory = {
        serverId: server?.id,
        name: formData.name,
        isPrivate: formData.isPrivate,
      };

      // Send event to server
      socket.emit(
        "create_new_category",
        {
          serverId: newCategory.serverId,
          name: newCategory.name,
          isPrivate: newCategory.isPrivate,
        },
        (res: { message: string; category: CategoryType }) => {
          console.log("CHECK CREATE NEW CATEGORY", res);
          if (res?.message === "Create new category successfully") {
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
    }

    // Reset form
    setOpen(false);
    setFormData({
      name: "",
      isPrivate: false,
    });
    setOpen(false);
  };

  return (
    <div className="p-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="w-[100%] flex items-center gap-3 rounded-md p-2 text-zinc-500 hover:bg-zinc-300 hover:text-primary-black
                            dark:text-gray-400 dark:hover:bg-zinc-700 dark:hover:text-white"
          >
            <BiSolidCategory size={20} />
            <p className="text-[13px] font-semibold">Create New Category</p>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Start a new chat for your server
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-8"
            onSubmit={(e) => {
              handleCreateNewCategory(e);
            }}
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="name" className="text-[12px] font-bold text-left">
                CATEGORY NAME
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
            <div className="flex items-center justify-between gap-3">
              <Label
                htmlFor="name"
                className="text-left flex items-center gap-3"
              >
                <RiLock2Fill size={20} />
                Private Category
              </Label>
              <Switch
                id="private"
                value={formData.isPrivate}
                onCheckedChange={(e: boolean) => {
                  setFormData({ ...formData, isPrivate: e });
                }}
              />
            </div>
            <p className="text-[13px] text-justify text-zinc-600 dark:text-zinc-400">
              By making a category private, only select members and roles will
              be able to view this category. Synced channels in this category
              will automatically match to this setting.
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="purple">
                Create Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNewCategoryBtn;
