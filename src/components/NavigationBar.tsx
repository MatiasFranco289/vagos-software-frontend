"use client";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    (pathname === "/login" && <div></div>) || (
      <div>
        <h2>Hi, my friends call me navigation bar</h2>
      </div>
    )
  );
}
