"use client";
import { usePathname } from "next/navigation";
import PcNavigationBar from "./PcNavigationBar";
import MobileNavigationBar from "./MobileNavigationBar";
import { useEffect, useState } from "react";
import { ROLENAME, USERNAME } from "@/constants";

export default function NavigationBar() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    rolename: "",
  });

  const urls = {
    // TODO: Mover esto a constants
    home: "/",
    projects: "/projects",
    blogs: "/blogs",
    about: "/about-us",
    profile: "/profile",
    login: "/login",
  };
  const pathname = usePathname();

  useEffect(() => {
    setUserInfo({
      username: localStorage.getItem(USERNAME) || "",
      rolename: localStorage.getItem(ROLENAME) || "",
    });
  }, []);

  return (
    (pathname === "/login" && <div></div>) || (
      <div className="w-full fixed sm:absolute sm:top-0 sm:bottom-100 top-100 bottom-0 h-[80px]">
        <PcNavigationBar urls={urls} pathname={pathname} userInfo={userInfo} />
        <MobileNavigationBar
          urls={urls}
          pathname={pathname}
          userInfo={userInfo}
        />
      </div>
    )
  );
}
