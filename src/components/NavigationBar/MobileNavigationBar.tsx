// This is the navigation bar for mobile devices, showed when resolution is lower than x
import { IoHomeOutline } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { GrBlog } from "react-icons/gr";
import { GoOrganization } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import Link from "next/link";
import { PagesUrl, UserInfo } from "@/interfaces";

interface MobileNavigationBarProps {
  urls: PagesUrl;
  pathname: string;
  userInfo: UserInfo;
}

export default function MobileNavigationBar({
  urls,
  pathname,
  userInfo,
}: MobileNavigationBarProps) {
  const IconLink = (Icon: React.ElementType, baseUrl: string, goTo: string) => {
    console.log(baseUrl);
    console.log(pathname);

    return (
      <Link href={goTo} className="relative">
        <Icon className="relative z-10" />
        <Icon
          className={`absolute top-0 left-0 text-orange-500 blur-sm
            ${pathname === baseUrl ? "opacity-100" : "opacity-0"} duration-200`}
        />
      </Link>
    );
  };

  return (
    <div
      className=" w-full h-full sm:hidden flex min-[400px]:text-5xl text-4xl min-[400px]:space-x-7 space-x-6 items-center justify-center 
        bg-dark-300"
    >
      {IconLink(IoHomeOutline, urls.home, urls.home)}
      {IconLink(
        GrProjects,
        urls.projects,
        "/projects/1?order=ASC&order_by=title"
      )}
      {IconLink(GrBlog, urls.blogs, urls.blogs)}
      {IconLink(GoOrganization, urls.about, urls.about)}
      {IconLink(
        CiUser,
        userInfo.username ? `${urls.profile}/${userInfo.username}` : urls.login,
        userInfo.username ? `${urls.profile}/${userInfo.username}` : urls.login
      )}
    </div>
  );
}
