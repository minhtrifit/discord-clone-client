import { Input } from "@/components/ui/input";

import { IoSend } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";
import { MdEmojiEmotions } from "react-icons/md";

import { FormDataState } from "./MainChat";

interface PropType {
  friendName: string;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: FormDataState;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
}

const ChatInput = (props: PropType) => {
  const { friendName, handleSendMessage, formData, setFormData } = props;

  return (
    <form className="relative" onSubmit={handleSendMessage}>
      <Input
        className="h-[50px] pr-[100px]"
        type="text"
        placeholder={`Message @${friendName}`}
        value={formData.message}
        onChange={(e) => {
          setFormData({ ...formData, message: e.target.value });
        }}
      />
      <div className="absolute top-[15px] right-[20px] flex items-center gap-3">
        <button
          type="submit"
          className="text-primary-purple hover:text-secondary-purple hover:cursor-pointer"
        >
          <IoSend size={20} />
        </button>
        <div className="text-primary-purple hover:text-secondary-purple hover:cursor-pointer">
          <FaFile size={20} />
        </div>
        <div className="text-primary-purple hover:text-secondary-purple hover:cursor-pointer">
          <MdEmojiEmotions size={25} />
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
