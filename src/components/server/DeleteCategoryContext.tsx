import { useServerStore, useSocketStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { CategoryType } from "@/types";

import { IoReturnDownBackSharp, IoBookmarkSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

interface PropType {
  category: CategoryType;
  children: React.ReactNode;
}

const DeleteCategoryContext = (props: PropType) => {
  const { category, children } = props;

  const { data: session }: any = useSession();
  const params = useParams();

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const updateCategories = useServerStore((state) => {
    return state.updateCategories;
  });

  const handleDeleteCategoryById = async () => {
    if (socket && category) {
      if (confirm(`Confirm to delete category ${category?.name}?`) == true) {
        socket.emit(
          "delete_category_by_id",
          {
            userId: session?.user?.id,
            serverId: params?.id,
            categoryId: category?.id,
          },
          (res: { message: string; status: boolean }) => {
            // console.log("CHECK DELETE CATEGORY BY ID", res);
            if (res?.message === "Delete category by id successfully") {
              toast.success(res?.message);
              socket.emit(
                "get_all_categories_by_server_id",
                {
                  serverId: params?.id,
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
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div>{children}</div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>
            <IoReturnDownBackSharp size={20} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Mark As Read
          <ContextMenuShortcut>
            <IoBookmarkSharp size={20} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Mute Category</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>For 15 Minutes</ContextMenuItem>
            <ContextMenuItem>For 1 Hours</ContextMenuItem>
            <ContextMenuItem>For 3 Hours</ContextMenuItem>
            <ContextMenuItem>For 8 Hours</ContextMenuItem>
            <ContextMenuItem>For 24 Hours</ContextMenuItem>
            <ContextMenuItem>Unit I turn in back on</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem
          inset
          className="text-red-500"
          onClick={handleDeleteCategoryById}
        >
          Delete Category
          <ContextMenuShortcut>
            <MdDelete size={20} />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default DeleteCategoryContext;
