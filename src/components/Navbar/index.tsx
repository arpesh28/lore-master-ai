import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="flex justify-between items-center mb-8 gap-4">
      <div className="p-4 flex items-center justify-center">
        <Link href={"/"}>
          <Image
            src={"/epic-games-logo-2.png"}
            alt="epic games logo"
            width={45}
            height={54}
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
