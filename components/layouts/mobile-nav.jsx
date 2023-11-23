"use client";
import { XIon } from "../icons/x-icon";
import { MenuIcon } from "../icons/menu-icon";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MobileNav = ({ children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    // Function to handle click outside
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // Clicked outside of the component, handle the action here
        if (!buttonRef.current.contains(event.target)) {
          setOpen(false);
        }
        // Add your logic here for handling click outside
      }
    };

    // Event listener for click on the entire document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="h-full lg:hidden">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className={cn(
          "text-stone-800 dark:text-stone-300 ",
          open && "dark:bg-stone-900  bg-yellow-100",
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
        onClick={() => setOpen(!open)}
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
