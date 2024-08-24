import React from "react";
import Image from "next/image";
import navBarScreenShot from "@/assets/nav-bar-screenshot.png";

const NavBar = () => {
  return (
    <div className="flex w-full">
      <Image src={navBarScreenShot} />
    </div>
  );
};
export default NavBar;
