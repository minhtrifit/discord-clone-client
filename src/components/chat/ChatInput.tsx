import { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IoSend } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";
import { MdEmojiEmotions } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { BiSend } from "react-icons/bi";

import { FormDataState } from "./MainChat";

interface PropType {
  friendName: string;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: FormDataState;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
  file: any;
  fileName: string;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleResetImage: () => void;
  handleFileSelection: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSendFileMessage: () => void;
  loading: boolean;
}

const ChatInput = (props: PropType) => {
  const {
    friendName,
    handleSendMessage,
    formData,
    setFormData,
    file,
    fileName,
    fileInputRef,
    handleResetImage,
    handleFileSelection,
    handleSendFileMessage,
    loading,
  } = props;

  return (
    <div className="relative">
      <form onSubmit={handleSendMessage}>
        <Input
          className="h-[50px] pr-[100px]"
          type="text"
          placeholder={`Message @${friendName}`}
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
          }}
        />
        <div className="absolute top-[15px] right-[100px] flex items-center gap-4">
          <button
            type="submit"
            className="text-primary-purple hover:text-secondary-purple hover:cursor-pointer"
          >
            <IoSend size={20} />
          </button>
        </div>
      </form>
      <div className="absolute top-[13px] right-[20px] flex items-center gap-4">
        <div className="relative top-[3px]">
          {file !== null && !loading && (
            <div
              className="absolute top-[-60px] right-[-60px] p-2 rounded-md text-[13px]
                          bg-secondary-white dark:bg-primary-black"
            >
              <form
                className="flex items-center gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendFileMessage();
                }}
              >
                <p className="max-w-[300px] truncate">{fileName}</p>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="text-primary-purple hover:text-secondary-purple"
                  >
                    <BiSend size={20} />
                  </button>
                  <button
                    className="text-primary-purple hover:text-secondary-purple"
                    onClick={handleResetImage}
                  >
                    <MdClear size={20} />
                  </button>
                </div>
              </form>
            </div>
          )}
          {loading && (
            <div
              className="absolute top-[-60px] right-[-60px] p-2 rounded-md text-[13px]
                          bg-secondary-white dark:bg-primary-black"
            >
              Loading...
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="realtive text-primary-purple hover:text-secondary-purple">
                  <Input
                    ref={fileInputRef}
                    className="absolute opacity-0 w-[2px] h-[30px] top-[-3px] left-[-3px] hover:cursor-pointer"
                    type="file"
                    onChange={(e) => {
                      handleFileSelection(e);
                    }}
                  />
                  <FaFile size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="text-primary-purple hover:text-secondary-purple hover:cursor-pointer">
                    <MdEmojiEmotions size={25} />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div>Hello</div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Get emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ChatInput;
