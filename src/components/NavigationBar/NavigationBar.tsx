// This is the navigation bar component
// depending on the resolution it uses the PcNavigationBar component or the
// MobileNavigationBar component
"use client";
import { usePathname } from "next/navigation";
import PcNavigationBar from "./PcNavigationBar";
import MobileNavigationBar from "./MobileNavigationBar";
import { useEffect, useState } from "react";
import { ROLENAME, USERNAME } from "@/constants";
import { UserInfo } from "@/interfaces";
import { PAGES_URLS } from "@/constants";

export default function NavigationBar() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    rolename: "",
  });

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
        <PcNavigationBar
          urls={PAGES_URLS}
          pathname={pathname}
          userInfo={userInfo}
        />
        <MobileNavigationBar
          urls={PAGES_URLS}
          pathname={pathname}
          userInfo={userInfo}
        />
      </div>
    )
  );
}
