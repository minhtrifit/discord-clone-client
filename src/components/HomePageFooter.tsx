import Link from "next/link";
import Image from "next/image";

import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

import { HomeFooterLinks } from "@/lib/utils";

const HomePageFooter = () => {
  return (
    <div className="bg-primary-gray text-white px-4 md:px-0">
      <div className="w-[100%] md:w-[70%] py-[100px] mx-auto flex flex-wrap justify-between">
        <div className="w-[100%] flex flex-wrap gap-10 items-start justify-between">
          <div className="flex items-center gap-5">
            <Link href={"https://twitter.com/discord"}>
              <FaXTwitter size={25} />
            </Link>
            <Link href={"https://www.instagram.com/discord/"}>
              <FiInstagram size={25} />
            </Link>
            <Link href={"https://www.facebook.com/discord/"}>
              <FaFacebook size={25} />
            </Link>
            <Link href={"https://www.youtube.com/discord"}>
              <FaYoutube size={25} />
            </Link>
            <Link href={"https://twitter.com/discord"}>
              <FaTiktok size={25} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-20">
            {HomeFooterLinks.map((link) => {
              return (
                <div key={link.name} className="flex flex-col gap-5">
                  <p className="text-primary-purple font-semibold">
                    {link.name}
                  </p>
                  <div className="flex flex-col gap-2">
                    {link.links.map((sublink) => {
                      return (
                        <Link href={sublink.url} key={sublink.name}>
                          <p className="text-[15px] hover:underline hover:underline-offset-1">
                            {sublink.name}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[100%] h-[2px] bg-primary-purple my-10"></div>
        <div className="w-[100%] flex justify-between">
          <Image
            className="w-[120px] h-auto"
            src="/images/nav-icon.svg"
            width="0"
            height="0"
            alt="icon"
          />
          <Link href={"/login"}>
            <div
              className="bg-primary-purple rounded-3xl px-4 py-3 text-sm font-bold
                            hover:bg-secondary-purple"
            >
              Open Discord
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageFooter;
