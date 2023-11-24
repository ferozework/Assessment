import React from "react";
import Image from "next/image";

function Header() {
  return (
    <>
      <header className="flex flex-row text-[#6e5634] pt-[40px] pl-[40px]">
        <Image
          src="/fcl-logo.png"
          alt="FCL Logo"
          width={127}
          height={50}
          priority
        />
      </header>
    </>
  );
}

export default Header;
