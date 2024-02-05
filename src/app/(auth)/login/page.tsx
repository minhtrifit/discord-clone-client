import Image from "next/image";
import { FaGithub } from "react-icons/fa";

import { handleGithubLogin } from "@/lib/action";

import LoginEmailForm from "@/components/LoginEmailForm";

const LoginPage = () => {
  return (
    <div className="bg-cover min-h-screen bg-[url('/images/login.png')] flex flex-col items-center justify-center">
      <div className="text-white bg-secondary-gray px-8 py-6 rounded-md flex flex-wrap justify-center gap-10 md:gap-[80px] m-5">
        <LoginEmailForm />
        <div className="p-4 flex flex-col items-center gap-5">
          <Image
            className="rounded-md"
            style={{ width: "80%", height: "auto" }}
            priority
            src="/images/qr-code.png"
            width="180"
            height="0"
            alt="icon"
          />
          <div className="flex flex-col items-center gap-1">
            <h1 className="font-bold text-xl text-center">
              Log in with QR Code
            </h1>
            <p className="text-gray-400 text-sm max-w-[200px] text-center">
              Scan this with the Discord mobile app to log in instantly.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-[100%]">
            <form action={handleGithubLogin}>
              <button
                className="bg-white text-black font-bold rounded-md px-6 py-2 w-[100%] flex items-center gap-3
                                  hover:text-primary-purple"
              >
                <FaGithub size={25} />
                <p>Login with Github</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
