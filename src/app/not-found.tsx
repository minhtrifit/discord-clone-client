import Image from "next/image";
import Link from "next/link";

import HomePageFooter from "@/components/HomePageFooter";
import HomePageNavbar from "@/components/HomePageNavbar";

const NotFound = () => {
  return (
    <div>
      <HomePageNavbar />
      <div
        className="w-[100%] text-black dark:text-black bg-white dark:bg-white
                      flex gap-10 justify-center flex-wrap-reverse mx-auto py-[100px] px-4"
      >
        <div className="flex flex-col gap-5">
          <p className="text-[30px] md:text-[50px] font-black text-primary-purple">
            WRONG TURN?
          </p>
          <p className="text-justify md:max-w-[600px]">
            You look lost, stranger. You know what helps when you’re lost? A
            piping hot bowl of noodles. Take a seat, we’re frantically at work
            here cooking up something good. Oh, you need something to read?
            These might help you:
          </p>
          <div className="flex flex-col gap-1">
            <Link href={"https://discordstatus.com"}>
              <p className="text-[20px] text-blue-400 hover:text-blue-500">
                Status Page
              </p>
            </Link>
            <Link href={"https://twitter.com/discord"}>
              <p className="text-[20px] text-blue-400 hover:text-blue-500">
                @Discord
              </p>
            </Link>
            <Link href={"https://support.discord.com/hc/en-us"}>
              <p className="text-[20px] text-blue-400 hover:text-blue-500">
                Discord Support
              </p>
            </Link>
          </div>
        </div>
        <Image
          src="/images/not-found-hero.gif"
          width={350}
          height={350}
          alt="notfound"
        />
      </div>
      <HomePageFooter />
    </div>
  );
};

export default NotFound;
