import { IoHomeOutline } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { GrBlog } from "react-icons/gr";
import { GoOrganization } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import Link from "next/link";
import { PagesUrl } from "@/interfaces";

interface MobileNavigationBarProps {
  urls: PagesUrl;
  pathname: string;
  userInfo: {
    // TODO: Esto se deberia pasar a una interfaz o no?
    // TODO: Documentar para que sirve cada componente de estos
    // TODO: Definir cual sera la estructura de un usuario, tanto por parte del cliente como en el cliente
    username: string;
    rolename: string;
  };
}

export default function MobileNavigationBar({
  urls,
  pathname,
  userInfo,
}: MobileNavigationBarProps) {
  const IconLink = (Icon: React.ElementType, href: string) => {
    return (
      <Link href={href} className="relative">
        <Icon className="relative z-10" />
        <Icon
          className={`absolute top-0 left-0 text-orange-500 blur-sm
            ${pathname === href ? "opacity-100" : "opacity-0"} duration-200`}
        />
      </Link>
    );
  };

  return (
    <div
      className=" w-full h-full sm:hidden flex min-[400px]:text-5xl text-4xl min-[400px]:space-x-7 space-x-6 items-center justify-center 
        bg-dark-300"
    >
      {IconLink(IoHomeOutline, urls.home)}
      {IconLink(GrProjects, urls.projects)}
      {IconLink(GrBlog, urls.blogs)}
      {IconLink(GoOrganization, urls.about)}
      {IconLink(
        CiUser,
        userInfo.username ? `${urls.profile}/${userInfo.username}` : urls.login
      )}
    </div>
  );
}
