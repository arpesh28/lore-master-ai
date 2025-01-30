import Navbar from "@/components/Navbar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="relative flex flex-row gap-4 bg-epic-500 ">
        <div className="p-4 py-4 flex-grow max-w-[1440px] mx-auto md:p-8 md:py-4  lg:p-16 lg:py-8 ">
          <Navbar />
          {children}
          <div className=" text-sm text-neutral-500 p-4 text-center">
            Lore Master AI
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
