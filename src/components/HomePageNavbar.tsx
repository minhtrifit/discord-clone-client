import { HomeNavLinks } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const HomePageNavbar = () => {
  return (
    <div className="bg-primary-purple text-white flex flex-wrap gap-5 justify-around items-center py-4">
      <Link href={"/"}>
        <Image
          className="w-[120px] h-auto"
          src="/images/nav-icon.svg"
          width="0"
          height="0"
          alt="icon"
        />
      </Link>
      <div className="flex flex-wrap justify-center gap-3 md:gap-8 font-semibold">
        {HomeNavLinks.map((link) => {
          return (
            <Link key={link.name} href={link.url}>
              <p className="hover:underline hover:underline-offset-1">
                {link.name}
              </p>
            </Link>
          );
        })}
      </div>
      <Link href={"/login"}>
        <div
          className="bg-white text-[13px] text-black font-bold px-4 py-2 rounded-3xl
                        hover:text-primary-purple hover:shadow-2xl"
        >
          Open Discord
        </div>
      </Link>
    </div>
  );
};

export default HomePageNavbar;
