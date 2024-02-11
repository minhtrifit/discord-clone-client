import { useEffect, useRef, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

import { TbDiamondFilled } from "react-icons/tb";
import { IoMdArrowDropdown, IoMdSettings } from "react-icons/io";
import { IoPersonAdd, IoAddCircle, IoNotifications } from "react-icons/io5";
import {
  MdOutlineCreateNewFolder,
  MdEvent,
  MdPrivacyTip,
} from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";

const ServerDropdownMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

  const dropdownRef = useRef<any>();
  const dropdownButtonRef = useRef<any>();

  useEffect(() => {
    const handleClickOutsideDropdown = (event: any) => {
      if (
        dropdownRef?.current &&
        !dropdownRef?.current.contains(event.target) &&
        !dropdownButtonRef?.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <button
          ref={dropdownButtonRef}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <IoMdArrowDropdown size={25} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent ref={dropdownRef} className="w-56">
        <DropdownMenuItem>
          <span>Server Boost</span>
          <DropdownMenuShortcut>
            <TbDiamondFilled size={20} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Invite People</span>
            <DropdownMenuShortcut>
              <IoPersonAdd size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Server Settings</span>
            <DropdownMenuShortcut>
              <IoMdSettings size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Create Channel</span>
            <DropdownMenuShortcut>
              <IoAddCircle size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Create Category</span>
            <DropdownMenuShortcut>
              <MdOutlineCreateNewFolder size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Create Event</span>
            <DropdownMenuShortcut>
              <MdEvent size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>App Directory</span>
            <DropdownMenuShortcut>
              <FaDiscord size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Notification Settings</span>
            <DropdownMenuShortcut>
              <IoNotifications size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Privacy Settings</span>
            <DropdownMenuShortcut>
              <MdPrivacyTip size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Edit Server Profile</span>
          <DropdownMenuShortcut>
            <FaPen size={15} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Hide Muted Channel</span>
          <DropdownMenuShortcut>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
            </div>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerDropdownMenu;
