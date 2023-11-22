"use client";
import { XIon } from "../icons/x-icon";
import { MenuIcon } from "../icons/menu-icon";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MobileNav = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="h-full lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "text-stone-800 dark:text-stone-300 ",
          open && "dark:bg-stone-900 bg-yellow-100",
          "h-full dark:hover:bg-stone-900 hover:bg-yellow-100 place-content-center flex items-center justify-center border-l lg:px-16 sm:px-8 px-4 lg:hidden"
        )}
      >
        {open ? (
          <XIon className="sm:h-8 h-5  animate-out duration-700" />
        ) : (
          <MenuIcon className="sm:h-8 h-5" />
        )}
      </button>

      <nav
        className={cn(
          "absolute right-0  origin-bottom overflow-hidden w-screen  backdrop-blur-sm bg-amber-700/20 dark:bg-stone-950/80 transition-all duration-500",
          open ? "h-full" : "h-0"
        )}
      >
        {children}
      </nav>
    </div>
  );
};

export default MobileNav;
