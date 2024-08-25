// This is the navigation bar for pc, showed when resolution is greater than x
import Link from "next/link";
import Image from "next/image";
import vagosLogo from "../../../public/logo.png";
import defaultPfp from "../../../public/default-pfp.jpeg";
import { useRouter } from "next/navigation";
import GlowingButton from "../GlowingButton/GlowingButton";
import { PagesUrl, UserInfo } from "@/interfaces";

interface PcNavigationBarProps {
  urls: PagesUrl;
  pathname: string;
  userInfo: UserInfo;
}

export default function PcNavigationBar({
  urls,
  pathname,
  userInfo,
}: PcNavigationBarProps) {
  const router = useRouter();

  const customLinkElement = (text: string, baseUrl: string, goTo: string) => {
    return (
      <Link
        href={goTo}
        className={`${
          pathname === baseUrl ? "glow-text cursor-default" : "hover:scale-105"
        } hover:glow-text duration-200`}
      >
        {text}
      </Link>
    );
  };

  return (
    <div className="w-full justify-between items-center p-6 sm:flex hidden h-full">
      <div className="w-[50px]">
        <Image src={vagosLogo} alt="vagosLogo.png" />
      </div>

      <div className="space-x-6 flex items-center whitespace-nowrap">
        {customLinkElement("Inicio", urls.home, urls.home)}
        {customLinkElement(
          "Proyectos",
          urls.projects,
          "/projects/1?order=ASC&order_by=title"
        )}
        {customLinkElement("Blogs", urls.blogs, urls.blogs)}
        {customLinkElement("Sobre nosotros", urls.about, urls.about)}

        {/* If user is logged in show info, other way show loggin button */}
        {(!userInfo.username && (
          <GlowingButton
            text="Conectarse"
            onClick={() => router.push(urls.login)}
          />
        )) || (
          <Link
            className="flex space-x-2 cursor-pointer items-center hover:glow-text duration-200 group"
            href={`${urls.profile}/${userInfo.username}`}
          >
            <div className="w-[50px] h-[50px] rounded-full relative">
              <div className="w-full h-full rounded-full bg-dark-200 relative z-10 overflow-hidden">
                <Image src={defaultPfp} alt="pfp" />
              </div>

              <div
                className="w-full h-full rounded-full absolute top-0 left-0 blur-sm
                bg-gradient-to-tr from-red-500 to-white via-orange-500 animate-spin
                opacity-0 group-hover:opacity-100 duration-500"
              />
            </div>

            <div>
              <p className="text-lg">{userInfo.username}</p>
              <p className="text-sm font-light">{userInfo.rolename}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
